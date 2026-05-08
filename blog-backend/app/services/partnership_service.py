"""
Partnership service - Business logic
"""
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid
from decimal import Decimal

from app.schemas.partnership import PartnershipCreate, PartnershipUpdate


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
        "gym_name": item.get("gym_name"),
        "owner_name": item.get("owner_name"),
        "type": item.get("type", "Partner"),
        "level": item.get("level", "District"),
        "location": item.get("location"),
        "phone": item.get("phone"),
        "email": item.get("email"),
        "logo_url": item.get("logo_url"),
        "description": item.get("description"),
        "highlights": item.get("highlights", []),
        "order": item.get("order", 0),
        "is_active": item.get("is_active", True),
        "created_at": item.get("created_at"),
        "updated_at": item.get("updated_at"),
    }


class PartnershipService:

    @staticmethod
    def create(table, data: PartnershipCreate) -> Dict[str, Any]:
        item_id = str(uuid.uuid4())
        now = datetime.utcnow().isoformat()
        item = {
            "id": item_id,
            "gym_name": data.gym_name,
            "owner_name": data.owner_name,
            "type": data.type,
            "level": data.level,
            "location": data.location,
            "phone": data.phone,
            "email": data.email,
            "logo_url": data.logo_url,
            "description": data.description,
            "highlights": data.highlights,
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
            items.sort(key=lambda x: (x.get('order', 0), x.get('gym_name', '')))
            return [_serialize(i) for i in items]
        except Exception as e:
            print(f"Error getting partnerships: {e}")
            return []

    @staticmethod
    def get_by_id(table, item_id: str) -> Optional[Dict[str, Any]]:
        try:
            response = table.get_item(Key={'id': item_id})
            item = response.get('Item')
            return _serialize(item) if item else None
        except Exception as e:
            print(f"Error getting partnership: {e}")
            return None

    @staticmethod
    def update(table, item_id: str, data: PartnershipUpdate) -> Optional[Dict[str, Any]]:
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
            print(f"Error updating partnership: {e}")
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
            print(f"Error deleting partnership: {e}")
            return False


partnership_service = PartnershipService()
