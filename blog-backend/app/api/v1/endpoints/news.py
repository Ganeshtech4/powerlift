"""
News CRUD endpoints (DynamoDB)
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List

from app.db.news_db import get_news_table
from app.schemas.news import NewsCreate, NewsUpdate, NewsResponse
from app.services.news_service import news_service
from app.core.security import verify_token

router = APIRouter()


@router.get("/", response_model=List[NewsResponse])
def get_news(
    published_only: bool = Query(False),
    table=Depends(get_news_table)
):
    """Get all news items (public)"""
    return news_service.get_all_news(table, published_only=published_only)


@router.get("/{slug}", response_model=NewsResponse)
def get_news_by_slug(slug: str, table=Depends(get_news_table)):
    """Get a single news item by slug (public)"""
    item = news_service.get_news_by_slug(table, slug)
    if not item:
        raise HTTPException(status_code=404, detail="News not found")
    return item


@router.post("/", response_model=NewsResponse, status_code=status.HTTP_201_CREATED)
def create_news(
    data: NewsCreate,
    table=Depends(get_news_table),
    current_user: str = Depends(verify_token)
):
    """Create news item (Admin only)"""
    return news_service.create_news(table, data)


@router.put("/{news_id}", response_model=NewsResponse)
def update_news(
    news_id: str,
    data: NewsUpdate,
    table=Depends(get_news_table),
    current_user: str = Depends(verify_token)
):
    """Update news item (Admin only)"""
    item = news_service.update_news(table, news_id, data)
    if not item:
        raise HTTPException(status_code=404, detail="News not found")
    return item


@router.delete("/{news_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_news(
    news_id: str,
    table=Depends(get_news_table),
    current_user: str = Depends(verify_token)
):
    """Delete news item (Admin only)"""
    if not news_service.delete_news(table, news_id):
        raise HTTPException(status_code=404, detail="News not found")
