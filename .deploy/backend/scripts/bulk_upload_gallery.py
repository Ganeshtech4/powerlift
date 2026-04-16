"""
Bulk Upload Gallery Images from External Hard Disk to S3
This script uploads folders with images to S3 and creates blog posts automatically
"""
import os
import sys
from pathlib import Path
from datetime import datetime
import uuid
from slugify import slugify
from PIL import Image
import io

# Add parent directory to path to import app modules
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.services.s3_service import s3_service
from app.db.dynamodb import get_blogs_table
from app.core.config import settings


def compress_image(image_path, max_size_mb=2, quality=85):
    """Compress image to reduce file size"""
    try:
        img = Image.open(image_path)
        
        # Convert RGBA to RGB if needed
        if img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = background
        
        # Save to bytes with compression
        output = io.BytesIO()
        img.save(output, format='JPEG', quality=quality, optimize=True)
        output.seek(0)
        
        # Check size and reduce quality if needed
        while output.tell() > max_size_mb * 1024 * 1024 and quality > 50:
            quality -= 5
            output = io.BytesIO()
            img.save(output, format='JPEG', quality=quality, optimize=True)
            output.seek(0)
        
        return output.getvalue()
    except Exception as e:
        print(f"❌ Error compressing image {image_path}: {e}")
        # Return original file if compression fails
        with open(image_path, 'rb') as f:
            return f.read()


def upload_folder_to_gallery(folder_path, category="Gallery", author="Admin"):
    """
    Upload all images from a folder to S3 and create a gallery post
    
    Args:
        folder_path: Path to folder containing images
        category: Category for the gallery post (District, State, Nationals, etc.)
        author: Author name
    """
    folder_path = Path(folder_path)
    
    if not folder_path.exists():
        print(f"❌ Folder not found: {folder_path}")
        return None
    
    # Get folder name as title
    folder_name = folder_path.name
    print(f"\n📁 Processing folder: {folder_name}")
    
    # Get all image files recursively (including subfolders)
    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.avif'}
    image_files = []
    
    # Search recursively for images
    for ext in image_extensions:
        image_files.extend(folder_path.rglob(f'*{ext}'))
        image_files.extend(folder_path.rglob(f'*{ext.upper()}'))
    
    # Remove duplicates and ensure they are files
    image_files = list(set([f for f in image_files if f.is_file()]))
    
    if not image_files:
        print(f"⚠️  No images found in {folder_name}")
        return None
    
    print(f"📸 Found {len(image_files)} images (including subfolders)")
    
    # Create slug
    base_slug = slugify(folder_name)
    slug = base_slug
    
    # Check if slug exists
    table = get_blogs_table()
    counter = 1
    while True:
        response = table.query(
            IndexName='slug-index',
            KeyConditionExpression='slug = :slug',
            ExpressionAttributeValues={':slug': slug}
        )
        if not response.get('Items'):
            break
        slug = f"{base_slug}-{counter}"
        counter += 1
    
    print(f"✅ Using slug: {slug}")
    
    # Create S3 folder
    s3_folder = f"blogs/{slug}/"
    
    # Upload images to S3
    uploaded_images = []
    thumbnail_url = None
    
    for idx, image_file in enumerate(image_files, 1):
        try:
            print(f"  ⬆️  Uploading {idx}/{len(image_files)}: {image_file.name}", end="")
            
            # Compress image
            compressed_data = compress_image(image_file)
            
            # Upload to S3
            s3_key = f"{s3_folder}{image_file.name}"
            s3_service.s3_client.put_object(
                Bucket=settings.AWS_BLOG_BUCKET,
                Key=s3_key,
                Body=compressed_data,
                ContentType=f'image/{image_file.suffix[1:]}'
            )
            
            # Get public URL
            image_url = f"https://{settings.AWS_BLOG_BUCKET}.s3.{settings.AWS_REGION}.amazonaws.com/{s3_key}"
            uploaded_images.append(image_url)
            
            # Use first image as thumbnail
            if idx == 1:
                thumbnail_url = image_url
            
            print(f" ✅")
            
        except Exception as e:
            print(f" ❌ Error: {e}")
            continue
    
    if not uploaded_images:
        print(f"❌ No images uploaded successfully")
        return None
    
    # Create blog post in DynamoDB
    blog_id = str(uuid.uuid4())
    now = datetime.utcnow().isoformat()
    
    blog_item = {
        'id': blog_id,
        'title': folder_name,
        'slug': slug,
        'content': f"Gallery images from {folder_name}",
        'excerpt': f"{len(uploaded_images)} powerlifting photos",
        'category': category.lower(),
        'tags': 'gallery,photos',
        's3_folder_path': s3_folder,
        'thumbnail_url': thumbnail_url,
        'image_count': len(uploaded_images),
        'images': uploaded_images,
        'author': author,
        'is_published': True,  # Auto-publish
        'views': 0,
        'created_at': now,
        'updated_at': None,
        'published_at': now,
    }
    
    table.put_item(Item=blog_item)
    
    print(f"✅ Created gallery post: {folder_name}")
    print(f"   - ID: {blog_id}")
    print(f"   - Slug: {slug}")
    print(f"   - Images: {len(uploaded_images)}")
    print(f"   - Published: Yes")
    
    return blog_item


