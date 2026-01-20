# 🚀 Production Deployment Guide

This guide will help you deploy the WPC Telangana website to a production server.

## 📋 Prerequisites

### Server Requirements
- **Ubuntu 20.04/22.04 LTS** (or similar Linux distribution)
- **Minimum 2GB RAM** (4GB recommended)
- **Node.js 22.x**
- **Python 3.10+**
- **Nginx** (for reverse proxy)
- **PM2** (for process management)
- **Domain name** (optional but recommended)
- **SSL Certificate** (Let's Encrypt recommended)

### AWS Services Required
- **S3 Bucket** (for images storage)
- **DynamoDB Tables** (for database)
- **IAM User** with appropriate permissions

---

## 🔧 Step 1: Server Setup

### 1.1 Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Install Node.js 22.x
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Verify installation
```

### 1.3 Install Python 3.10+
```bash
sudo apt install -y python3 python3-pip python3-venv
python3 --version  # Verify installation
```

### 1.4 Install Nginx
```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 1.5 Install PM2
```bash
sudo npm install -g pm2
pm2 startup  # Follow the instructions to enable PM2 on boot
```

---

## 📦 Step 2: Deploy Application

### 2.1 Clone Repository
```bash
cd /var/www
sudo git clone YOUR_REPOSITORY_URL rekhapowerlift
sudo chown -R $USER:$USER rekhapowerlift
cd rekhapowerlift
```

### 2.2 Setup Backend

```bash
cd blog-backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
nano .env
```

**Edit the `.env` file with your production values:**
```env
# AWS Configuration
AWS_ACCESS_KEY_ID=YOUR_PRODUCTION_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_PRODUCTION_SECRET_KEY
AWS_REGION=ap-south-2
AWS_BLOG_BUCKET=your-production-bucket

# DynamoDB Tables
DYNAMODB_BLOGS_TABLE=rekha_powerlifting_blogs
DYNAMODB_DISTRICTS_TABLE=rekha_telangana_districts
DYNAMODB_RESULTS_TABLE=rekha_results
DYNAMODB_EVENTS_TABLE=rekha_events

# Admin Credentials (CHANGE THESE!)
ADMIN_USERNAME=your_secure_username
ADMIN_PASSWORD=your_very_secure_password
SECRET_KEY=generate_a_long_random_string_here

# CORS Origins (Add your domain)
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Other settings
ACCESS_TOKEN_EXPIRE_MINUTES=10080
```

```bash
cd ..
```

### 2.3 Setup Frontend

```bash
# Create production .env
cat > .env << EOF
REACT_APP_API_URL=https://yourdomain.com/api/v1
PORT=3000
EOF

# Install dependencies
npm install

# Build for production
npm run build
```

---

## 🔐 Step 3: Configure PM2

### 3.1 Create PM2 Ecosystem File
```bash
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'rekha-backend',
      script: 'venv/bin/uvicorn',
      args: 'main:app --host 0.0.0.0 --port 8000',
      cwd: '/var/www/rekhapowerlift/blog-backend',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production'
      },
      error_file: '/var/www/rekhapowerlift/logs/backend-error.log',
      out_file: '/var/www/rekhapowerlift/logs/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    },
    {
      name: 'rekha-frontend',
      script: 'serve',
      args: '-s build -l 3000',
      cwd: '/var/www/rekhapowerlift',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production'
      },
      error_file: '/var/www/rekhapowerlift/logs/frontend-error.log',
      out_file: '/var/www/rekhapowerlift/logs/frontend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M'
    }
  ]
};
EOF
```

### 3.2 Install serve package globally
```bash
sudo npm install -g serve
```

### 3.3 Create logs directory
```bash
mkdir -p logs
```

### 3.4 Start applications with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 list  # Verify both apps are running
```

---

## 🌐 Step 4: Configure Nginx

### 4.1 Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/rekhapowerlift
```

**Add the following configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP to HTTPS (after SSL setup)
    # return 301 https://$server_name$request_uri;

    # Client max body size (for image uploads)
    client_max_body_size 25M;

    # Frontend (React build)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Increase timeout for large uploads
        proxy_read_timeout 300s;
        proxy_connect_timeout 300s;
    }

    # API docs
    location /docs {
        proxy_pass http://localhost:8000/docs;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 4.2 Enable the site
```bash
sudo ln -s /etc/nginx/sites-available/rekhapowerlift /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

---

## 🔒 Step 5: Setup SSL (HTTPS)

### 5.1 Install Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 5.2 Obtain SSL Certificate
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts and choose to redirect HTTP to HTTPS.

### 5.3 Auto-renewal
```bash
sudo certbot renew --dry-run  # Test auto-renewal
```

Certbot will automatically renew certificates before they expire.

---

## 🔥 Step 6: Configure Firewall

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

---

## 📊 Step 7: Monitoring & Maintenance

### 7.1 View Application Logs
```bash
# PM2 logs
pm2 logs rekha-backend
pm2 logs rekha-frontend

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Application-specific logs
tail -f /var/www/rekhapowerlift/logs/backend-out.log
tail -f /var/www/rekhapowerlift/logs/backend-error.log
```

### 7.2 PM2 Commands
```bash
pm2 list                    # List all processes
pm2 restart all             # Restart all apps
pm2 restart rekha-backend   # Restart backend only
pm2 restart rekha-frontend  # Restart frontend only
pm2 stop all               # Stop all apps
pm2 delete all             # Remove all apps
pm2 monit                  # Real-time monitoring
```

### 7.3 Update Application
```bash
cd /var/www/rekhapowerlift

# Pull latest changes
git pull origin main

# Update backend
cd blog-backend
source venv/bin/activate
pip install -r requirements.txt
cd ..

# Update frontend
npm install
npm run build

# Restart services
pm2 restart all
```

---

## 🎯 Step 8: Testing

### 8.1 Test URLs
- Frontend: `https://yourdomain.com`
- Backend API: `https://yourdomain.com/api/v1/blogs/`
- API Docs: `https://yourdomain.com/docs`
- Admin Panel: `https://yourdomain.com/admin`

### 8.2 Test Image Upload
1. Login to admin panel
2. Create a new gallery post
3. Upload images
4. Verify images appear in S3 bucket
5. Check frontend gallery display

---

## 🛡️ Security Checklist

- [ ] Changed default admin credentials
- [ ] Generated strong SECRET_KEY
- [ ] Configured CORS_ORIGINS correctly
- [ ] SSL certificate installed and auto-renewal working
- [ ] Firewall enabled and configured
- [ ] Server regularly updated
- [ ] Backup strategy in place
- [ ] AWS IAM permissions properly scoped
- [ ] Database tables have proper access controls

---

## 🔄 Backup Strategy

### Daily Backups (Recommended)
```bash
# Create backup script
sudo nano /usr/local/bin/backup-rekhapowerlift.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/rekhapowerlift"

mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/app_$DATE.tar.gz /var/www/rekhapowerlift \
    --exclude='/var/www/rekhapowerlift/node_modules' \
    --exclude='/var/www/rekhapowerlift/blog-backend/venv' \
    --exclude='/var/www/rekhapowerlift/build'

# Backup .env files
cp /var/www/rekhapowerlift/.env $BACKUP_DIR/frontend_env_$DATE
cp /var/www/rekhapowerlift/blog-backend/.env $BACKUP_DIR/backend_env_$DATE

# Keep only last 7 days
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "*_env_*" -mtime +7 -delete
```

```bash
sudo chmod +x /usr/local/bin/backup-rekhapowerlift.sh

# Add to crontab (daily at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/backup-rekhapowerlift.sh") | crontab -
```

---

## 🆘 Troubleshooting

### Application not starting
```bash
# Check PM2 status
pm2 list
pm2 logs --err

# Check port availability
sudo netstat -tulpn | grep :8000
sudo netstat -tulpn | grep :3000
```

### 502 Bad Gateway
```bash
# Check if backend is running
pm2 list
curl http://localhost:8000/api/v1/blogs/

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
```

### Image upload failing
- Check S3 bucket permissions
- Verify AWS credentials in .env
- Check client_max_body_size in Nginx config
- Verify CORS_ORIGINS includes your domain

### Database connection issues
- Verify AWS credentials
- Check DynamoDB table names
- Ensure IAM user has DynamoDB permissions
- Check AWS region setting

---

## 📞 Support

For issues or questions:
- Check logs: `pm2 logs`
- Review Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Verify environment variables
- Check AWS service status

---

## ✅ Quick Commands Reference

```bash
# Start applications
pm2 start ecosystem.config.js

# Restart applications
pm2 restart all

# Stop applications
pm2 stop all

# View logs
pm2 logs

# Monitor resources
pm2 monit

# Restart Nginx
sudo systemctl restart nginx

# Test Nginx config
sudo nginx -t

# View SSL certificate info
sudo certbot certificates
```

---

**🎉 Your application should now be live at `https://yourdomain.com`!**
