"""
Blog CRUD endpoints (DynamoDB)
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List

from app.db.dynamodb import get_blog_table
from app.schemas.blog import BlogCreate, BlogUpdate, BlogResponse, BlogListResponse
from app.services.blog_service import blog_service
from app.core.security import verify_token

router = APIRouter()


@router.post("/", response_model=BlogResponse, status_code=status.HTTP_201_CREATED)
def create_blog(
    blog: BlogCreate,
    table = Depends(get_blog_table),
    current_user: str = Depends(verify_token)
):
    """Create a new blog (Admin only)"""
    new_blog = blog_service.create_blog(table, blog)
    return new_blog


@router.get("/", response_model=List[BlogListResponse])
def get_blogs(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    published_only: bool = Query(False),
    table = Depends(get_blog_table)
):
    """Get all blogs with pagination"""
    blogs = blog_service.get_all_blogs(table, skip, limit, published_only)
    return blogs


@router.get("/{blog_id}", response_model=BlogResponse)
def get_blog(blog_id: str, table = Depends(get_blog_table)):
    """Get blog by ID"""
    try:
        blog = blog_service.get_blog_by_id(table, blog_id)
        if not blog:
            raise HTTPException(status_code=404, detail="Blog not found")
        
        # Increment view count
        try:
            blog_service.increment_views(table, blog_id)
        except Exception as e:
            print(f"Warning: Could not increment views: {e}")
        
        return blog
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in get_blog: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/slug/{slug}", response_model=BlogResponse)
def get_blog_by_slug(slug: str, table = Depends(get_blog_table)):
    """Get blog by slug"""
    blog = blog_service.get_blog_by_slug(table, slug)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    # Increment view count
    blog_service.increment_views(table, blog["id"])
    return blog


@router.put("/{blog_id}", response_model=BlogResponse)
def update_blog(
    blog_id: str,
    blog_update: BlogUpdate,
    table = Depends(get_blog_table),
    current_user: str = Depends(verify_token)
):
    """Update blog (Admin only)"""
    blog = blog_service.update_blog(table, blog_id, blog_update)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog


@router.delete("/{blog_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_blog(
    blog_id: str,
    table = Depends(get_blog_table),
    current_user: str = Depends(verify_token)
):
    """Delete blog and all its images (Admin only)"""
    success = blog_service.delete_blog(table, blog_id)
    if not success:
        raise HTTPException(status_code=404, detail="Blog not found")
    return None
