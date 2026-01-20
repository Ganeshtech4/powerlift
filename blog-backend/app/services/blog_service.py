"""
Blog business logic service (AWS DynamoDB)
"""
from typing import List, Optional, Dict, Any
from datetime import datetime
from slugify import slugify
import uuid
from decimal import Decimal
from boto3.dynamodb.conditions import Key, Attr

from app.schemas.blog import BlogCreate, BlogUpdate
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


def _serialize_blog(item: Dict[str, Any]) -> Dict[str, Any]:
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
        "created_at": item.get("created_at"),
        "updated_at": item.get("updated_at"),
        "published_at": item.get("published_at"),
    }


class BlogService:

    @staticmethod
    def create_blog(table, blog_data: BlogCreate) -> Dict[str, Any]:
        """Create a new blog with S3 folder"""
        # Generate unique slug
        base_slug = slugify(blog_data.title)
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
        s3_folder_path = s3_service.create_blog_folder(slug)

        blog_id = str(uuid.uuid4())
        now = datetime.utcnow().isoformat()
        
        item = {
            "id": blog_id,
            "title": blog_data.title,
            "slug": slug,
            "content": blog_data.content,
            "excerpt": blog_data.excerpt,
            "category": blog_data.category,
            "tags": blog_data.tags if blog_data.tags else "",
            "s3_folder_path": s3_folder_path,
            "thumbnail_url": blog_data.thumbnail_url if hasattr(blog_data, 'thumbnail_url') and blog_data.thumbnail_url else None,
            "image_count": len(blog_data.images) if hasattr(blog_data, 'images') and blog_data.images else 0,
            "images": blog_data.images if hasattr(blog_data, 'images') and blog_data.images else [],
            "author": blog_data.author if hasattr(blog_data, 'author') and blog_data.author else "Admin",
            "is_published": blog_data.is_published,
            "views": 0,
            "created_at": now,
            "updated_at": None,
            "published_at": now if blog_data.is_published else None,
        }

        table.put_item(Item=item)
        return _serialize_blog(item)

    @staticmethod
    def get_blog_by_id(table, blog_id: str) -> Optional[Dict[str, Any]]:
        """Get blog by ID"""
        try:
            response = table.get_item(Key={'id': blog_id})
            item = response.get('Item')
            return _serialize_blog(item) if item else None
        except Exception as e:
            print(f"Error getting blog: {e}")
            return None

    @staticmethod
    def get_blog_by_slug(table, slug: str) -> Optional[Dict[str, Any]]:
        """Get blog by slug using GSI"""
        try:
            response = table.query(
                IndexName='slug-index',
                KeyConditionExpression=Key('slug').eq(slug)
            )
            items = response.get('Items', [])
            return _serialize_blog(items[0]) if items else None
        except Exception as e:
            print(f"Error getting blog by slug: {e}")
            return None

    @staticmethod
    def get_all_blogs(
        table,
        skip: int = 0,
        limit: int = 100,
        published_only: bool = False,
    ) -> List[Dict[str, Any]]:
        """Get all blogs with pagination"""
        try:
            # DynamoDB scan (for small datasets)
            scan_kwargs = {}
            
            if published_only:
                scan_kwargs['FilterExpression'] = Attr('is_published').eq(True)
            
            response = table.scan(**scan_kwargs)
            items = response.get('Items', [])
            
            # Sort by created_at (newest first)
            items.sort(key=lambda x: x.get('created_at', ''), reverse=True)
            
            # Apply pagination
            paginated = items[skip:skip + limit]
            
            return [_serialize_blog(item) for item in paginated]
        except Exception as e:
            print(f"Error getting blogs: {e}")
            return []

    @staticmethod
    def update_blog(table, blog_id: str, blog_data: BlogUpdate) -> Optional[Dict[str, Any]]:
        """Update blog"""
        try:
            # Get current item
            current_response = table.get_item(Key={'id': blog_id})
            current = current_response.get('Item')
            
            if not current:
                return None

            update_data = blog_data.model_dump(exclude_unset=True)
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
            for key in ['title', 'content', 'excerpt', 'category', 'tags', 'images', 'thumbnail_url', 'author']:
                if key in update_data:
                    update_expr_parts.append(f"#{key} = :{key}")
                    expr_attr_names[f"#{key}"] = key
                    expr_attr_values[f":{key}"] = update_data[key]
            
            # Update image count if images array is provided
            if 'images' in update_data and update_data['images'] is not None:
                update_expr_parts.append("#image_count = :image_count")
                expr_attr_names["#image_count"] = "image_count"
                expr_attr_values[":image_count"] = len(update_data['images'])
            
            update_expression = "SET " + ", ".join(update_expr_parts)
            
            response = table.update_item(
                Key={'id': blog_id},
                UpdateExpression=update_expression,
                ExpressionAttributeNames=expr_attr_names,
                ExpressionAttributeValues=expr_attr_values,
                ReturnValues="ALL_NEW"
            )
            
            return _serialize_blog(response.get('Attributes'))
        except Exception as e:
            print(f"Error updating blog: {e}")
            return None

    @staticmethod
    def delete_blog(table, blog_id: str) -> bool:
        """Delete blog and its S3 folder"""
        try:
            # Get blog first
            response = table.get_item(Key={'id': blog_id})
            item = response.get('Item')
            
            if not item:
                return False
            
            # Delete S3 folder
            try:
                s3_service.delete_blog_folder(item.get("slug"))
            except Exception as e:
                print(f"Error deleting S3 folder: {e}")
            
            # Delete from DynamoDB
            table.delete_item(Key={'id': blog_id})
            return True
        except Exception as e:
            print(f"Error deleting blog: {e}")
            return False

    @staticmethod
    def increment_views(table, blog_id: str):
        """Increment view count"""
        try:
            # First check if item exists
            response = table.get_item(Key={'id': blog_id})
            if 'Item' not in response:
                print(f"Cannot increment views - blog {blog_id} not found")
                return
            
            # Update with ADD expression - works even if views doesn't exist
            table.update_item(
                Key={'id': blog_id},
                UpdateExpression="ADD #views :inc",
                ExpressionAttributeNames={'#views': 'views'},
                ExpressionAttributeValues={':inc': 1}
            )
        except Exception as e:
            print(f"Error incrementing views: {e}")
            # Don't raise - this is not critical

    @staticmethod
    def update_image_count(table, blog_id: str, count: int):
        """Update image count"""
        try:
            table.update_item(
                Key={'id': blog_id},
                UpdateExpression="SET image_count = :count",
                ExpressionAttributeValues={':count': count}
            )
        except Exception as e:
            print(f"Error updating image count: {e}")


blog_service = BlogService()
