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
    
    return {
        "id": item.get("id"),
        "title": item.get("title"),
        "category": item.get("category"),
        "result_type": item.get("result_type"),
        "athlete_name": item.get("athlete_name"),
        "event_name": item.get("event_name"),
        "event_date": item.get("event_date"),
        "description": item.get("description"),
        "image_url": item.get("image_url"),
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
            "category": result_data.category.value,
            "result_type": result_data.result_type.value,
            "athlete_name": result_data.athlete_name,
            "event_name": result_data.event_name,
            "event_date": result_data.event_date,
            "description": result_data.description,
            "image_url": result_data.image_url,
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
                    KeyConditionExpression='result_type = :type',
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
            
            for key in ['title', 'category', 'result_type', 'athlete_name', 'event_name', 'event_date', 'description', 'image_url']:
                if key in update_data:
                    value = update_data[key]
                    if hasattr(value, 'value'):  # Enum
                        value = value.value
                    update_expr_parts.append(f"#{key} = :{key}")
                    expr_attr_names[f"#{key}"] = key
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
        """Delete result"""
        try:
            response = table.get_item(Key={'id': result_id})
            item = response.get('Item')
            
            if not item:
                return False
            
            table.delete_item(Key={'id': result_id})
            return True
        except Exception as e:
            print(f"Error deleting result: {e}")
            return False


result_service = ResultService()
