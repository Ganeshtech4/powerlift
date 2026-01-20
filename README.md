# WPC Telangana - Powerlifting Association Website

Official website for World Powerlifting Congress (WPC) Telangana chapter.

## 🚀 Quick Start

### Prerequisites
- Node.js 22.x
- Python 3.10+
- AWS Account (for DynamoDB & S3)

### Installation

1. **Clone and Install Dependencies**
```bash
npm install
cd blog-backend
py -m venv venv
.\venv\Scripts\python.exe -m pip install -r requirements.txt
cd ..
```

2. **Configure Environment**

Edit `.env` in the root directory:
```env
PORT=3000
REACT_APP_API_URL=http://localhost:8000
```

Edit `blog-backend/.env`:
```env
# AWS Configuration - REPLACE WITH YOUR VALUES
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_REGION=ap-south-2
AWS_BLOG_BUCKET=your-bucket-name

# Database Tables
DYNAMODB_BLOGS_TABLE=rekha_powerlifting_blogs
DYNAMODB_DISTRICTS_TABLE=rekha_telangana_districts
DYNAMODB_RESULTS_TABLE=rekha_results
DYNAMODB_EVENTS_TABLE=rekha_events

# Admin Credentials
ADMIN_USERNAME=rekhawpc
ADMIN_PASSWORD=Rekhawpc@2023

# Keep other settings as-is
```

3. **Run the Application**

**Option 1 - Using PowerShell Script:**
```powershell
.\start.ps1
```

**Option 2 - Manual Start:**

Terminal 1 (Backend):
```bash
cd blog-backend
.\venv\Scripts\python.exe -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Terminal 2 (Frontend):
```bash
npm start
```

## 📱 Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs
- **Admin Panel:** http://localhost:3000/admin
  - Username: `rekhawpc`
  - Password: `Rekhawpc@2023`

## 🏗️ Project Structure

```
├── src/                    # React frontend source
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   │   ├── home/          # Homepage
│   │   ├── about/         # About page
│   │   ├── team/          # Team members
│   │   ├── Districts/     # Districts management
│   │   ├── Results/       # Competition results
│   │   ├── Calendar/      # Events calendar
│   │   ├── blog/          # Gallery blog
│   │   ├── admin/         # Admin dashboard
│   │   └── ...
│   └── utils/             # Utility functions
├── blog-backend/          # FastAPI backend
│   ├── app/
│   │   ├── api/v1/       # API endpoints
│   │   ├── core/         # Configuration
│   │   ├── db/           # Database modules
│   │   ├── models/       # Data models
│   │   ├── schemas/      # Pydantic schemas
│   │   └── services/     # Business logic
│   └── main.py           # Application entry
└── public/               # Static assets
```

## 🎯 Features

✅ **Districts Management** - 33 Telangana districts
✅ **Gallery with Categories** - District, State, National, International
✅ **Results Management** - Competition results & ID cards  
✅ **Events Calendar** - Upcoming and past events
✅ **Admin Dashboard** - Complete content management
✅ **Responsive Design** - Mobile-friendly interface
✅ **AWS Integration** - DynamoDB & S3 storage

## 🛠️ Tech Stack

### Frontend
- React 18.3
- React Router 6.26
- Bootstrap 5.3
- Axios for API calls
- AWS SDK for S3

### Backend
- FastAPI 0.109
- Python 3.10
- AWS DynamoDB
- AWS S3
- Pydantic for validation

## 📝 Development

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```

## ⚠️ Important Notes

1. **AWS Credentials Required** - Update AWS credentials in `blog-backend/.env`
2. **DynamoDB Tables** - Ensure tables exist in your AWS account
3. **S3 Bucket** - Create S3 bucket for image storage
4. **Admin Access** - Change default admin password in production

## 🔐 Security

- Admin authentication with JWT tokens
- Environment variables for sensitive data
- CORS configured for allowed origins
- AWS IAM for resource access

## 📧 Support

For issues or questions, contact: powerliftingassociationofts@gmail.com

---

**WPC Telangana** - Empowering Powerlifters Across Telangana
