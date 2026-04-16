"""
District service - Business logic for district management
"""
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid
from decimal import Decimal
from boto3.dynamodb.conditions import Key, Attr

from app.schemas.district import DistrictCreate, DistrictUpdate


def _decimal_to_float(obj):
    """Convert Decimal to float for JSON serialization"""
    if isinstance(obj, Decimal):
        return float(obj)
    elif isinstance(obj, dict):
        return {k: _decimal_to_float(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [_decimal_to_float(v) for v in obj]
    return obj


def _serialize_district(item: Dict[str, Any]) -> Dict[str, Any]:
    """Convert DynamoDB item to API response"""
    if not item:
        return None
    
    # Convert Decimal to float
    item = _decimal_to_float(item)
    
    return {
        "id": item.get("id"),
        "name": item.get("name"),
        "is_available": item.get("is_available", True),
        "president_name": item.get("president_name"),
        "president_email": item.get("president_email"),
        "president_phone": item.get("president_phone"),
        "president_photo_url": item.get("president_photo_url"),
        "description": item.get("description"),
        "created_at": item.get("created_at"),
        "updated_at": item.get("updated_at"),
    }


class DistrictService:

    @staticmethod
    def create_district(table, district_data: DistrictCreate) -> Dict[str, Any]:
        """Create a new district"""
        district_id = str(uuid.uuid4())
        now = datetime.utcnow().isoformat()
        
        item = {
            "id": district_id,
            "name": district_data.name,
            "is_available": district_data.is_available,
            "president_name": district_data.president_name,
            "president_email": district_data.president_email,
            "president_phone": district_data.president_phone,
            "president_photo_url": district_data.president_photo_url,
            "description": district_data.description,
            "created_at": now,
            "updated_at": None,
        }

        table.put_item(Item=item)
        return _serialize_district(item)

    @staticmethod
    def get_district_by_id(table, district_id: str) -> Optional[Dict[str, Any]]:
        """Get district by ID"""
        try:
            response = table.get_item(Key={'id': district_id})
            item = response.get('Item')
            return _serialize_district(item) if item else None
        except Exception as e:
            print(f"Error getting district: {e}")
            return None

    @staticmethod
    def get_all_districts(table) -> List[Dict[str, Any]]:
        """Get all districts"""
        try:
            response = table.scan()
            items = response.get('Items', [])
            
            # Sort by name
            items.sort(key=lambda x: x.get('name', ''))
            
            return [_serialize_district(item) for item in items]
        except Exception as e:
            print(f"Error getting districts: {e}")
            return []

    @staticmethod
    def update_district(table, district_id: str, district_data: DistrictUpdate) -> Optional[Dict[str, Any]]:
        """Update district"""
        try:
            # Get current item
            current_response = table.get_item(Key={'id': district_id})
            current = current_response.get('Item')
            
            if not current:
                return None

            update_data = district_data.model_dump(exclude_unset=True)
            now = datetime.utcnow().isoformat()
            
            # Build update expression
            update_expr_parts = []
            expr_attr_values = {}
            expr_attr_names = {}
            
            # Always update updated_at
            update_expr_parts.append("#updated_at = :updated_at")
            expr_attr_names["#updated_at"] = "updated_at"
            expr_attr_values[":updated_at"] = now
            
            # Update other fields
            for key in ['name', 'is_available', 'president_name', 'president_email', 'president_phone', 'president_photo_url', 'description']:
                if key in update_data:
                    update_expr_parts.append(f"#{key} = :{key}")
                    expr_attr_names[f"#{key}"] = key
                    expr_attr_values[f":{key}"] = update_data[key]
            
            update_expression = "SET " + ", ".join(update_expr_parts)
            
            response = table.update_item(
                Key={'id': district_id},
                UpdateExpression=update_expression,
                ExpressionAttributeNames=expr_attr_names,
                ExpressionAttributeValues=expr_attr_values,
                ReturnValues="ALL_NEW"
            )
            
            return _serialize_district(response.get('Attributes'))
        except Exception as e:
            print(f"Error updating district: {e}")
            return None

    @staticmethod
    def delete_district(table, district_id: str) -> bool:
        """Delete district"""
        try:
            # Get district first
            response = table.get_item(Key={'id': district_id})
            item = response.get('Item')
            
            if not item:
                return False
            
            # Delete from DynamoDB
            table.delete_item(Key={'id': district_id})
            return True
        except Exception as e:
            print(f"Error deleting district: {e}")
            return False


district_service = DistrictService()
