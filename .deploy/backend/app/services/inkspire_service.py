"""
Inkspire book service - business logic and default record seeding.
"""
from datetime import datetime
from decimal import Decimal
from typing import Any, Dict, List, Optional
from urllib.parse import quote
import uuid

from app.schemas.inkspire import InkspireBookCreate, InkspireBookUpdate


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


def _build_default_item(item_id: str, title: str, subtitle: str, quote_text: str, order: int) -> Dict[str, Any]:
    pdf_name = f"{title}.pdf"
    cover_name = pdf_name.replace('.pdf', '_page-0001.jpg')
    now = datetime.utcnow().isoformat()
    return {
        "id": item_id,
        "title": title,
        "subtitle": subtitle,
        "quote": quote_text,
        "pdf_url": f"https://rekhawpc.s3.ap-south-2.amazonaws.com/pdfs/{quote(pdf_name)}",
        "cover_image_url": f"https://rekhawpc.s3.ap-south-2.amazonaws.com/images/Inspire/{quote(cover_name)}",
        "order": order,
        "is_active": True,
        "created_at": now,
        "updated_at": None,
    }


DEFAULT_BOOKS = [
    _build_default_item(
        "aashritha",
        "Aashritha",
        "Powerlifting Athlete",
        "Powerlifting taught me discipline and resilience. WPC Telangana gave me the platform to prove my strength at the national level.",
        1,
    ),
    _build_default_item(
        "diza",
        "Diza",
        "Women's Powerlifting Champion",
        "I started as a beginner at a local gym. Today, I proudly represent Telangana in national events thanks to WPC's support and guidance.",
        2,
    ),
    _build_default_item(
        "karan",
        "Karan",
        "Youth Category Gold Medalist",
        "WPC Telangana inspires every young athlete to stay consistent and confident. Hard work truly pays off here.",
        3,
    ),
    _build_default_item(
        "manoj-kumar",
        "Manoj Kumar",
        "Media Coordinator",
        "The goal is not just lifting weights, but lifting others with your story. WPC Telangana builds a strong, supportive community.",
        4,
    ),
    _build_default_item(
        "pranay",
        "Pranay",
        "State Powerlifting Champion",
        "Guiding young athletes under WPC Telangana has been an inspiring journey. Strength comes from unity and purpose.",
        5,
    ),
    _build_default_item(
        "rishikesh-reddy",
        "Rishikesh Reddy",
        "State Powerlifting Champion",
        "Joining WPC Telangana helped me transform my training and mindset. Now, I compete with confidence at state and national levels.",
        6,
    ),
    _build_default_item(
        "sai-teja-manthena",
        "Sai Teja Manthena",
        "National Powerlifter",
        "Being part of WPC Telangana motivates me to push my limits and compete at higher levels with confidence.",
        7,
    ),
    _build_default_item(
        "tapasya",
        "Tapasya",
        "Women's Powerlifting Athlete",
        "I learned that patience and perseverance are key. WPC Telangana coaches pushed me to my best and prepared me for national competitions.",
        8,
    ),
    _build_default_item(
        "thirupathi-rao",
        "Thirupathi Rao",
        "Powerlifting Mentor & Trainer",
        "Sharing my journey at WPC Telangana inspires upcoming athletes to believe in themselves and chase their dreams without fear.",
        9,
    ),
]


class InkspireBookService:

    @staticmethod
    def _seed_defaults_if_empty(table) -> None:
        response = table.scan(Limit=1)
        if response.get('Items'):
            return

        with table.batch_writer() as batch:
            for item in DEFAULT_BOOKS:
                batch.put_item(Item=item)

    @staticmethod
    def create(table, data: InkspireBookCreate) -> Dict[str, Any]:
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
        item = {key: value for key, value in item.items() if value is not None or key in ('updated_at',)}
        table.put_item(Item=item)
        return _serialize(item)

    @classmethod
    def get_all(cls, table) -> List[Dict[str, Any]]:
        try:
            cls._seed_defaults_if_empty(table)
            response = table.scan()
            items = response.get('Items', [])
            items.sort(key=lambda item: (not item.get('is_active', True), item.get('order', 0), item.get('title', '')))
            return [_serialize(item) for item in items]
        except Exception as e:
            print(f"Error getting Inkspire books: {e}")
            return []

    @staticmethod
    def get_by_id(table, item_id: str) -> Optional[Dict[str, Any]]:
        try:
            response = table.get_item(Key={'id': item_id})
            item = response.get('Item')
            return _serialize(item) if item else None
        except Exception as e:
            print(f"Error getting Inkspire book: {e}")
            return None

    @staticmethod
    def update(table, item_id: str, data: InkspireBookUpdate) -> Optional[Dict[str, Any]]:
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
            print(f"Error updating Inkspire book: {e}")
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
            print(f"Error deleting Inkspire book: {e}")
            return False


inkspire_service = InkspireBookService()