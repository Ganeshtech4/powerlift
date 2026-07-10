"""
VTD business logic service (Gallery-style with DynamoDB)
"""
from typing import List, Optional, Dict, Any
from datetime import datetime
from slugify import slugify
import uuid
from decimal import Decimal
from boto3.dynamodb.conditions import Key, Attr

from app.schemas.vtd import VtdCreate, VtdUpdate
from app.services.s3_service import s3_service


def _decimal_to_float(obj):
    """Convert Decimal to float for JSON serialization"""
    if isinstance(obj, Decimal):
        return float(obj)
    elif isinstance(obj, dict):
        return {k: _decimal_to_float(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [_decimal_to_float(v) for v in obj]
    return obj


def _serialize(item: Dict[str, Any]) -> Dict[str, Any]:
    """Convert DynamoDB item to API response"""
    if not item:
        return None
    
    # Convert Decimal to float
    item = _decimal_to_float(item)
    
    return {
        "id": item.get("id"),
        "title": item.get("title"),
        "slug": item.get("slug"),
        "content": item.get("content"),
        "excerpt": item.get("excerpt"),
        "s3_folder_path": item.get("s3_folder_path"),
        "thumbnail_url": item.get("thumbnail_url"),
        "image_count": item.get("image_count", 0),
        "images": item.get("images", []),
        "author": item.get("author", "Admin"),
        "category": item.get("category"),
        "tags": item.get("tags", ""),
        "is_published": item.get("is_published", False),
        "views": item.get("views", 0),
        "location": item.get("location"),
        "event_date": item.get("event_date"),
        "created_at": item.get("created_at"),
        "updated_at": item.get("updated_at"),
        "published_at": item.get("published_at"),
    }


class VtdService:

    @staticmethod
    def create(table, data: VtdCreate) -> Dict[str, Any]:
        """Create a new VTD item with S3 folder"""
        # Generate unique slug
        base_slug = slugify(data.title)
        slug = base_slug
        counter = 1
        
        # Check if slug exists using GSI
        while True:
            response = table.query(
                IndexName='slug-index',
                KeyConditionExpression=Key('slug').eq(slug)
            )
            if not response.get('Items'):
                break
            slug = f"{base_slug}-{counter}"
            counter += 1

        # Create S3 folder
        s3_folder_path = s3_service.create_blog_folder(f"vtd-{slug}")

        item_id = str(uuid.uuid4())
        now = datetime.utcnow().isoformat()
        
        item = {
            "id": item_id,
            "title": data.title,
            "slug": slug,
            "content": data.content,
            "excerpt": data.excerpt,
            "category": data.category,
            "tags": data.tags if data.tags else "",
            "s3_folder_path": s3_folder_path,
            "thumbnail_url": data.thumbnail_url if data.thumbnail_url else None,
            "image_count": len(data.images) if data.images else 0,
            "images": data.images if data.images else [],
            "author": data.author if data.author else "Admin",
            "is_published": data.is_published,
            "views": 0,
            "location": data.location if data.location else None,
            "event_date": data.event_date if data.event_date else None,
            "created_at": now,
            "updated_at": None,
            "published_at": now if data.is_published else None,
        }

        table.put_item(Item=item)
        return _serialize(item)

    @staticmethod
    def get_by_id(table, item_id: str) -> Optional[Dict[str, Any]]:
        """Get VTD item by ID"""
        try:
            response = table.get_item(Key={'id': item_id})
            item = response.get('Item')
            return _serialize(item) if item else None
        except Exception as e:
            print(f"Error getting VTD item: {e}")
            return None

    @staticmethod
    def get_by_slug(table, slug: str) -> Optional[Dict[str, Any]]:
        """Get VTD item by slug using GSI"""
        try:
            response = table.query(
                IndexName='slug-index',
                KeyConditionExpression=Key('slug').eq(slug)
            )
            items = response.get('Items', [])
            return _serialize(items[0]) if items else None
        except Exception as e:
            print(f"Error getting VTD item by slug: {e}")
            return None

    @staticmethod
    def get_all(
        table,
        skip: int = 0,
        limit: int = 100,
        published_only: bool = False,
    ) -> List[Dict[str, Any]]:
        """Get all VTD items with pagination"""
        try:
            scan_kwargs = {}
            
            if published_only:
                scan_kwargs['FilterExpression'] = Attr('is_published').eq(True)
            
            response = table.scan(**scan_kwargs)
            items = response.get('Items', [])
            
            # Sort by created_at (newest first)
            items.sort(key=lambda x: x.get('created_at', ''), reverse=True)
            
            # Apply pagination
            paginated = items[skip:skip + limit]
            
            return [_serialize(item) for item in paginated]
        except Exception as e:
            print(f"Error getting VTD items: {e}")
            return []

    @staticmethod
    def update(table, item_id: str, data: VtdUpdate) -> Optional[Dict[str, Any]]:
        """Update VTD item"""
        try:
            # Get current item
            current_response = table.get_item(Key={'id': item_id})
            current = current_response.get('Item')
            
            if not current:
                return None

            update_data = data.model_dump(exclude_unset=True)
            now = datetime.utcnow().isoformat()
            
            # Build update expression
            update_expr_parts = []
            expr_attr_values = {}
            expr_attr_names = {}
            
            # Always update updated_at
            update_expr_parts.append("#updated_at = :updated_at")
            expr_attr_names["#updated_at"] = "updated_at"
            expr_attr_values[":updated_at"] = now
            
            # Handle publish state
            if "is_published" in update_data:
                update_expr_parts.append("#is_published = :is_published")
                expr_attr_names["#is_published"] = "is_published"
                expr_attr_values[":is_published"] = update_data["is_published"]
                
                if update_data["is_published"] and not current.get("is_published", False):
                    update_expr_parts.append("#published_at = :published_at")
                    expr_attr_names["#published_at"] = "published_at"
                    expr_attr_values[":published_at"] = now
                elif not update_data["is_published"]:
                    update_expr_parts.append("#published_at = :published_at")
                    expr_attr_names["#published_at"] = "published_at"
                    expr_attr_values[":published_at"] = None
            
            # Update other fields
            for key, value in update_data.items():
                if key != "is_published":
                    attr_key = f"#{key}"
                    value_key = f":{key}"
                    update_expr_parts.append(f"{attr_key} = {value_key}")
                    expr_attr_names[attr_key] = key
                    expr_attr_values[value_key] = value
                    
                    if key == "images":
                        update_expr_parts.append("#image_count = :image_count")
                        expr_attr_names["#image_count"] = "image_count"
                        expr_attr_values[":image_count"] = len(value) if value else 0
            
            update_expr = "SET " + ", ".join(update_expr_parts)
            
            response = table.update_item(
                Key={'id': item_id},
                UpdateExpression=update_expr,
                ExpressionAttributeNames=expr_attr_names,
                ExpressionAttributeValues=expr_attr_values,
                ReturnValues='ALL_NEW'
            )
            
            return _serialize(response.get('Attributes'))
        except Exception as e:
            print(f"Error updating VTD item: {e}")
            import traceback
            traceback.print_exc()
            return None

    @staticmethod
    def delete(table, item_id: str) -> bool:
        """Delete VTD item and cleanup S3 images"""
        try:
            # Get the item first to access image URLs
            response = table.get_item(Key={'id': item_id})
            item = response.get('Item')
            
            if not item:
                return False
            
            # Collect all image URLs
            image_urls = []
            if item.get('images'):
                image_urls.extend(item['images'])
            if item.get('thumbnail_url'):
                image_urls.append(item['thumbnail_url'])
            
            # Delete images from S3
            if image_urls:
                try:
                    deleted_count = s3_service.delete_result_images(image_urls)
                    print(f"Deleted {deleted_count} images from S3")
                except Exception as e:
                    print(f"Warning: Failed to delete S3 images: {e}")
            
            # Delete from DynamoDB
            table.delete_item(Key={'id': item_id})
            return True
        except Exception as e:
            print(f"Error deleting VTD item: {e}")
            return False

    @staticmethod
    def increment_views(table, item_id: str) -> bool:
        """Increment view count"""
        try:
            table.update_item(
                Key={'id': item_id},
                UpdateExpression='ADD #views :inc',
                ExpressionAttributeNames={'#views': 'views'},
                ExpressionAttributeValues={':inc': 1}
            )
            return True
        except Exception as e:
            print(f"Error incrementing views: {e}")
            return False


vtd_service = VtdService()
