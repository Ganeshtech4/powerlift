"""
Referee service - Business logic
"""
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid
from decimal import Decimal

from app.schemas.referee import RefereeCreate, RefereeUpdate


def _decimal_to_native(obj):
    if isinstance(obj, Decimal):
        return int(obj) if obj % 1 == 0 else float(obj)
    elif isinstance(obj, dict):
        return {k: _decimal_to_native(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [_decimal_to_native(v) for v in obj]
    return obj


def _serialize(item: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    if not item:
        return None
    item = _decimal_to_native(item)
    return {
        "id": item.get("id"),
        "name": item.get("name"),
        "level": item.get("level"),
        "photo_url": item.get("photo_url"),
        "phone": item.get("phone"),
        "email": item.get("email"),
        "certification_year": item.get("certification_year"),
        "description": item.get("description"),
        "certificates": item.get("certificates", []),
        "order": item.get("order", 0),
        "is_active": item.get("is_active", True),
        "created_at": item.get("created_at"),
        "updated_at": item.get("updated_at"),
    }


class RefereeService:

    @staticmethod
    def create(table, data: RefereeCreate) -> Dict[str, Any]:
        item_id = str(uuid.uuid4())
        now = datetime.utcnow().isoformat()
        item = {
            "id": item_id,
            "name": data.name,
            "level": data.level,
            "photo_url": data.photo_url,
            "phone": data.phone,
            "email": data.email,
            "certification_year": data.certification_year,
            "description": data.description,
            "certificates": data.certificates if data.certificates else [],
            "order": data.order,
            "is_active": data.is_active,
            "created_at": now,
            "updated_at": None,
        }
        item = {k: v for k, v in item.items() if v is not None or k in ('updated_at',)}
        table.put_item(Item=item)
        return _serialize(item)

    @staticmethod
    def get_all(table) -> List[Dict[str, Any]]:
        try:
            response = table.scan()
            items = response.get('Items', [])
            items.sort(key=lambda x: (x.get('order', 0), x.get('name', '')))
            return [_serialize(i) for i in items]
        except Exception as e:
            print(f"Error getting referees: {e}")
            return []

    @staticmethod
    def get_by_id(table, item_id: str) -> Optional[Dict[str, Any]]:
        try:
            response = table.get_item(Key={'id': item_id})
            item = response.get('Item')
            return _serialize(item) if item else None
        except Exception as e:
            print(f"Error getting referee: {e}")
            return None

    @staticmethod
    def update(table, item_id: str, data: RefereeUpdate) -> Optional[Dict[str, Any]]:
        try:
            response = table.get_item(Key={'id': item_id})
            existing = response.get('Item')
            if not existing:
                return None
            update_data = data.model_dump(exclude_unset=True)
            update_data['updated_at'] = datetime.utcnow().isoformat()
            existing.update(update_data)
            table.put_item(Item=existing)
            return _serialize(existing)
        except Exception as e:
            print(f"Error updating referee: {e}")
            return None

    @staticmethod
    def delete(table, item_id: str) -> bool:
        try:
            response = table.get_item(Key={'id': item_id})
            if not response.get('Item'):
                return False
            table.delete_item(Key={'id': item_id})
            return True
        except Exception as e:
            print(f"Error deleting referee: {e}")
            return False


referee_service = RefereeService()
