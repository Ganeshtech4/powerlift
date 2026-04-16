"""
Committee Member service - Business logic
"""
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid
from decimal import Decimal

from app.schemas.committee import CommitteeMemberCreate, CommitteeMemberUpdate


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
        "role": item.get("role"),
        "photo_url": item.get("photo_url"),
        "certificate_urls": item.get("certificate_urls", []),
        "phone": item.get("phone"),
        "email": item.get("email"),
        "description": item.get("description"),
        "highlight": item.get("highlight"),
        "achievements": item.get("achievements", []),
        "leadership": item.get("leadership"),
        "philosophy": item.get("philosophy"),
        "is_featured": item.get("is_featured", False),
        "order": item.get("order", 0),
        "is_active": item.get("is_active", True),
        "created_at": item.get("created_at"),
        "updated_at": item.get("updated_at"),
    }


class CommitteeMemberService:

    @staticmethod
    def create(table, data: CommitteeMemberCreate) -> Dict[str, Any]:
        item_id = str(uuid.uuid4())
        now = datetime.utcnow().isoformat()
        item = {
            "id": item_id,
            "name": data.name,
            "role": data.role,
            "photo_url": data.photo_url,
            "certificate_urls": data.certificate_urls,
            "phone": data.phone,
            "email": data.email,
            "description": data.description,
            "highlight": data.highlight,
            "achievements": data.achievements,
            "leadership": data.leadership,
            "philosophy": data.philosophy,
            "is_featured": data.is_featured,
            "order": data.order,
            "is_active": data.is_active,
            "created_at": now,
            "updated_at": None,
        }
        # Remove None values
        item = {k: v for k, v in item.items() if v is not None or k in ('updated_at',)}
        table.put_item(Item=item)
        return _serialize(item)

    @staticmethod
    def get_all(table) -> List[Dict[str, Any]]:
        try:
            response = table.scan()
            items = response.get('Items', [])
            items.sort(
                key=lambda x: (
                    not x.get('is_featured', False),
                    x.get('order', 0),
                    x.get('name', ''),
                )
            )
            return [_serialize(i) for i in items]
        except Exception as e:
            print(f"Error getting committee members: {e}")
            return []

    @staticmethod
    def get_by_id(table, item_id: str) -> Optional[Dict[str, Any]]:
        try:
            response = table.get_item(Key={'id': item_id})
            item = response.get('Item')
            return _serialize(item) if item else None
        except Exception as e:
            print(f"Error getting committee member: {e}")
            return None

    @staticmethod
    def update(table, item_id: str, data: CommitteeMemberUpdate) -> Optional[Dict[str, Any]]:
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
            print(f"Error updating committee member: {e}")
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
            print(f"Error deleting committee member: {e}")
            return False


committee_service = CommitteeMemberService()
