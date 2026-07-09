"""
News service – business logic for news management (DynamoDB)
"""
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid
import re

from app.schemas.news import NewsCreate, NewsUpdate


def _slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text


def _serialize(item: Dict[str, Any]) -> Dict[str, Any]:
    if not item:
        return None
    return {
        "id": item.get("id"),
        "title": item.get("title"),
        "slug": item.get("slug"),
        "description": item.get("description"),
        "image_url": item.get("image_url"),
        "thumbnail_url": item.get("thumbnail_url"),
        "category": item.get("category", "General"),
        "published_date": item.get("published_date"),
        "is_featured": item.get("is_featured", False),
        "status": item.get("status", "published"),
        "created_at": item.get("created_at"),
        "updated_at": item.get("updated_at"),
    }


class NewsService:

    @staticmethod
    def create_news(table, data: NewsCreate) -> Dict[str, Any]:
        news_id = str(uuid.uuid4())
        now = datetime.utcnow().isoformat()
        slug = _slugify(data.title) + "-" + news_id[:8]

        item = {
            "id": news_id,
            "slug": slug,
            "title": data.title,
            "description": data.description or "",
            "image_url": data.image_url,
            "thumbnail_url": data.thumbnail_url or data.image_url,
            "category": data.category or "General",
            "published_date": data.published_date or now[:10],
            "is_featured": data.is_featured or False,
            "status": data.status or "published",
            "created_at": now,
            "updated_at": None,
        }
        table.put_item(Item=item)
        return _serialize(item)

    @staticmethod
    def get_all_news(table, published_only: bool = False) -> List[Dict[str, Any]]:
        response = table.scan()
        items = response.get("Items", [])

        if published_only:
            items = [i for i in items if i.get("status") == "published"]

        # Sort: featured first, then by published_date desc
        items.sort(key=lambda x: (
            not x.get("is_featured", False),
            -(x.get("published_date") or x.get("created_at") or ""),
        ))
        return [_serialize(i) for i in items]

    @staticmethod
    def get_news_by_id(table, news_id: str) -> Optional[Dict[str, Any]]:
        response = table.get_item(Key={"id": news_id})
        return _serialize(response.get("Item"))

    @staticmethod
    def get_news_by_slug(table, slug: str) -> Optional[Dict[str, Any]]:
        response = table.scan(
            FilterExpression="slug = :s",
            ExpressionAttributeValues={":s": slug}
        )
        items = response.get("Items", [])
        return _serialize(items[0]) if items else None

    @staticmethod
    def update_news(table, news_id: str, data: NewsUpdate) -> Optional[Dict[str, Any]]:
        existing = table.get_item(Key={"id": news_id}).get("Item")
        if not existing:
            return None

        updates = {k: v for k, v in data.model_dump(exclude_unset=True).items() if v is not None}
        updates["updated_at"] = datetime.utcnow().isoformat()

        expr = "SET " + ", ".join(f"#{k} = :{k}" for k in updates)
        names = {f"#{k}": k for k in updates}
        values = {f":{k}": v for k, v in updates.items()}

        response = table.update_item(
            Key={"id": news_id},
            UpdateExpression=expr,
            ExpressionAttributeNames=names,
            ExpressionAttributeValues=values,
            ReturnValues="ALL_NEW",
        )
        return _serialize(response.get("Attributes"))

    @staticmethod
    def delete_news(table, news_id: str) -> bool:
        """Delete news item and its S3 images"""
        existing = table.get_item(Key={"id": news_id}).get("Item")
        if not existing:
            return False
        
        # Delete S3 images
        try:
            from app.services.s3_service import s3_service
            images = []
            if existing.get('image_url'):
                images.append(existing.get('image_url'))
            if existing.get('thumbnail_url'):
                images.append(existing.get('thumbnail_url'))
            
            if images:
                deleted_count = s3_service.delete_result_images(images)
                print(f"Deleted {deleted_count} news images from S3")
        except Exception as e:
            print(f"Error deleting S3 images: {e}")
        
        table.delete_item(Key={"id": news_id})
        return True


news_service = NewsService()
