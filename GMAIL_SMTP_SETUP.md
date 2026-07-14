# Gmail SMTP Setup for Contact Form

This guide will help you set up Gmail SMTP to receive contact form submissions at **powerlifitingassociationofts@gmail.com**.

## ✅ Why Gmail SMTP?

- **100% Free** - Send up to 500 emails per day
- **Reliable** - Gmail's infrastructure ensures delivery
- **No Third-Party** - Direct from your backend to Gmail
- **Secure** - Uses App Passwords (not your actual password)

## 🔧 Setup Steps (5 minutes)

### Step 1: Enable 2-Step Verification on Gmail

1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** in the left sidebar
3. Under "How you sign in to Google", click **2-Step Verification**
4. Follow the steps to enable it (if not already enabled)

### Step 2: Generate an App Password

1. Go to: https://myaccount.google.com/apppasswords
   - Or: Google Account > Security > 2-Step Verification > App passwords
2. In "Select app", choose **Mail**
3. In "Select device", choose **Other (Custom name)**
4. Type: **WPC Telangana Website**
5. Click **Generate**
6. **Copy the 16-character password** (format: xxxx xxxx xxxx xxxx)
   - Remove spaces: `xxxxxxxxxxxxxxxx`
   - Keep this password safe!

### Step 3: Update Backend Configuration

1. Navigate to `blog-backend/` folder
2. Open `.env` file (create from `.env.example` if needed)
3. Find the email section and update:

```env
# Email Configuration (Gmail SMTP)
MAIL_USERNAME=powerlifitingassociationofts@gmail.com
MAIL_PASSWORD=xxxxxxxxxxxxxxxx  # Your 16-character App Password (no spaces)
MAIL_FROM=powerlifitingassociationofts@gmail.com
MAIL_PORT=587
MAIL_SERVER=smtp.gmail.com
MAIL_FROM_NAME=WPC Telangana Contact Form
MAIL_STARTTLS=True
MAIL_SSL_TLS=False
USE_CREDENTIALS=True
VALIDATE_CERTS=True
MAIL_TO=powerlifitingassociationofts@gmail.com
```

4. Save the file

### Step 4: Start the Backend Server

```powershell
# Navigate to backend folder
cd blog-backend

# Install dependencies (if not already done)
pip install -r requirements.txt

# Start the server
python main.py
```

The server should start on `http://127.0.0.1:8000`

### Step 5: Test the Contact Form

1. Make sure frontend is running: `npm start`
2. Navigate to the Contact page
3. Fill in the form and submit
4. Check **powerlifitingassociationofts@gmail.com** inbox
5. You should receive an email with the form data

## 📧 What You'll Receive

When someone submits the contact form, you'll get an email with:

```
Subject: New Contact Form Submission - WPC Telangana

New Contact Form Submission

Name: [User's Name]
Email: [User's Email]
Phone: [User's Phone]
Address: [User's Address]

Message:
[User's Message]

---
This message was sent from the WPC Telangana website contact form.
```

You can reply directly to the user's email from your inbox.

## 🔍 Troubleshooting

### Error: "535 Authentication failed"
**Solution**: Make sure you're using the App Password, not your regular Gmail password.

### Error: "Connection refused"
**Solution**: 
1. Check that the backend server is running
2. Verify `.env` file has correct settings
3. Make sure MAIL_PORT is `587`

### Not receiving emails?
**Solution**:
1. Check Gmail Spam folder
2. Verify `MAIL_TO` email is correct in `.env`
3. Check backend console for errors
4. Verify App Password is correct (no spaces)

### Error: "Application-specific password required"
**Solution**: You must use an App Password, not your regular password. Follow Step 2 above.

### Backend not starting?
**Solution**:
```powershell
# Make sure you're in the backend folder
cd blog-backend

# Check if dependencies are installed
pip install -r requirements.txt

# Try running with verbose output
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 🌐 Production Deployment

### Environment Variables on Server

Make sure these environment variables are set on your production server:

```bash
MAIL_USERNAME=powerlifitingassociationofts@gmail.com
MAIL_PASSWORD=your_app_password_here
MAIL_TO=powerlifitingassociationofts@gmail.com
```

### Frontend API URL

Update `.env` in frontend (production):
```env
REACT_APP_API_URL=https://your-api-domain.com
```

Or hardcode in `src/pages/contact/ContactMain.js`:
```javascript
const apiUrl = 'https://your-api-domain.com';
```

## 🔒 Security Best Practices

✅ **Do:**
- Use App Passwords (never your main Gmail password)
- Keep `.env` file in `.gitignore` (already done)
- Rotate App Passwords periodically
- Use environment variables on production

❌ **Don't:**
- Don't commit `.env` file to Git
- Don't share your App Password
- Don't use your main Gmail password
- Don't disable 2-Step Verification

## 📊 Gmail Sending Limits

- **Free Gmail**: 500 emails per day
- **Google Workspace**: 2,000 emails per day

This is more than enough for a contact form!

## 🆘 Alternative: If Gmail Doesn't Work

If you can't use Gmail for any reason, here are alternatives:

### Option 1: Outlook/Hotmail
```env
MAIL_SERVER=smtp-mail.outlook.com
MAIL_PORT=587
MAIL_USERNAME=your_email@outlook.com
MAIL_PASSWORD=your_app_password
```

### Option 2: Yahoo Mail
```env
MAIL_SERVER=smtp.mail.yahoo.com
MAIL_PORT=587
MAIL_USERNAME=your_email@yahoo.com
MAIL_PASSWORD=your_app_password
```

### Option 3: SendGrid (Free tier: 100 emails/day)
1. Sign up at https://sendgrid.com/
2. Get API key
3. Update backend to use SendGrid API

## ✅ Verification Checklist

Before going live, verify:

- [ ] Backend server starts without errors
- [ ] `.env` file has Gmail App Password
- [ ] 2-Step Verification enabled on Gmail account
- [ ] App Password is 16 characters (no spaces)
- [ ] Test email received successfully
- [ ] Email arrives in inbox (not spam)
- [ ] Frontend connects to backend API
- [ ] Production environment variables set

## 📞 Need Help?

If you encounter issues:
1. Check backend console for error messages
2. Verify all environment variables are set correctly
3. Test sending email manually from backend
4. Check Gmail account security settings

## 🎉 Done!

Once configured, your contact form will:
- ✅ Send emails reliably via Gmail
- ✅ Deliver to powerlifitingassociationofts@gmail.com
- ✅ Include all form fields
- ✅ Allow direct reply to users
- ✅ Work 24/7 automatically

No more third-party services, no suppressed emails!
