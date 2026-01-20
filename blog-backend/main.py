"""
FastAPI Blog Management Backend
Main application entry point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn

from app.core.config import settings
from app.api.v1.api import api_router
from app.db.dynamodb import get_blogs_table


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifecycle manager"""
    # Startup: Initialize DynamoDB table
    try:
        table = get_blogs_table()
        print(f"✅ Connected to DynamoDB table: {table.name}")
    except Exception as e:
        print(f"⚠️ DynamoDB connection check failed: {e}")
    yield
    # Shutdown: Cleanup if needed
    print("🛑 Shutting down...")


app = FastAPI(
    title="Powerlifting Blog API",
    description="Blog management system with AWS S3 + DynamoDB",
    version="1.0.0",
    openapi_version="3.1.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_origin_regex=r"http://localhost:\d+",  # Allow any localhost port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Include API routes
app.include_router(api_router, prefix=settings.API_V1_PREFIX)


@app.get("/")
async def root():
    return {
        "message": "Telangana Powerlifting Blog API",
        "version": "1.0.0",
        "docs": "/docs",
        "database": "AWS DynamoDB"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy", "database": "DynamoDB"}


if __name__ == "__main__":
    import logging
    logging.basicConfig(level=logging.DEBUG)
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=False,
        log_level="debug"
    )
