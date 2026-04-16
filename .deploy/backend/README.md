# Telangana Powerlifting Blog Backend

FastAPI-based blog management system with AWS S3 integration.

## Features

- ✅ **Blog CRUD Operations** - Create, read, update, delete blogs
- ✅ **S3 Folder Structure** - Automatic folder creation per blog
- ✅ **Image Management** - Upload, list, delete images
- ✅ **Thumbnail Generation** - Automatic thumbnail creation
- ✅ **Authentication** - JWT-based admin authentication
- ✅ **Database** - AWS DynamoDB (NoSQL)
- ✅ **Image Processing** - Pillow for resize and optimization
- ✅ **Email Service** - Contact form with free SMTP relay
- ✅ **Max 500 images per blog** - Configurable limit

## Project Structure

```
blog-backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/
│   │       │   ├── auth.py       # Authentication
│   │       │   ├── blogs.py      # Blog CRUD
│   │       │   └── images.py     # Image upload
│   │       └── api.py
│   ├── core/
│   │   ├── config.py             # Settings
│   │   └── security.py           # JWT & auth
│   ├── db/
│   │   ├── database.py           # DB connection
│   │   └── base.py
│   ├── models/
│   │   └── blog.py               # SQLAlchemy models
│   ├── schemas/
│   │   └── blog.py               # Pydantic schemas
│   └── services/
│       ├── blog_service.py       # Business logic
│       └── s3_service.py         # S3 operations
├── main.py                       # FastAPI app
├── requirements.txt
├── .env.example
└── README.md
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd blog-backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

### 2. Configure Environment

Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Database (AWS DynamoDB)
DYNAMODB_BLOGS_TABLE=rekha_powerlifting_blogs

# AWS S3
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=ap-south-2
AWS_BLOG_BUCKET=your-blog-bucket

# Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_password
SECRET_KEY=your-secret-key-for-jwt

# Email (Free SMTP - no credentials needed)
MAIL_TO=powerliftingassociationofts@gmail.com
```

### 3. Setup Database

```bash
# DynamoDB table will be created automatically on first run
# Table name: rekha_powerlifting_blogs
# Region: configured in AWS_REGION from .env

# Make sure AWS credentials are configured in .env:
# AWS_ACCESS_KEY_ID
# AWS_SECRET_ACCESS_KEY
# AWS_REGION
```

### 4. Run Server

```bash
python main.py
```

Server runs on: `http://localhost:8000`

API Docs: `http://localhost:8000/docs`

## API Endpoints

### Authentication

```
POST /api/v1/auth/login
Body: {"username": "admin", "password": "password"}
Response: {"access_token": "...", "token_type": "bearer"}
```

### Blogs

```
POST   /api/v1/blogs/              # Create blog (requires auth)
GET    /api/v1/blogs/              # List all blogs
GET    /api/v1/blogs/{id}          # Get blog by ID
GET    /api/v1/blogs/slug/{slug}   # Get blog by slug
PUT    /api/v1/blogs/{id}          # Update blog (requires auth)
DELETE /api/v1/blogs/{id}          # Delete blog + folder (requires auth)
```

### Images

```
POST   /api/v1/images/{blog_id}/upload       # Upload image (requires auth)
GET    /api/v1/images/{blog_id}/list         # List all images
DELETE /api/v1/images/{blog_id}/images/{filename}  # Delete image (requires auth)
```

### Email / Contact Form

```
POST   /api/v1/email/send-email   # Send contact form email
Body: {
  "name": "John Doe",
  "email": "user@example.com",
  "phone": "+91 9876543210",
  "address": "Hyderabad, India",
  "message": "I'm interested in..."
}
Response: {"success": true, "message": "Email sent successfully"}

# Emails are sent to: powerliftingassociationofts@gmail.com
# Uses free SMTP relay (Sendinblue) - no credentials required
```

## S3 Bucket Structure

```
your-blog-bucket/
├── blogs/
│   ├── my-first-blog/
│   │   ├── thumbnail.jpg
│   │   ├── uuid-1.jpg
│   │   ├── uuid-2.jpg
│   │   └── ...
│   ├── another-blog-post/
│   │   ├── thumbnail.jpg
│   │   └── images...
```

## Usage Example

### 1. Login

```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your_password"}'
```

### 2. Create Blog

```bash
curl -X POST http://localhost:8000/api/v1/blogs/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Blog",
    "content": "Blog content here...",
    "excerpt": "Short description",
    "is_published": true
  }'
```

### 3. Upload Images

```bash
curl -X POST http://localhost:8000/api/v1/images/1/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@image.jpg" \
  -F "is_thumbnail=false"
```

### 4. Get Blog with Images

```bash
# Get blog details
curl http://localhost:8000/api/v1/blogs/1

# Get all images
curl http://localhost:8000/api/v1/images/1/list
```

### 5. Delete Blog (deletes folder too)

```bash
curl -X DELETE http://localhost:8000/api/v1/blogs/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Integration with React Frontend

Use the existing Express server as a proxy, or connect directly:

```javascript
// React API client
const API_BASE = 'http://localhost:8000/api/v1';

// Login
const response = await fetch(`${API_BASE}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
});

// Get blogs
const blogs = await fetch(`${API_BASE}/blogs/`);

// Upload image
const formData = new FormData();
formData.append('file', imageFile);
formData.append('is_thumbnail', 'false');

await fetch(`${API_BASE}/images/${blogId}/upload`, {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});
```

## Production Deployment

1. **Set environment variables** on your server
2. **Use production database** (not SQLite)
3. **Enable HTTPS**
4. **Use Gunicorn/Uvicorn** with multiple workers
5. **Set S3 bucket to private** and use presigned URLs if needed

```bash
# Production run
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## Notes

- **Max 500 images per blog** (configurable in settings)
- **Auto thumbnail generation** (400x300px)
- **Images automatically deleted** when blog is deleted
- **Unique slugs** generated from titles
- **JWT tokens expire** after 30 minutes (configurable)
