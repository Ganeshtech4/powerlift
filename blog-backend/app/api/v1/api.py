"""
API Router - combines all endpoint routers
"""
from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, blogs, images, s3_handler, email_handler,
    districts, results, events, committee, referees, partnerships, inkspire, vtd, forms
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(blogs.router, prefix="/blogs", tags=["Blogs"])
api_router.include_router(images.router, prefix="/images", tags=["Images"])
api_router.include_router(s3_handler.router, prefix="/s3", tags=["S3 Generic"])
api_router.include_router(email_handler.router, prefix="", tags=["Email"])
api_router.include_router(districts.router, prefix="/districts", tags=["Districts"])
api_router.include_router(results.router, prefix="/results", tags=["Results"])
api_router.include_router(events.router, prefix="/events", tags=["Events/Calendar"])
api_router.include_router(committee.router, prefix="/committee-members", tags=["Committee Members"])
api_router.include_router(referees.router, prefix="/referees", tags=["Referees"])
api_router.include_router(partnerships.router, prefix="/partnerships", tags=["Partnerships"])
api_router.include_router(inkspire.router, prefix="/inkspire-books", tags=["Inkspire Books"])
api_router.include_router(vtd.router, prefix="/vtd-books", tags=["VTD Books"])
api_router.include_router(forms.router, prefix="/forms", tags=["Registration Forms"])