def bulk_upload_from_directory(root_directory, category_mapping=None):
    """
    Upload all folders from a root directory
    
    Args:
        root_directory: Root directory containing folders with images
        category_mapping: Dict mapping folder names to categories (optional)
    """
    root_path = Path(root_directory)
    
    if not root_path.exists():
        print(f"❌ Directory not found: {root_directory}")
        return
    
    print(f"\n{'='*60}")
    print(f"  Bulk Gallery Upload Tool")
    print(f"{'='*60}")
    print(f"Source Directory: {root_path}")
    print(f"S3 Bucket: {settings.AWS_BLOG_BUCKET}")
    print(f"{'='*60}\n")
    
    # System folders to skip
    skip_folders = {
        '$RECYCLE.BIN', '.Spotlight-V100', '.fseventsd', '.Trashes',
        'System Volume Information', 'Seagate', '$Recycle.Bin',
        'RECYCLER', 'Recycled', '.TemporaryItems'
    }
    
    # Get all subdirectories
    folders = [
        f for f in root_path.iterdir() 
        if f.is_dir() and f.name not in skip_folders and not f.name.startswith('.')
    ]
    
    if not folders:
        print("⚠️  No folders found in the directory")
        return
    
    print(f"📁 Found {len(folders)} folders to process\n")
    
    # Process each folder
    successful = 0
    failed = 0
    
    for folder in folders:
        # Determine category
        category = "Gallery"
        if category_mapping and folder.name in category_mapping:
            category = category_mapping[folder.name]
        
        try:
            result = upload_folder_to_gallery(folder, category=category)
            if result:
                successful += 1
            else:
                failed += 1
        except Exception as e:
            print(f"❌ Error processing {folder.name}: {e}")
            failed += 1
    
    # Summary
    print(f"\n{'='*60}")
    print(f"  Upload Summary")
    print(f"{'='*60}")
    print(f"✅ Successful: {successful}")
    print(f"❌ Failed: {failed}")
    print(f"📊 Total: {len(folders)}")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='Bulk upload gallery images to S3')
    parser.add_argument('directory', help='Root directory containing image folders')
    parser.add_argument('--category', default='Gallery', help='Default category for posts')
    
    args = parser.parse_args()
    
    # Example: If you want to map specific folders to categories
    category_mapping = {
        # 'Folder Name': 'Category',
        # 'District Championship': 'District',
        # 'State Competition': 'State',
        # 'Nationals 2024': 'Nationals',
    }
    
    bulk_upload_from_directory(args.directory, category_mapping)
