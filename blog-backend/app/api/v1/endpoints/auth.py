"""
Authentication endpoints
"""
from fastapi import APIRouter, HTTPException, status
from datetime import timedelta

from app.schemas.blog import LoginRequest, Token
from app.core.config import settings
from app.core.security import create_access_token, get_password_hash, verify_password

router = APIRouter()

# In production, store hashed password in database
ADMIN_PASSWORD_HASH = get_password_hash(settings.ADMIN_PASSWORD)


@router.post("/login", response_model=Token)
async def login(credentials: LoginRequest):
    """Admin login endpoint"""
    if credentials.username != settings.ADMIN_USERNAME:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    if not verify_password(credentials.password, ADMIN_PASSWORD_HASH):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": credentials.username},
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}
