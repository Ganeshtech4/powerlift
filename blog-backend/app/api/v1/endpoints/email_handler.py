from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, EmailStr
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from app.core.config import settings

router = APIRouter()

# Email Configuration
conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_FROM_NAME=settings.MAIL_FROM_NAME,
    MAIL_STARTTLS=settings.MAIL_STARTTLS,
    MAIL_SSL_TLS=settings.MAIL_SSL_TLS,
    USE_CREDENTIALS=settings.USE_CREDENTIALS,
    VALIDATE_CERTS=settings.VALIDATE_CERTS
)

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: str
    address: str = ""
    message: str

@router.post("/send-email")
async def send_email(form_data: ContactForm, background_tasks: BackgroundTasks):
    """Send contact form email"""
    try:
        html = f"""
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> {form_data.name}</p>
        <p><strong>Email:</strong> {form_data.email}</p>
        <p><strong>Phone:</strong> {form_data.phone}</p>
        <p><strong>Address:</strong> {form_data.address}</p>
        <p><strong>Message:</strong></p>
        <p>{form_data.message}</p>
        <hr>
        <p><em>This message was sent from the WPC Telangana website contact form.</em></p>
        """

        message = MessageSchema(
            subject="New Contact Form Submission - WPC Telangana",
            recipients=[settings.MAIL_TO],  # Use configured destination email
            body=html,
            subtype=MessageType.html
        )

        fm = FastMail(conf)
        background_tasks.add_task(fm.send_message, message)
        
        return {
            "success": True, 
            "message": "Email sent successfully"
        }
    except Exception as e:
        print(f"Error sending email: {e}")
        raise HTTPException(status_code=500, detail="Failed to send email")
