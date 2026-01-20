import asyncio
import sys
sys.path.insert(0, "E:\\APTIT\\revamp\\Rekhapowerlift\\blog-backend")

from app.db.dynamodb import get_blogs_table
from app.services.blog_service import blog_service

async def test_blog():
    try:
        table = get_blogs_table()
        print(f"✓ Connected to table: {table.name}")
        
        # Get all blogs
        blogs = blog_service.get_all_blogs(table, published_only=True)
        print(f"✓ Found {len(blogs)} published blogs")
        
        if blogs:
            blog_id = blogs[0]['id']
            print(f"\n Testing blog ID: {blog_id}")
            print(f"Title: {blogs[0]['title']}")
            
            # Get blog by ID
            blog_detail = blog_service.get_blog_by_id(table, blog_id)
            print(f"✓ Blog detail loaded")
            print(f"  Title: {blog_detail['title']}")
            print(f"  Images: {blog_detail['image_count']}")
            print(f"  Published: {blog_detail['is_published']}")
            
            # Try incrementing views
            try:
                blog_service.increment_views(table, blog_id)
                print("✓ Views incremented")
            except Exception as e:
                print(f"✗ Error incrementing views: {e}")
                import traceback
                traceback.print_exc()
            
    except Exception as e:
        print(f"✗ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_blog())
