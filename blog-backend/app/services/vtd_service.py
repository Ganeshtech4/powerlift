"""
VTD book service - business logic for VTD books management.
"""
from datetime import datetime
from decimal import Decimal
from typing import Any, Dict, List, Optional
import uuid

from app.schemas.vtd import VtdBookCreate, VtdBookUpdate


def _decimal_to_native(obj):
    if isinstance(obj, Decimal):
        return int(obj) if obj % 1 == 0 else float(obj)
    if isinstance(obj, dict):
        return {key: _decimal_to_native(value) for key, value in obj.items()}
    if isinstance(obj, list):
        return [_decimal_to_native(value) for value in obj]
    return obj


def _serialize(item: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    if not item:
        return None

    item = _decimal_to_native(item)
    return {
        "id": item.get("id"),
        "title": item.get("title"),
        "subtitle": item.get("subtitle"),
        "quote": item.get("quote"),
        "pdf_url": item.get("pdf_url"),
        "cover_image_url": item.get("cover_image_url"),
        "order": item.get("order", 0),
        "is_active": item.get("is_active", True),
        "created_at": item.get("created_at"),
        "updated_at": item.get("updated_at"),
    }


class VtdBookService:

    @staticmethod
    def create(table, data: VtdBookCreate) -> Dict[str, Any]:
        item_id = str(uuid.uuid4())
        now = datetime.utcnow().isoformat()
        item = {
            "id": item_id,
            "title": data.title,
            "subtitle": data.subtitle,
            "quote": data.quote,
            "pdf_url": data.pdf_url,
            "cover_image_url": data.cover_image_url,
            "order": data.order,
            "is_active": data.is_active,
            "created_at": now,
            "updated_at": None,
        }
        table.put_item(Item=item)
        return _serialize(item)

    @staticmethod
    def get_all(table) -> List[Dict[str, Any]]:
        response = table.scan()
        items = response.get('Items', [])
        return [_serialize(item) for item in items if item]

    @staticmethod
    def get_by_id(table, item_id: str) -> Optional[Dict[str, Any]]:
        response = table.get_item(Key={'id': item_id})
        item = response.get('Item')
        return _serialize(item) if item else None

    @staticmethod
    def update(table, item_id: str, data: VtdBookUpdate) -> Optional[Dict[str, Any]]:
        existing = table.get_item(Key={'id': item_id}).get('Item')
        if not existing:
            return None

        now = datetime.utcnow().isoformat()
        update_data = data.model_dump(exclude_unset=True)
        update_data['updated_at'] = now

        update_expr_parts = []
        expr_attr_names = {}
        expr_attr_values = {}

        for key, value in update_data.items():
            placeholder = f"#{key}"
            value_placeholder = f":{key}"
            update_expr_parts.append(f"{placeholder} = {value_placeholder}")
            expr_attr_names[placeholder] = key
            expr_attr_values[value_placeholder] = value

        update_expression = "SET " + ", ".join(update_expr_parts)

        table.update_item(
            Key={'id': item_id},
            UpdateExpression=update_expression,
            ExpressionAttributeNames=expr_attr_names,
            ExpressionAttributeValues=expr_attr_values,
        )

        updated_item = table.get_item(Key={'id': item_id}).get('Item')
        return _serialize(updated_item)

    @staticmethod
    def delete(table, item_id: str) -> bool:
        existing = table.get_item(Key={'id': item_id}).get('Item')
        if not existing:
            return False
        table.delete_item(Key={'id': item_id})
        return True


vtd_service = VtdBookService()
