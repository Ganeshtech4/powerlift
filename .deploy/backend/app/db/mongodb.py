"""
MongoDB client and dependency
"""
from motor.motor_asyncio import AsyncIOMotorClient
from typing import AsyncGenerator

from app.core.config import settings

_client: AsyncIOMotorClient | None = None


def get_client() -> AsyncIOMotorClient:
    global _client
    if _client is None:
        _client = AsyncIOMotorClient(settings.MONGODB_URI)
    return _client


def get_database():
    client = get_client()
    return client[settings.MONGODB_DB_NAME]


async def get_blog_collection() -> AsyncGenerator:
    db = get_database()
    yield db["blogs"]
