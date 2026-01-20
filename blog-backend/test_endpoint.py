"""Test blog endpoint directly"""
import sys
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.db.dynamodb import get_blogs_table
from app.services.blog_service import blog_service

def test_get_blog():
    try:
        table = get_blogs_table()
        print(f"✅ Connected to table: {table.name}")
        
        # Get all published blogs
        from boto3.dynamodb.conditions import Attr
        response = table.scan(FilterExpression=Attr('is_published').eq(True), Limit=1)
        
        if not response['Items']:
            print("No published blogs found")
            return
        
        blog_id = response['Items'][0]['id']
        print(f"\nTesting blog ID: {blog_id}")
        print(f"Blog title: {response['Items'][0]['title']}")
        
        # Get blog details
        blog = blog_service.get_blog_by_id(table, blog_id)
        print(f"\n✅ Blog loaded successfully!")
        print(f"Title: {blog['title']}")
        print(f"Image count: {blog.get('image_count', 0)}")
        print(f"Thumbnail URL: {blog.get('thumbnail_url', 'None')}")
        
        print("\n✅ All tests passed!")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_get_blog()
