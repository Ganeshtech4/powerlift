"""
Blog database model
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.sql import func
from app.db.base import Base


class Blog(Base):
    __tablename__ = "blogs"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    content = Column(Text, nullable=False)
    excerpt = Column(String(500))
    
    # S3 Storage
    s3_folder_path = Column(String(255), nullable=False)  # blogs/{slug}/
    thumbnail_url = Column(String(500))
    image_count = Column(Integer, default=0)
    
    # Metadata
    author = Column(String(100), default="Admin")
    category = Column(String(100), index=True)
    tags = Column(String(500))  # Comma-separated
    
    # Status
    is_published = Column(Boolean, default=False)
    views = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    published_at = Column(DateTime(timezone=True))
    
    def __repr__(self):
        return f"<Blog(id={self.id}, title='{self.title}', slug='{self.slug}')>"
