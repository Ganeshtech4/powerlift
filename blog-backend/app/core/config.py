"""
Application Configuration
Loads environment variables and application settings
"""
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Union
from pydantic import field_validator
from pathlib import Path

_ENV_FILE = Path(__file__).resolve().parent.parent.parent / ".env"


class Settings(BaseSettings):
    # Database (AWS DynamoDB)
    DYNAMODB_BLOGS_TABLE: str = "rekha_powerlifting_blogs"
    DYNAMODB_DISTRICTS_TABLE: str = "rekha_telangana_districts"
    DYNAMODB_RESULTS_TABLE: str = "rekha_results"
    DYNAMODB_EVENTS_TABLE: str = "rekha_events"
    DYNAMODB_COMMITTEE_TABLE: str = "rekha_committee_members"
    DYNAMODB_REFEREES_TABLE: str = "rekha_referees"
    DYNAMODB_PARTNERSHIPS_TABLE: str = "rekha_partnerships"
    DYNAMODB_INKSPIRE_TABLE: str = "rekha_inkspire_books"
    DYNAMODB_VTD_TABLE: str = "rekha_vtd_books"
    DYNAMODB_NEWS_TABLE: str = "rekha_news"
    
    # AWS S3
    AWS_ACCESS_KEY_ID: str
    AWS_SECRET_ACCESS_KEY: str
    AWS_REGION: str = "ap-south-2"
    AWS_BLOG_BUCKET: str
    
    # Authentication
    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080  # 7 days
    
    # API
    API_V1_PREFIX: str = "/api/v1"
    CORS_ORIGINS: Union[List[str], str] = [
        "http://localhost:3000",
        "http://localhost:5000",
    ]
    
    @field_validator('CORS_ORIGINS', mode='before')
    @classmethod
    def parse_cors_origins(cls, v):
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(',')]
        return v
    
    # Image Processing
    MAX_IMAGE_SIZE_MB: int = 20
    MAX_IMAGES_PER_BLOG: int = 500
    THUMBNAIL_WIDTH: int = 400
    THUMBNAIL_WIDTH: int = 400
    THUMBNAIL_HEIGHT: int = 300

    # Email Configuration (Gmail SMTP)
    # Use an App Password from Google Account > Security > 2-Step Verification > App passwords
    MAIL_USERNAME: str = "powerlifitingassociationofts@gmail.com"
    MAIL_PASSWORD: str = ""  # Set this in .env file with Gmail App Password
    MAIL_FROM: str = "powerlifitingassociationofts@gmail.com"
    MAIL_PORT: int = 587
    MAIL_SERVER: str = "smtp.gmail.com"
    MAIL_FROM_NAME: str = "WPC Telangana Contact Form"
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TLS: bool = False
    USE_CREDENTIALS: bool = True
    VALIDATE_CERTS: bool = True
    MAIL_TO: str = "powerlifitingassociationofts@gmail.com"  # Destination email
    
    # Pydantic v2 settings
    model_config = SettingsConfigDict(
        env_file=str(_ENV_FILE),
        case_sensitive=True,
        extra="ignore",  # Ignore extra env vars like legacy DATABASE_URL
    )


settings = Settings()
