"""
Events service - Business logic for events/calendar management
"""
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid
from decimal import Decimal

from app.schemas.event import EventCreate, EventUpdate


def _decimal_to_float(obj):
    """Convert Decimal to float for JSON serialization"""
    if isinstance(obj, Decimal):
        return float(obj)
    elif isinstance(obj, dict):
        return {k: _decimal_to_float(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [_decimal_to_float(v) for v in obj]
    return obj


def _serialize_event(item: Dict[str, Any]) -> Dict[str, Any]:
    """Convert DynamoDB item to API response"""
    if not item:
        return None
    
    item = _decimal_to_float(item)
    
    return {
        "id": item.get("id"),
        "title": item.get("title"),
        "category": item.get("category"),
        "event_date": item.get("event_date"),
        "end_date": item.get("end_date"),
        "location": item.get("location"),
        "description": item.get("description"),
        "registration_link": item.get("registration_link"),
        "is_active": item.get("is_active", True),
        "created_at": item.get("created_at"),
        "updated_at": item.get("updated_at"),
    }


class EventService:

    @staticmethod
    def create_event(table, event_data: EventCreate) -> Dict[str, Any]:
        """Create a new event"""
        event_id = str(uuid.uuid4())
        now = datetime.utcnow().isoformat()
        
        item = {
            "id": event_id,
            "title": event_data.title,
            "category": event_data.category.value,
            "event_date": event_data.event_date,
            "end_date": event_data.end_date,
            "location": event_data.location,
            "description": event_data.description,
            "registration_link": event_data.registration_link,
            "is_active": event_data.is_active,
            "created_at": now,
            "updated_at": None,
        }

        table.put_item(Item=item)
        return _serialize_event(item)

    @staticmethod
    def get_event_by_id(table, event_id: str) -> Optional[Dict[str, Any]]:
        """Get event by ID"""
        try:
            response = table.get_item(Key={'id': event_id})
            item = response.get('Item')
            return _serialize_event(item) if item else None
        except Exception as e:
            print(f"Error getting event: {e}")
            return None

    @staticmethod
    def get_all_events(table, active_only: bool = False) -> List[Dict[str, Any]]:
        """Get all events"""
        try:
            response = table.scan()
            items = response.get('Items', [])
            
            if active_only:
                items = [item for item in items if item.get('is_active', True)]
            
            # Sort by event date
            items.sort(key=lambda x: x.get('event_date', ''), reverse=False)
            return [_serialize_event(item) for item in items]
        except Exception as e:
            print(f"Error getting events: {e}")
            return []

    @staticmethod
    def get_upcoming_events(table, limit: int = 10) -> List[Dict[str, Any]]:
        """Get upcoming events"""
        try:
            now = datetime.utcnow().isoformat()[:10]  # YYYY-MM-DD
            
            response = table.scan(
                FilterExpression='event_date >= :now AND is_active = :active',
                ExpressionAttributeValues={
                    ':now': now,
                    ':active': True
                }
            )
            items = response.get('Items', [])
            
            items.sort(key=lambda x: x.get('event_date', ''))
            return [_serialize_event(item) for item in items[:limit]]
        except Exception as e:
            print(f"Error getting upcoming events: {e}")
            return []

    @staticmethod
    def update_event(table, event_id: str, event_data: EventUpdate) -> Optional[Dict[str, Any]]:
        """Update event"""
        try:
            current_response = table.get_item(Key={'id': event_id})
            current = current_response.get('Item')
            
            if not current:
                return None

            update_data = event_data.model_dump(exclude_unset=True)
            now = datetime.utcnow().isoformat()
            
            update_expr_parts = []
            expr_attr_values = {}
            expr_attr_names = {}
            
            update_expr_parts.append("#updated_at = :updated_at")
            expr_attr_names["#updated_at"] = "updated_at"
            expr_attr_values[":updated_at"] = now
            
            for key in ['title', 'category', 'event_date', 'end_date', 'location', 'description', 'registration_link', 'is_active']:
                if key in update_data:
                    value = update_data[key]
                    if hasattr(value, 'value'):  # Enum
                        value = value.value
                    update_expr_parts.append(f"#{key} = :{key}")
                    expr_attr_names[f"#{key}"] = key
                    expr_attr_values[f":{key}"] = value
            
            update_expression = "SET " + ", ".join(update_expr_parts)
            
            response = table.update_item(
                Key={'id': event_id},
                UpdateExpression=update_expression,
                ExpressionAttributeNames=expr_attr_names,
                ExpressionAttributeValues=expr_attr_values,
                ReturnValues="ALL_NEW"
            )
            
            return _serialize_event(response.get('Attributes'))
        except Exception as e:
            print(f"Error updating event: {e}")
            return None

    @staticmethod
    def delete_event(table, event_id: str) -> bool:
        """Delete event"""
        try:
            response = table.get_item(Key={'id': event_id})
            item = response.get('Item')
            
            if not item:
                return False
            
            table.delete_item(Key={'id': event_id})
            return True
        except Exception as e:
            print(f"Error deleting event: {e}")
            return False


event_service = EventService()
