"""
AWS S3 Service for blog image management
"""
import boto3
from botocore.exceptions import ClientError
from typing import List, BinaryIO, Optional
import io
from urllib.parse import quote
from PIL import Image

from app.core.config import settings


class S3Service:
    def __init__(self):
        self.s3_client = boto3.client(
            's3',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_REGION
        )
        self.bucket = settings.AWS_BLOG_BUCKET
    
    def create_blog_folder(self, slug: str) -> str:
        """Create a folder for blog images in S3"""
        folder_path = f"blogs/{slug}/"
        # S3 doesn't have folders, but we'll use this path for organization
        return folder_path
    
    def upload_image(
        self,
        file: BinaryIO,
        slug: str,
        filename: str,
        content_type: str = "image/jpeg"
    ) -> str:
        """Upload an image to S3"""
        key = f"blogs/{slug}/{filename}"
        
        try:
            self.s3_client.put_object(
                Bucket=self.bucket,
                Key=key,
                Body=file,
                ContentType=content_type,
                CacheControl='max-age=31536000'
            )
            return self._get_public_url(key)
        except ClientError as e:
            raise Exception(f"Failed to upload image: {str(e)}")

    def upload_file(
        self,
        file: BinaryIO,
        key: str,
        content_type: str
    ) -> dict:
        """Generic file upload to S3"""
        try:
            self.s3_client.put_object(
                Bucket=self.bucket,
                Key=key,
                Body=file,
                ContentType=content_type,
                CacheControl='max-age=31536000'
            )
            return {
                "url": self._get_public_url(key),
                "key": key
            }
        except ClientError as e:
            raise Exception(f"Failed to upload file: {str(e)}")

    
    def upload_thumbnail(
        self,
        file: BinaryIO,
        slug: str,
        filename: str = "thumbnail.jpg"
    ) -> str:
        """Upload and create thumbnail"""
        # Open image and create thumbnail
        img = Image.open(file)
        img.thumbnail((settings.THUMBNAIL_WIDTH, settings.THUMBNAIL_HEIGHT), Image.Resampling.LANCZOS)
        
        # Convert to bytes
        output = io.BytesIO()
        img.save(output, format='JPEG', quality=85)
        output.seek(0)
        
        return self.upload_image(output, slug, filename, "image/jpeg")
    
    def list_blog_images(self, slug: str) -> List[str]:
        """List all images in a blog folder"""
        prefix = f"blogs/{slug}/"
        
        try:
            response = self.s3_client.list_objects_v2(
                Bucket=self.bucket,
                Prefix=prefix
            )
            
            if 'Contents' not in response:
                return []
            
            images = []
            for obj in response['Contents']:
                key = obj['Key']
                # Skip the folder itself
                if key != prefix:
                    images.append(self._get_public_url(key))
            
            return images
        except ClientError as e:
            raise Exception(f"Failed to list images: {str(e)}")

    def list_files(self, prefix: str = "") -> List[dict]:
        """Generic list files with prefix"""
        try:
            response = self.s3_client.list_objects_v2(
                Bucket=self.bucket,
                Prefix=prefix
            )
            
            if 'Contents' not in response:
                return []
            
            files = []
            for obj in response['Contents']:
                files.append({
                    "key": obj['Key'],
                    "url": self._get_public_url(obj['Key']),
                    "last_modified": obj['LastModified'],
                    "size": obj['Size']
                })
            
            return files
        except ClientError as e:
            raise Exception(f"Failed to list files: {str(e)}")

    
    def delete_blog_folder(self, slug: str) -> int:
        """Delete all images in a blog folder"""
        prefix = f"blogs/{slug}/"
        deleted_count = 0
        
        try:
            # List all objects in the folder
            response = self.s3_client.list_objects_v2(
                Bucket=self.bucket,
                Prefix=prefix
            )
            
            if 'Contents' not in response:
                return 0
            
            # Delete all objects
            objects_to_delete = [{'Key': obj['Key']} for obj in response['Contents']]
            
            if objects_to_delete:
                delete_response = self.s3_client.delete_objects(
                    Bucket=self.bucket,
                    Delete={'Objects': objects_to_delete}
                )
                deleted_count = len(delete_response.get('Deleted', []))
            
            return deleted_count
        except ClientError as e:
            raise Exception(f"Failed to delete folder: {str(e)}")
    
    def delete_image(self, slug: str, filename: str) -> bool:
        """Delete a single image"""
        key = f"blogs/{slug}/{filename}"
        
        try:
            self.s3_client.delete_object(Bucket=self.bucket, Key=key)
            return True
        except ClientError as e:
            raise Exception(f"Failed to delete image: {str(e)}")

    def delete_file(self, key: str) -> bool:
        """Generic delete file"""
        try:
            self.s3_client.delete_object(Bucket=self.bucket, Key=key)
            return True
        except ClientError as e:
            raise Exception(f"Failed to delete file: {str(e)}")

    def file_exists(self, key: str) -> bool:
        """Check if file exists"""
        try:
            self.s3_client.head_object(Bucket=self.bucket, Key=key)
            return True
        except ClientError:
            return False

    
    def _get_public_url(self, key: str) -> str:
        """Generate public URL for S3 object"""
        encoded_key = quote(key, safe='/')
        return f"https://{self.bucket}.s3.{settings.AWS_REGION}.amazonaws.com/{encoded_key}"

    def get_public_url(self, key: str) -> str:
        """Expose the regional public URL for objects that are directly readable."""
        return self._get_public_url(key)
    
    def get_presigned_url(self, key: str, expiration: int = 3600) -> str:
        """Generate presigned URL for temporary access"""
        try:
            url = self.s3_client.generate_presigned_url(
                'get_object',
                Params={'Bucket': self.bucket, 'Key': key},
                ExpiresIn=expiration
            )
            return url
        except ClientError as e:
            raise Exception(f"Failed to generate presigned URL: {str(e)}")


# Singleton instance
s3_service = S3Service()
