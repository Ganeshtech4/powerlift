# WPC Telangana - Technical Documentation

**Version:** 1.0  
**Last Updated:** July 2026  
**Prepared for:** Client Technical Team Onboarding

---

## Table of Contents
1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Diagram](#architecture-diagram)
4. [Frontend Architecture](#frontend-architecture)
5. [Backend Architecture](#backend-architecture)
6. [Database Structure](#database-structure)
7. [Storage & Media Management](#storage--media-management)
8. [API Flow & Authentication](#api-flow--authentication)
9. [Deployment Architecture](#deployment-architecture)
10. [Environment Configuration](#environment-configuration)
11. [Key Integration Points](#key-integration-points)

---

## System Overview

WPC Telangana is a full-stack web application for managing a powerlifting federation. The system handles:
- Public-facing website with news, events, results, and resources
- Admin dashboard for content management
- Gallery and blog management
- User registration and referee management
- Interactive book readers (VTD & Inkspire)
- Championship results and calendars
- Partnership and collaboration tracking

**Live URL:** [Your production URL]  
**Admin Panel:** `/admin/dashboard`

---

## Technology Stack

### Frontend
| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | React.js | 18.x |
| **Routing** | React Router DOM | 6.x |
| **HTTP Client** | Axios | Latest |
| **PDF Viewer** | react-pdf | Latest |
| **Build Tool** | Create React App | Latest |
| **Styling** | Custom CSS (eventflow.css) | - |
| **Icons** | Font Awesome 5 | 5.x |

### Backend
| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | FastAPI | Latest |
| **Language** | Python | 3.9+ |
| **ASGI Server** | Uvicorn | Latest |
| **Validation** | Pydantic | Latest |
| **Authentication** | JWT (python-jose) | Latest |

### Database & Storage
| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Primary Database** | AWS DynamoDB | NoSQL document storage |
| **Media Storage** | AWS S3 | Images, PDFs, documents |
| **Billing Mode** | Pay Per Request | DynamoDB auto-scaling |

### DevOps & Deployment
| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Process Manager** | PM2 | Backend process management |
| **Web Server** | Nginx (recommended) | Reverse proxy & static files |
| **Environment** | Python venv | Backend isolation |

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                        │
│                    (React SPA - Port 3000)                   │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ HTTP/HTTPS
                             │
                ┌────────────▼─────────────┐
                │   NGINX (Optional)       │
                │   Reverse Proxy          │
                └────────────┬─────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐   ┌────────────────┐   ┌──────────────┐
│  React Static │   │   FastAPI      │   │   AWS S3     │
│    Assets     │   │   Backend      │   │   Storage    │
│  (Build dir)  │   │  Port 8000     │   │  (Public)    │
└───────────────┘   └────────┬───────┘   └──────────────┘
                             │
                             │ Boto3 SDK
                             │
                    ┌────────▼──────────┐
                    │   AWS DynamoDB    │
                    │  (NoSQL Tables)   │
                    └───────────────────┘
                    │
                    ├─ rekha_blogs
                    ├─ rekha_committee_members
                    ├─ rekha_referees
                    ├─ rekha_results
                    ├─ rekha_partnerships
                    ├─ rekha_vtd_books
                    ├─ rekha_inkspire_books
                    ├─ rekha_enquiries
                    ├─ rekha_forms
                    └─ rekha_news
```

---

## Frontend Architecture

### Directory Structure
```
src/
├── assets/
│   ├── css/
│   │   └── eventflow.css          # Main stylesheet (13000+ lines)
│   ├── images/                    # Static images
│   └── vendors/                   # Third-party CSS/JS
├── components/
│   ├── Layout/
│   │   ├── Header/
│   │   │   ├── Header.js
│   │   │   ├── MenuItems.js       # Navigation menu
│   │   │   └── MobileMenu.js      # Mobile hamburger menu
│   │   └── Footer/
│   ├── Common/
│   │   ├── BackToTop.js
│   │   └── WhatsAppFloat.js       # Floating WhatsApp button
│   └── Admin/                     # Admin dashboard components
├── pages/
│   ├── home/                      # Homepage
│   ├── about/                     # About & team pages
│   ├── gallery/                   # Photo gallery
│   ├── blog/                      # Blog (gallery-blog)
│   ├── news/                      # News & media (NEW)
│   ├── Results/                   # Championship results
│   ├── Districts/                 # District information
│   ├── referees/                  # Referee management
│   ├── inspire/                   # Inkspire books
│   ├── vtd/                       # VTD books
│   ├── contact/                   # Contact form
│   ├── registration/              # Registration forms
│   └── admin/
│       ├── AdminLogin.js
│       ├── AdminDashboard.js
│       └── sections/              # Admin manager components
│           ├── BlogManager.js
│           ├── TeamManager.js
│           ├── RefereesManager.js
│           ├── ResultsManager.js
│           ├── PartnershipsManager.js
│           ├── VtdBooksManager.js
│           ├── InkspireBooksManager.js
│           ├── FormsManager.js
│           └── NewsManager.js     # News management (NEW)
├── config/
│   ├── axiosConfig.js             # HTTP client configuration
│   └── emailConfig.js             # Email service config
└── utils/
    ├── s3Upload.js                # S3 upload utilities
    ├── teamApi.js
    ├── refereeApi.js
    └── vtdApi.js
```

### Key Frontend Patterns

#### 1. Routing (`App.js`)
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Public routes
<Route path="/" element={<Home />} />
<Route path="/gallery" element={<Gallery />} />
<Route path="/news" element={<NewsPage />} />

// Admin routes (protected)
<Route path="/admin" element={<AdminLogin />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />
```

#### 2. API Client Configuration (`config/axiosConfig.js`)
```javascript
const API_URL = process.env.REACT_APP_API_URL || '/api/v1';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Auto-inject JWT token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

#### 3. Admin Dashboard Pattern
- URL-based section routing: `/admin/dashboard?section=news`
- Single `AdminDashboard.js` with `renderContent()` switch
- Modular manager components in `sections/`
- Shared stats grid, filter tabs, search, CRUD actions

#### 4. Image Loading Strategy
```javascript
// S3 images loaded directly via URL
<img src={item.image_url} alt={item.title} />

// Local assets via imports
import logo from '../../assets/images/logo.png';

// CSS backgrounds (relative paths from CSS file)
background: url('../../assets/images/powerlift-panel.png');
```

---

## Backend Architecture

### Directory Structure
```
blog-backend/
├── main.py                        # Application entry point
├── requirements.txt               # Python dependencies
├── Procfile                       # Deployment config
├── app/
│   ├── __init__.py
│   ├── core/
│   │   ├── config.py              # Environment & settings
│   │   └── security.py            # JWT auth utilities
│   ├── api/
│   │   └── v1/
│   │       ├── api.py             # Main router aggregator
│   │       └── endpoints/
│   │           ├── auth.py        # Admin login
│   │           ├── blog.py        # Blog posts
│   │           ├── committee.py   # Team members
│   │           ├── referees.py
│   │           ├── results.py
│   │           ├── partnerships.py
│   │           ├── vtd.py
│   │           ├── inkspire.py
│   │           ├── enquiries.py
│   │           ├── forms.py
│   │           ├── s3.py          # S3 upload endpoint
│   │           └── news.py        # News & media (NEW)
│   ├── db/
│   │   ├── base.py                # DynamoDB client
│   │   ├── blog_db.py
│   │   ├── committee_db.py
│   │   ├── referees_db.py
│   │   ├── results_db.py
│   │   ├── partnerships_db.py
│   │   ├── vtd_db.py
│   │   ├── inkspire_db.py
│   │   ├── enquiries_db.py
│   │   ├── forms_db.py
│   │   └── news_db.py             # News table (NEW)
│   ├── models/                    # (Currently minimal, Pydantic used)
│   ├── schemas/
│   │   ├── blog.py                # Request/response models
│   │   ├── committee.py
│   │   ├── referees.py
│   │   ├── results.py
│   │   ├── partnerships.py
│   │   ├── vtd.py
│   │   ├── inkspire.py
│   │   ├── forms.py
│   │   └── news.py                # News schemas (NEW)
│   └── services/
│       ├── blog_service.py        # Business logic
│       ├── committee_service.py
│       ├── referees_service.py
│       ├── results_service.py
│       ├── partnerships_service.py
│       ├── vtd_service.py
│       ├── inkspire_service.py
│       ├── forms_service.py
│       └── news_service.py        # News CRUD (NEW)
└── scripts/
    ├── init_districts.py
    ├── create_enquiries_table.py
    ├── create_forms_table.py
    └── bulk_upload_gallery.py
```

### FastAPI Application Flow

#### 1. Entry Point (`main.py`)
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.api import api_router

app = FastAPI(title="WPC Telangana API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API router
app.include_router(api_router, prefix="/api/v1")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

#### 2. Router Aggregation (`api/v1/api.py`)
```python
from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, blog, committee, referees, results,
    partnerships, vtd, inkspire, enquiries, forms, s3, news
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(blog.router, prefix="/blog", tags=["Blog"])
api_router.include_router(committee.router, prefix="/committee", tags=["Committee"])
api_router.include_router(news.router, prefix="/news", tags=["News"])
# ... etc
```

#### 3. Layered Architecture Pattern

**Example: News Module**

**Schema Layer** (`schemas/news.py`):
```python
from pydantic import BaseModel
from typing import Optional

class NewsBase(BaseModel):
    title: str
    description: Optional[str] = None
    image_url: str
    category: str = "General"
    published_date: str
    is_featured: bool = False
    status: str = "published"

class NewsCreate(NewsBase):
    pass

class NewsResponse(NewsBase):
    id: str
    slug: str
    created_at: str
    updated_at: str
```

**Database Layer** (`db/news_db.py`):
```python
import boto3
from app.core.config import settings

dynamodb = boto3.resource('dynamodb', region_name=settings.AWS_REGION)

def get_news_table():
    table_name = settings.DYNAMODB_NEWS_TABLE
    table = dynamodb.Table(table_name)
    # Auto-create if not exists
    return table
```

**Service Layer** (`services/news_service.py`):
```python
import uuid
from datetime import datetime

class NewsService:
    def __init__(self):
        self.table = get_news_table()
    
    def create_news(self, news_data: dict):
        news_id = str(uuid.uuid4())
        item = {
            'id': news_id,
            'slug': self._slugify(news_data['title']),
            'created_at': datetime.utcnow().isoformat(),
            **news_data
        }
        self.table.put_item(Item=item)
        return item
    
    def get_all_news(self):
        response = self.table.scan()
        return sorted(response['Items'], key=lambda x: x['published_date'], reverse=True)
```

**API Endpoint Layer** (`api/v1/endpoints/news.py`):
```python
from fastapi import APIRouter, Depends
from app.core.security import verify_token
from app.schemas.news import NewsCreate, NewsResponse
from app.services.news_service import news_service

router = APIRouter()

@router.get("/", response_model=List[NewsResponse])
async def list_news(published_only: bool = False):
    """Public endpoint - get all news"""
    return news_service.get_all_news()

@router.post("/", response_model=NewsResponse)
async def create_news(news: NewsCreate, current_user: dict = Depends(verify_token)):
    """Admin only - create news"""
    return news_service.create_news(news.dict())
```

---

## Database Structure

### DynamoDB Tables

All tables use **Pay-Per-Request** billing mode (no capacity planning needed).

#### Table: `rekha_blogs`
| Attribute | Type | Description |
|-----------|------|-------------|
| `id` (PK) | String | UUID v4 |
| `title` | String | Blog post title |
| `slug` | String | URL-friendly slug |
| `description` | String | HTML content |
| `image` | String | S3 URL |
| `date` | String | ISO 8601 date |
| `author` | String | Author name |
| `tags` | List | Array of tags |
| `created_at` | String | Timestamp |

#### Table: `rekha_committee_members`
| Attribute | Type | Description |
|-----------|------|-------------|
| `id` (PK) | String | UUID v4 |
| `name` | String | Full name |
| `designation` | String | Role/position |
| `bio` | String | Biography |
| `image_url` | String | S3 profile image |
| `email` | String | Contact email |
| `phone` | String | Contact phone |
| `social_media` | Map | FB, Instagram, LinkedIn links |
| `order` | Number | Display order |
| `created_at` | String | Timestamp |

#### Table: `rekha_referees`
| Attribute | Type | Description |
|-----------|------|-------------|
| `id` (PK) | String | UUID v4 |
| `name` | String | Full name |
| `category` | String | IWF/National/State |
| `level` | String | Certification level |
| `image_url` | String | S3 photo |
| `phone` | String | Contact |
| `email` | String | Email |
| `district` | String | District name |
| `certificate_url` | String | S3 certificate PDF |
| `status` | String | Active/Inactive |
| `created_at` | String | Timestamp |

#### Table: `rekha_results`
| Attribute | Type | Description |
|-----------|------|-------------|
| `id` (PK) | String | UUID v4 |
| `title` | String | Event name |
| `event_date` | String | Date of event |
| `location` | String | Venue |
| `category` | String | State/National/International |
| `result_pdf_url` | String | S3 PDF URL |
| `image_url` | String | Event photo |
| `description` | String | Event summary |
| `created_at` | String | Timestamp |

#### Table: `rekha_partnerships`
| Attribute | Type | Description |
|-----------|------|-------------|
| `id` (PK) | String | UUID v4 |
| `title` | String | Partnership name |
| `description` | String | Details |
| `partner_name` | String | Organization name |
| `logo_url` | String | S3 logo |
| `type` | String | Sponsor/Venue/Equipment/Other |
| `status` | String | Active/Inactive |
| `start_date` | String | Partnership start |
| `end_date` | String | Partnership end (optional) |
| `contact_person` | String | Contact name |
| `created_at` | String | Timestamp |

#### Table: `rekha_vtd_books`
| Attribute | Type | Description |
|-----------|------|-------------|
| `id` (PK) | String | UUID v4 |
| `title` | String | Book title |
| `description` | String | Book description |
| `pdf_url` | String | S3 PDF file |
| `thumbnail_url` | String | Cover image |
| `order` | Number | Display order |
| `created_at` | String | Timestamp |

#### Table: `rekha_inkspire_books`
| Attribute | Type | Description |
|-----------|------|-------------|
| `id` (PK) | String | UUID v4 |
| `title` | String | Book title |
| `description` | String | Book description |
| `pdf_url` | String | S3 PDF file |
| `thumbnail_url` | String | Cover image |
| `order` | Number | Display order |
| `created_at` | String | Timestamp |

#### Table: `rekha_enquiries`
| Attribute | Type | Description |
|-----------|------|-------------|
| `id` (PK) | String | UUID v4 |
| `name` | String | Contact name |
| `email` | String | Email address |
| `phone` | String | Phone number |
| `subject` | String | Inquiry subject |
| `message` | String | Message content |
| `status` | String | New/Read/Responded |
| `created_at` | String | Submission timestamp |

#### Table: `rekha_forms`
| Attribute | Type | Description |
|-----------|------|-------------|
| `id` (PK) | String | UUID v4 |
| `name` | String | Applicant name |
| `email` | String | Email |
| `phone` | String | Phone |
| `form_type` | String | Registration/Membership/etc |
| `form_data` | Map | JSON form fields |
| `status` | String | Pending/Approved/Rejected |
| `created_at` | String | Submission timestamp |

#### Table: `rekha_news` (NEW)
| Attribute | Type | Description |
|-----------|------|-------------|
| `id` (PK) | String | UUID v4 |
| `title` | String | News headline |
| `slug` | String | URL slug |
| `description` | String | Brief summary |
| `image_url` | String | S3 full image |
| `thumbnail_url` | String | S3 thumbnail |
| `category` | String | Newspaper/Championship/etc |
| `published_date` | String | Publication date |
| `is_featured` | Boolean | Featured flag |
| `status` | String | published/draft |
| `created_at` | String | Created timestamp |
| `updated_at` | String | Last modified |

### DynamoDB Access Pattern

#### Connection Setup (`db/base.py`)
```python
import boto3
from app.core.config import settings

# Initialize DynamoDB resource
dynamodb = boto3.resource(
    'dynamodb',
    region_name=settings.AWS_REGION,
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
)
```

#### Query Patterns
```python
# Scan (get all items)
response = table.scan()
items = response['Items']

# Get item by ID
response = table.get_item(Key={'id': item_id})
item = response.get('Item')

# Put item (create/update)
table.put_item(Item={
    'id': str(uuid.uuid4()),
    'title': 'Sample',
    'created_at': datetime.utcnow().isoformat()
})

# Delete item
table.delete_item(Key={'id': item_id})

# Update item
table.update_item(
    Key={'id': item_id},
    UpdateExpression='SET title = :title, updated_at = :updated',
    ExpressionAttributeValues={
        ':title': new_title,
        ':updated': datetime.utcnow().isoformat()
    }
)
```

**Note:** DynamoDB is schemaless. Tables are auto-created by backend services if they don't exist. No migrations needed.

---

## Storage & Media Management

### AWS S3 Configuration

**Bucket Structure:**
```
wpc-telangana-assets/
├── blog/                  # Blog post images
├── committee/             # Team member photos
├── referees/              # Referee photos & certificates
├── results/               # Event photos & result PDFs
├── partnerships/          # Partner logos
├── vtd/                   # VTD book PDFs
├── inkspire/              # Inkspire book PDFs
├── gallery/               # Gallery photos
└── news/                  # News newspaper images (NEW)
```

### Upload Flow

#### Backend S3 Endpoint (`api/v1/endpoints/s3.py`)
```python
from fastapi import APIRouter, UploadFile, File
import boto3

router = APIRouter()
s3_client = boto3.client('s3', region_name=settings.AWS_REGION)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...), folder: str = "blog"):
    # Generate unique filename
    timestamp = datetime.utcnow().strftime('%Y%m%d_%H%M%S')
    filename = f"{folder}/{timestamp}_{file.filename}"
    
    # Upload to S3
    s3_client.upload_fileobj(
        file.file,
        settings.S3_BUCKET_NAME,
        filename,
        ExtraArgs={'ContentType': file.content_type, 'ACL': 'public-read'}
    )
    
    # Return public URL
    url = f"https://{settings.S3_BUCKET_NAME}.s3.amazonaws.com/{filename}"
    return {"url": url, "file_url": url}
```

#### Frontend Upload Usage
```javascript
// Admin components (NewsManager, BlogManager, etc.)
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', 'news');
  
  const res = await axiosInstance.post('/s3/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  
  return res.data.url; // Public S3 URL
};
```

### S3 Security Configuration

**Bucket Policy (Public Read Access):**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::wpc-telangana-assets/*"
    }
  ]
}
```

**CORS Configuration:**
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

---

## API Flow & Authentication

### Authentication Flow

```
┌─────────────┐
│ Admin Login │
│   /admin    │
└──────┬──────┘
       │
       │ POST /api/v1/auth/login
       │ { username, password }
       ▼
┌──────────────────┐
│  FastAPI Backend │
│   auth.py        │
└──────┬───────────┘
       │
       │ Verify credentials
       │ (hardcoded in config)
       ▼
┌──────────────────┐
│  Generate JWT    │
│  (30 day expiry) │
└──────┬───────────┘
       │
       │ Return token
       ▼
┌──────────────────────┐
│   Store in           │
│   localStorage:      │
│   - adminToken       │
│   - isAdminLoggedIn  │
└──────┬───────────────┘
       │
       │ All subsequent API calls
       │ include header:
       │ Authorization: Bearer <token>
       ▼
┌──────────────────────┐
│  Axios Interceptor   │
│  (axiosConfig.js)    │
│  Auto-injects token  │
└──────────────────────┘
```

### Admin Credentials Configuration

**Backend** (`app/core/config.py`):
```python
class Settings(BaseSettings):
    # Admin credentials (change in production!)
    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str = "your_secure_password"
    
    # JWT
    SECRET_KEY: str = "your-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 43200  # 30 days
```

### Protected Endpoint Pattern

```python
from fastapi import Depends
from app.core.security import verify_token

@router.post("/news/", response_model=NewsResponse)
async def create_news(
    news: NewsCreate,
    current_user: dict = Depends(verify_token)  # Requires valid JWT
):
    return news_service.create_news(news.dict())
```

### Public vs Protected Endpoints

| Endpoint | Method | Auth Required | Purpose |
|----------|--------|---------------|---------|
| `/api/v1/auth/login` | POST | No | Admin login |
| `/api/v1/blog/` | GET | No | Public blog list |
| `/api/v1/blog/` | POST | Yes | Create blog post |
| `/api/v1/news/` | GET | No | Public news list |
| `/api/v1/news/` | POST | Yes | Create news |
| `/api/v1/committee/` | GET | No | Public team list |
| `/api/v1/committee/` | POST | Yes | Add team member |
| `/api/v1/s3/upload` | POST | Yes | Upload media |
| `/api/v1/enquiries/` | POST | No | Submit contact form |
| `/api/v1/enquiries/` | GET | Yes | View submissions |

---

## Deployment Architecture

### Production Deployment Stack

```
┌────────────────────────────────────────────┐
│          Domain (example.com)              │
└──────────────┬─────────────────────────────┘
               │
               ▼
┌────────────────────────────────────────────┐
│  NGINX (Port 80/443)                       │
│  - SSL Termination                         │
│  - Static file serving (React build)       │
│  - Reverse proxy to backend                │
└──────────────┬─────────────────────────────┘
               │
        ┌──────┴──────┐
        │             │
        ▼             ▼
┌───────────┐   ┌──────────────┐
│  Static   │   │   Backend    │
│  React    │   │   FastAPI    │
│  Build    │   │   :8000      │
│  /build/  │   │              │
└───────────┘   └──────┬───────┘
                       │
                ┌──────┴──────┐
                │   PM2       │
                │  (Process   │
                │   Manager)  │
                └─────────────┘
```

### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # React static files
    location / {
        root /path/to/Powerlift/build;
        try_files $uri $uri/ /index.html;
    }
    
    # Backend API proxy
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### PM2 Process Configuration

**File:** `ecosystem.config.js`
```javascript
module.exports = {
  apps: [{
    name: 'wpc-backend',
    script: 'blog-backend/main.py',
    interpreter: 'blog-backend/.venv/bin/python',
    cwd: '/path/to/Powerlift',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      PORT: 8000,
      NODE_ENV: 'production'
    }
  }]
};
```

### Startup Commands

**Backend:**
```bash
cd blog-backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000

# Or with PM2:
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

**Frontend:**
```bash
npm install
npm run build
# Serve build/ folder via nginx or static server
```

---

## Environment Configuration

### Backend Environment Variables

**File:** `blog-backend/.env` (or OS environment)
```bash
# AWS Configuration
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY
S3_BUCKET_NAME=wpc-telangana-assets

# DynamoDB Tables
DYNAMODB_BLOG_TABLE=rekha_blogs
DYNAMODB_COMMITTEE_TABLE=rekha_committee_members
DYNAMODB_REFEREES_TABLE=rekha_referees
DYNAMODB_RESULTS_TABLE=rekha_results
DYNAMODB_PARTNERSHIPS_TABLE=rekha_partnerships
DYNAMODB_VTD_BOOKS_TABLE=rekha_vtd_books
DYNAMODB_INKSPIRE_BOOKS_TABLE=rekha_inkspire_books
DYNAMODB_ENQUIRIES_TABLE=rekha_enquiries
DYNAMODB_FORMS_TABLE=rekha_forms
DYNAMODB_NEWS_TABLE=rekha_news

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here

# JWT Configuration
SECRET_KEY=your-jwt-secret-key-min-32-characters
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=43200

# API Configuration
API_V1_PREFIX=/api/v1
CORS_ORIGINS=["http://localhost:3000","https://your-domain.com"]
```

### Frontend Environment Variables

**File:** `.env` (root of React project)
```bash
# API Backend URL
REACT_APP_API_URL=http://localhost:8000/api/v1

# Production:
# REACT_APP_API_URL=https://your-domain.com/api/v1

# Public URL (for asset paths)
PUBLIC_URL=/
```

### Configuration Loading

**Backend** (`app/core/config.py`):
```python
from pydantic import BaseSettings

class Settings(BaseSettings):
    AWS_REGION: str
    AWS_ACCESS_KEY_ID: str
    AWS_SECRET_ACCESS_KEY: str
    S3_BUCKET_NAME: str
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
```

**Frontend:**
```javascript
// Accessed via process.env
const apiUrl = process.env.REACT_APP_API_URL;
const publicUrl = process.env.PUBLIC_URL;
```

---

## Key Integration Points

### 1. Frontend ↔ Backend Communication

**Pattern:**
```javascript
// All API calls use axiosInstance
import { axiosInstance } from '../config/axiosConfig';

// GET request
const news = await axiosInstance.get('/news/');

// POST with auth (token auto-injected)
const newItem = await axiosInstance.post('/news/', {
  title: 'Breaking News',
  image_url: 'https://...',
  // ...
});
```

### 2. Image Upload Flow

```
User selects file
      ↓
FormData created
      ↓
POST /api/v1/s3/upload
      ↓
Backend uploads to S3
      ↓
Return public URL
      ↓
Frontend stores URL in form
      ↓
Submit form with URL to create endpoint
      ↓
URL saved in DynamoDB
```

### 3. Admin Dashboard State Management

```
URL: /admin/dashboard?section=news
      ↓
AdminDashboard.js reads URLSearchParams
      ↓
renderContent() switch on section
      ↓
Render <NewsManager />
      ↓
NewsManager fetches GET /api/v1/news/
      ↓
Display table + CRUD actions
```

### 4. Public Page Data Loading

```javascript
// Example: News page
useEffect(() => {
  const fetchNews = async () => {
    try {
      const res = await axiosInstance.get('/news/?published_only=true');
      setNews(res.data);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    }
  };
  fetchNews();
}, []);
```

---

## Database & API Quick Reference

### Complete Endpoint List

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| **Auth** ||||
| `/api/v1/auth/login` | POST | No | Admin login |
| **Blog** ||||
| `/api/v1/blog/` | GET | No | List blogs |
| `/api/v1/blog/{id}` | GET | No | Get blog by ID |
| `/api/v1/blog/` | POST | Yes | Create blog |
| `/api/v1/blog/{id}` | PUT | Yes | Update blog |
| `/api/v1/blog/{id}` | DELETE | Yes | Delete blog |
| **Committee** ||||
| `/api/v1/committee/` | GET | No | List members |
| `/api/v1/committee/{id}` | GET | No | Get member |
| `/api/v1/committee/` | POST | Yes | Add member |
| `/api/v1/committee/{id}` | PUT | Yes | Update member |
| `/api/v1/committee/{id}` | DELETE | Yes | Delete member |
| **Referees** ||||
| `/api/v1/referees/` | GET | No | List referees |
| `/api/v1/referees/{id}` | GET | No | Get referee |
| `/api/v1/referees/` | POST | Yes | Add referee |
| `/api/v1/referees/{id}` | PUT | Yes | Update referee |
| `/api/v1/referees/{id}` | DELETE | Yes | Delete referee |
| **Results** ||||
| `/api/v1/results/` | GET | No | List results |
| `/api/v1/results/{id}` | GET | No | Get result |
| `/api/v1/results/` | POST | Yes | Add result |
| `/api/v1/results/{id}` | PUT | Yes | Update result |
| `/api/v1/results/{id}` | DELETE | Yes | Delete result |
| **Partnerships** ||||
| `/api/v1/partnerships/` | GET | No | List partnerships |
| `/api/v1/partnerships/{id}` | GET | No | Get partnership |
| `/api/v1/partnerships/` | POST | Yes | Add partnership |
| `/api/v1/partnerships/{id}` | PUT | Yes | Update partnership |
| `/api/v1/partnerships/{id}` | DELETE | Yes | Delete partnership |
| **VTD Books** ||||
| `/api/v1/vtd/` | GET | No | List VTD books |
| `/api/v1/vtd/{id}` | GET | No | Get book |
| `/api/v1/vtd/` | POST | Yes | Add book |
| `/api/v1/vtd/{id}` | PUT | Yes | Update book |
| `/api/v1/vtd/{id}` | DELETE | Yes | Delete book |
| **Inkspire Books** ||||
| `/api/v1/inkspire/` | GET | No | List Inkspire books |
| `/api/v1/inkspire/{id}` | GET | No | Get book |
| `/api/v1/inkspire/` | POST | Yes | Add book |
| `/api/v1/inkspire/{id}` | PUT | Yes | Update book |
| `/api/v1/inkspire/{id}` | DELETE | Yes | Delete book |
| **Forms & Enquiries** ||||
| `/api/v1/enquiries/` | POST | No | Submit contact form |
| `/api/v1/enquiries/` | GET | Yes | List enquiries |
| `/api/v1/forms/` | POST | No | Submit registration |
| `/api/v1/forms/` | GET | Yes | List form submissions |
| **News & Media** ||||
| `/api/v1/news/` | GET | No | List news (public) |
| `/api/v1/news/{slug}` | GET | No | Get news by slug |
| `/api/v1/news/` | POST | Yes | Create news |
| `/api/v1/news/{id}` | PUT | Yes | Update news |
| `/api/v1/news/{id}` | DELETE | Yes | Delete news |
| **S3 Upload** ||||
| `/api/v1/s3/upload` | POST | Yes | Upload file to S3 |

---

## Development Setup Instructions

### Prerequisites
- **Node.js** 16+ and npm
- **Python** 3.9+
- **AWS Account** with S3 and DynamoDB access
- **Git**

### Quick Start

**1. Clone Repository**
```bash
git clone <repository-url>
cd Powerlift
```

**2. Backend Setup**
```bash
cd blog-backend

# Create virtual environment
python -m venv .venv

# Activate (Windows)
.venv\Scripts\activate

# Activate (Linux/Mac)
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your AWS credentials

# Run backend
uvicorn main:app --reload --port 8000
```

**3. Frontend Setup**
```bash
# In project root
npm install

# Configure environment
cp .env.example .env
# Edit .env with API URL

# Run development server
npm start
```

**4. Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Admin Panel: http://localhost:3000/admin

---

## Security Considerations

### Current Implementation
- JWT tokens with 30-day expiry
- Admin credentials in environment variables
- S3 public read access for media
- CORS enabled for all origins (development)

### Production Recommendations
1. **Change admin credentials** in production `.env`
2. **Update SECRET_KEY** to strong random value (32+ characters)
3. **Configure CORS** to specific domain only
4. **Enable HTTPS** with SSL certificate
5. **Add rate limiting** to API endpoints
6. **Implement logging** and monitoring
7. **Regular token rotation** policy
8. **S3 bucket versioning** for backup
9. **DynamoDB point-in-time recovery**
10. **Regular security audits**

---

## Monitoring & Maintenance

### Log Files
- **Backend logs:** PM2 logs (`pm2 logs wpc-backend`)
- **Frontend build errors:** Browser console
- **Nginx access/error logs:** `/var/log/nginx/`

### Health Checks
```bash
# Backend health
curl http://localhost:8000/docs

# DynamoDB connection
aws dynamodb list-tables --region ap-south-1

# S3 bucket access
aws s3 ls s3://wpc-telangana-assets/
```

### Backup Strategy
- **DynamoDB:** Enable point-in-time recovery (PITR)
- **S3:** Enable versioning and lifecycle policies
- **Code:** Git version control

---

## Support & Contacts

### Development Team
- **Original Developer:** [Your contact]
- **Repository:** [Git URL]

### AWS Resources
- **Region:** ap-south-1 (Mumbai)
- **S3 Bucket:** wpc-telangana-assets
- **DynamoDB Tables:** rekha_* (10 tables)

### Useful Commands
```bash
# Start backend
cd blog-backend && uvicorn main:app --reload

# Build frontend
npm run build

# PM2 management
pm2 start ecosystem.config.js
pm2 stop wpc-backend
pm2 restart wpc-backend
pm2 logs wpc-backend
```

---

**Document Version:** 1.0  
**Last Updated:** July 2026  
**Status:** Production Ready
