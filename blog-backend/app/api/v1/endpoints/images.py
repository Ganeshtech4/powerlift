"""
Image upload and management endpoints (DynamoDB)
"""
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from typing import List
import io
from PIL import Image
import uuid

from app.db.dynamodb import get_blog_table
from app.schemas.blog import ImageUploadResponse, BlogImagesResponse
from app.services.blog_service import blog_service
from app.services.s3_service import s3_service
from app.core.security import verify_token
from app.core.config import settings

router = APIRouter()


def validate_image(file: UploadFile) -> tuple:
    """Validate image file"""
    # Check file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Read and validate with PIL
    contents = file.file.read()
    file.file.seek(0)  # Reset file pointer
    
    # Check size
    size_mb = len(contents) / (1024 * 1024)
    if size_mb > settings.MAX_IMAGE_SIZE_MB:
        raise HTTPException(
            status_code=400,
            detail=f"Image size must be less than {settings.MAX_IMAGE_SIZE_MB}MB"
        )
    
    try:
        img = Image.open(io.BytesIO(contents))
        width, height = img.size
        return width, height
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file")


@router.post("/{blog_id}/upload", response_model=ImageUploadResponse)
def upload_image(
    blog_id: str,
    file: UploadFile = File(...),
    is_thumbnail: bool = Form(False),
    table = Depends(get_blog_table),
    current_user: str = Depends(verify_token)
):
    """Upload image to blog folder (Admin only)"""
    # Check if blog exists
    blog = blog_service.get_blog_by_id(table, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    # Check image count limit
    if blog["image_count"] >= settings.MAX_IMAGES_PER_BLOG and not is_thumbnail:
        raise HTTPException(
            status_code=400,
            detail=f"Maximum {settings.MAX_IMAGES_PER_BLOG} images per blog"
        )
    
    # Validate image
    width, height = validate_image(file)
    
    # Generate unique filename
    ext = file.filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}" if not is_thumbnail else f"thumbnail.{ext}"
    
    # Upload to S3
    file.file.seek(0)
    if is_thumbnail:
        url = s3_service.upload_thumbnail(file.file, blog["slug"], filename)
        # Update thumbnail url in DynamoDB
        table.update_item(
            Key={'id': blog_id},
            UpdateExpression="SET thumbnail_url = :url",
            ExpressionAttributeValues={':url': url}
        )
    else:
        url = s3_service.upload_image(file.file, blog["slug"], filename, file.content_type)
        table.update_item(
            Key={'id': blog_id},
            UpdateExpression="ADD image_count :inc",
            ExpressionAttributeValues={':inc': 1}
        )
    
    return ImageUploadResponse(
        filename=filename,
        url=url,
        size=file.size,
        width=width,
        height=height
    )


@router.get("/{blog_id}/list", response_model=BlogImagesResponse)
def list_blog_images(blog_id: str, table = Depends(get_blog_table)):
    """Get all images for a blog"""
    blog = blog_service.get_blog_by_id(table, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    images = s3_service.list_blog_images(blog["slug"])
    
    # Update image count in DynamoDB
    blog_service.update_image_count(table, blog_id, len(images))
    
    return BlogImagesResponse(
        blog_id=blog["id"],
        blog_slug=blog["slug"],
        images=images,
        total_count=len(images)
    )


@router.delete("/{blog_id}/images/{filename}")
def delete_image(
    blog_id: str,
    filename: str,
    table = Depends(get_blog_table),
    current_user: str = Depends(verify_token)
):
    """Delete specific image from blog (Admin only)"""
    blog = blog_service.get_blog_by_id(table, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    # Delete from S3
    s3_service.delete_image(blog["slug"], filename)
    
    # Update count in DynamoDB
    if filename != "thumbnail.jpg":
        table.update_item(
            Key={'id': blog_id},
            UpdateExpression="ADD image_count :dec",
            ExpressionAttributeValues={':dec': -1}
        )
    else:
        table.update_item(
            Key={'id': blog_id},
            UpdateExpression="SET thumbnail_url = :null",
            ExpressionAttributeValues={':null': None}
        )
    
    return {"message": "Image deleted successfully"}
