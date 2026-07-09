"""
Results service - Business logic for results management
"""
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid
from decimal import Decimal

from app.schemas.result import ResultCreate, ResultUpdate


def _decimal_to_float(obj):
    """Convert Decimal to float for JSON serialization"""
    if isinstance(obj, Decimal):
        return float(obj)
    elif isinstance(obj, dict):
        return {k: _decimal_to_float(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [_decimal_to_float(v) for v in obj]
    return obj


def _serialize_result(item: Dict[str, Any]) -> Dict[str, Any]:
    """Convert DynamoDB item to API response"""
    if not item:
        return None
    
    item = _decimal_to_float(item)
    
    # Normalize old type values to new enum values
    old_type = item.get("type", "")
    if old_type == "id_card":
        new_type = "records"  # Map old id_card to records
    elif old_type == "result":
        new_type = "results"  # Map old result to results
    else:
        new_type = old_type  # Keep new values as is (championship, records, results)
    
    return {
        "id": item.get("id"),
        "title": item.get("title"),
        "category": item.get("category"),
        "type": new_type,
        "athlete_name": item.get("athlete_name"),
        "event_name": item.get("event_name"),
        "event_date": item.get("event_date"),
        "location": item.get("location"),
        "description": item.get("description"),
        "image_url": item.get("image_url"),
        "thumbnail_url": item.get("thumbnail_url"),
        "images": item.get("images", []),
        "created_at": item.get("created_at"),
        "updated_at": item.get("updated_at"),
    }


class ResultService:

    @staticmethod
    def create_result(table, result_data: ResultCreate) -> Dict[str, Any]:
        """Create a new result"""
        result_id = str(uuid.uuid4())
        now = datetime.utcnow().isoformat()
        
        item = {
            "id": result_id,
            "title": result_data.title,
            "category": result_data.category if isinstance(result_data.category, str) else result_data.category,
            "type": result_data.type.value if hasattr(result_data.type, 'value') else result_data.type,
            "athlete_name": result_data.athlete_name,
            "event_name": result_data.event_name,
            "event_date": result_data.event_date,
            "location": result_data.location,
            "description": result_data.description,
            "image_url": result_data.image_url,
            "thumbnail_url": result_data.thumbnail_url,
            "images": result_data.images or [],
            "created_at": now,
            "updated_at": None,
        }

        table.put_item(Item=item)
        return _serialize_result(item)

    @staticmethod
    def get_result_by_id(table, result_id: str) -> Optional[Dict[str, Any]]:
        """Get result by ID"""
        try:
            response = table.get_item(Key={'id': result_id})
            item = response.get('Item')
            return _serialize_result(item) if item else None
        except Exception as e:
            print(f"Error getting result: {e}")
            return None

    @staticmethod
    def get_all_results(table, category: Optional[str] = None, result_type: Optional[str] = None) -> List[Dict[str, Any]]:
        """Get all results with optional filtering"""
        try:
            if category:
                response = table.query(
                    IndexName='category-index',
                    KeyConditionExpression='category = :cat',
                    ExpressionAttributeValues={':cat': category}
                )
                items = response.get('Items', [])
            elif result_type:
                response = table.query(
                    IndexName='type-index',
                    KeyConditionExpression='#type = :type',
                    ExpressionAttributeNames={'#type': 'type'},
                    ExpressionAttributeValues={':type': result_type}
                )
                items = response.get('Items', [])
            else:
                response = table.scan()
                items = response.get('Items', [])
            
            items.sort(key=lambda x: x.get('created_at', ''), reverse=True)
            return [_serialize_result(item) for item in items]
        except Exception as e:
            print(f"Error getting results: {e}")
            return []

    @staticmethod
    def update_result(table, result_id: str, result_data: ResultUpdate) -> Optional[Dict[str, Any]]:
        """Update result"""
        try:
            current_response = table.get_item(Key={'id': result_id})
            current = current_response.get('Item')
            
            if not current:
                return None

            update_data = result_data.model_dump(exclude_unset=True)
            now = datetime.utcnow().isoformat()
            
            update_expr_parts = []
            expr_attr_values = {}
            expr_attr_names = {}
            
            update_expr_parts.append("#updated_at = :updated_at")
            expr_attr_names["#updated_at"] = "updated_at"
            expr_attr_values[":updated_at"] = now
            
            for key in ['title', 'category', 'type', 'athlete_name', 'event_name', 'event_date', 'location', 'description', 'image_url', 'thumbnail_url', 'images']:
                if key in update_data:
                    value = update_data[key]
                    if hasattr(value, 'value'):  # Enum
                        value = value.value
                    # Use expression attribute name for 'type' since it's a reserved keyword
                    attr_name = f"#{key}" if key == 'type' else f"#{key}"
                    update_expr_parts.append(f"{attr_name} = :{key}")
                    expr_attr_names[attr_name] = key
                    expr_attr_values[f":{key}"] = value
            
            update_expression = "SET " + ", ".join(update_expr_parts)
            
            response = table.update_item(
                Key={'id': result_id},
                UpdateExpression=update_expression,
                ExpressionAttributeNames=expr_attr_names,
                ExpressionAttributeValues=expr_attr_values,
                ReturnValues="ALL_NEW"
            )
            
            return _serialize_result(response.get('Attributes'))
        except Exception as e:
            print(f"Error updating result: {e}")
            return None

    @staticmethod
    def delete_result(table, result_id: str) -> bool:
        """Delete result and its S3 images"""
        try:
            response = table.get_item(Key={'id': result_id})
            item = response.get('Item')
            
            if not item:
                return False
            
            # Delete S3 images
            try:
                from app.services.s3_service import s3_service
                images = item.get('images', [])
                if item.get('thumbnail_url'):
                    images.append(item.get('thumbnail_url'))
                if item.get('image_url'):
                    images.append(item.get('image_url'))
                
                if images:
                    deleted_count = s3_service.delete_result_images(images)
                    print(f"Deleted {deleted_count} images from S3")
            except Exception as e:
                print(f"Error deleting S3 images: {e}")
            
            # Delete from DynamoDB
            table.delete_item(Key={'id': result_id})
            return True
        except Exception as e:
            print(f"Error deleting result: {e}")
            return False


result_service = ResultService()
