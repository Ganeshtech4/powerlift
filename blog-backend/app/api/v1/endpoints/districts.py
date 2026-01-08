"""
District CRUD endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from app.db.districts_db import get_district_table
from app.schemas.district import DistrictCreate, DistrictUpdate, DistrictResponse, DistrictEnquiry
from app.services.district_service import district_service
from app.core.security import verify_token
from fastapi_mail import FastMail, MessageSchema, MessageType
from app.api.v1.endpoints.email_handler import conf
from app.core.config import settings

router = APIRouter()


@router.post("/", response_model=DistrictResponse, status_code=status.HTTP_201_CREATED)
def create_district(
    district: DistrictCreate,
    table = Depends(get_district_table),
    current_user: str = Depends(verify_token)
):
    """Create a new district (Admin only)"""
    new_district = district_service.create_district(table, district)
    return new_district


@router.get("/", response_model=List[DistrictResponse])
def get_districts(table = Depends(get_district_table)):
    """Get all districts"""
    districts = district_service.get_all_districts(table)
    return districts


@router.get("/{district_id}", response_model=DistrictResponse)
def get_district(district_id: str, table = Depends(get_district_table)):
    """Get district by ID"""
    district = district_service.get_district_by_id(table, district_id)
    if not district:
        raise HTTPException(status_code=404, detail="District not found")
    return district


@router.put("/{district_id}", response_model=DistrictResponse)
def update_district(
    district_id: str,
    district_update: DistrictUpdate,
    table = Depends(get_district_table),
    current_user: str = Depends(verify_token)
):
    """Update district (Admin only)"""
    district = district_service.update_district(table, district_id, district_update)
    if not district:
        raise HTTPException(status_code=404, detail="District not found")
    return district


@router.delete("/{district_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_district(
    district_id: str,
    table = Depends(get_district_table),
    current_user: str = Depends(verify_token)
):
    """Delete district (Admin only)"""
    success = district_service.delete_district(table, district_id)
    if not success:
        raise HTTPException(status_code=404, detail="District not found")
    return None


@router.post("/enquiry")
async def send_district_enquiry(enquiry: DistrictEnquiry):
    """Send district enquiry email"""
    try:
        html = f"""
        <h2>District Enquiry - {enquiry.district_name}</h2>
        <p><strong>District:</strong> {enquiry.district_name}</p>
        <p><strong>Name:</strong> {enquiry.name}</p>
        <p><strong>Email:</strong> {enquiry.email}</p>
        <p><strong>Phone:</strong> {enquiry.phone}</p>
        <p><strong>Message:</strong></p>
        <p>{enquiry.message}</p>
        <hr>
        <p><em>This enquiry was sent from the WPC Telangana Districts page.</em></p>
        """

        message = MessageSchema(
            subject=f"District Enquiry - {enquiry.district_name}",
            recipients=[settings.MAIL_TO],
            body=html,
            subtype=MessageType.html
        )

        fm = FastMail(conf)
        await fm.send_message(message)
        
        return {
            "success": True, 
            "message": "Enquiry sent successfully"
        }
    except Exception as e:
        print(f"Error sending enquiry: {e}")
        raise HTTPException(status_code=500, detail="Failed to send enquiry")
