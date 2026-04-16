from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Query, Depends
from typing import List, Optional
from app.services.s3_service import s3_service
from app.core.config import settings

router = APIRouter()

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    folder: str = Form("uploads")
):
    """Upload a single file to S3"""
    try:
        # Create a unique key (simple timestamp prefix like Node.js)
        # Or just use the folder provided
        import time
        timestamp = int(time.time() * 1000)
        filename = f"{timestamp}-{file.filename}"
        key = f"{folder}/{filename}"
        
        # Read file content
        content = await file.read()
        
        result = s3_service.upload_file(content, key, file.content_type)
        return {
            "success": True,
            "url": result["url"],
            "key": result["key"],
            "location": result["url"] # For compatibility
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload-multiple")
async def upload_multiple_files(
    files: List[UploadFile] = File(...),
    folder: str = Form("uploads")
):
    """Upload multiple files to S3"""
    try:
        results = []
        import time
        
        for file in files:
            timestamp = int(time.time() * 1000)
            filename = f"{timestamp}-{file.filename}"
            key = f"{folder}/{filename}"
            content = await file.read()
            
            res = s3_service.upload_file(content, key, file.content_type)
            results.append(res)
            
        return {
            "success": True,
            "message": f"{len(results)} files uploaded successfully",
            "files": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/delete/{key:path}")
async def delete_file(key: str):
    """Delete file from S3"""
    try:
        params = key
        # If key comes URL encoded like "uploads%2Ffile.jpg", FastAPI path helper might decode it,
        # but just to be safe.
        s3_service.delete_file(key)
        return {
            "success": True,
            "message": "File deleted successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/list")
async def list_files(prefix: str = ""):
    """List files in S3"""
    try:
        files = s3_service.list_files(prefix)
        return {
            "success": True,
            "files": files
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/exists/{key:path}")
async def check_file_exists(key: str):
    """Check if file exists"""
    exists = s3_service.file_exists(key)
    return {
        "success": True,
        "exists": exists,
        "key": key
    }

@router.get("/presigned-url/{key:path}")
async def get_presigned_url(
    key: str,
    expiresIn: int = Query(3600, alias="expiresIn")
):
    """Get presigned URL"""
    try:
        url = s3_service.get_presigned_url(key, expiresIn)
        return {
            "success": True,
            "url": url,
            "expiresIn": expiresIn
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/pdfs/{filename}")
async def serve_pdf(filename: str):
    """Serve PDF by redirecting to the regional public S3 URL."""
    try:
        from fastapi.responses import RedirectResponse
        key = f"pdfs/{filename}"
        url = s3_service.get_public_url(key)
        return RedirectResponse(url=url)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
