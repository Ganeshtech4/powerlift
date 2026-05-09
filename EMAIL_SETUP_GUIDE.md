# Email Setup Guide - Free Solutions

## Current Status
Your application **IS configured** to send emails when:
- District enquiry forms are submitted
- Contact forms are submitted

**Recipient:** powerliftingassociationofts@gmail.com

**Problem:** `.env` has dummy password - emails won't send until you configure a real email service.

---

## 🆓 Free Email Service Options

### Option 1: Brevo (Recommended - Already Configured) ⭐
**Free Tier:** 300 emails/day forever
**Your current setup uses this - just need real credentials**

#### Setup Steps:
1. Go to https://www.brevo.com/
2. Sign up for free account
3. Verify your email
4. Go to **Settings → SMTP & API**
5. Click "Generate a new SMTP key"
6. Copy the credentials

#### Update `.env`:
```env
MAIL_USERNAME=your-email@example.com  # Your Brevo login email
MAIL_PASSWORD=xsmtpsib-xxxxxxxxxxxxx-xxxxxxx  # The SMTP key you generated
MAIL_FROM=noreply@rekhawpctelangana.com  # Can be any email (Brevo will send from this)
MAIL_PORT=587
MAIL_SERVER=smtp-relay.brevo.com
MAIL_STARTTLS=True
MAIL_SSL_TLS=False
USE_CREDENTIALS=True  # Change this to True
```

---

### Option 2: Resend (Modern & Developer-Friendly) ⭐
**Free Tier:** 100 emails/day, 3,000/month
**Best for:** Modern API, very simple

#### Setup Steps:
1. Go to https://resend.com/
2. Sign up (can use GitHub login)
3. Add your domain or use their test domain
4. Go to **API Keys** → Create API Key
5. Copy the API key

**Note:** Resend uses API, not SMTP. You'll need to modify the email handler.

---

### Option 3: Gmail SMTP (Most Reliable)
**Free Tier:** 500 emails/day
**Best for:** Most reliable, trusted sender

#### Setup Steps:
1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security**
3. Enable **2-Step Verification** (required for app passwords)
4. Go to **Security → 2-Step Verification → App passwords**
5. Select "Mail" and "Other (Custom name)"
6. Name it "WPC Telangana Backend"
7. Copy the 16-character password

#### Update `.env`:
```env
MAIL_USERNAME=powerliftingassociationofts@gmail.com
MAIL_PASSWORD=abcd efgh ijkl mnop  # The 16-char app password
MAIL_FROM=powerliftingassociationofts@gmail.com
MAIL_PORT=587
MAIL_SERVER=smtp.gmail.com
MAIL_STARTTLS=True
MAIL_SSL_TLS=False
USE_CREDENTIALS=True
```

---

### Option 4: SendGrid
**Free Tier:** 100 emails/day forever
**Best for:** Enterprise-grade features

#### Setup Steps:
1. Go to https://sendgrid.com/
2. Sign up for free account
3. Complete email verification
4. Go to **Settings → API Keys**
5. Create API Key with "Mail Send" permissions
6. Copy the API key

#### Update `.env`:
```env
MAIL_USERNAME=apikey  # Literally type "apikey"
MAIL_PASSWORD=SG.xxxxxxxxxxxxxxxxxxxxx  # Your SendGrid API key
MAIL_FROM=noreply@rekhawpctelangana.com
MAIL_PORT=587
MAIL_SERVER=smtp.sendgrid.net
MAIL_STARTTLS=True
MAIL_SSL_TLS=False
USE_CREDENTIALS=True
```

---

### Option 5: Mailgun
**Free Tier:** 5,000 emails/month for first 3 months, then 1,000/month
**Best for:** Flexibility

#### Setup Steps:
1. Go to https://www.mailgun.com/
2. Sign up for free trial
3. Verify your domain (or use sandbox domain for testing)
4. Go to **Sending → Domain Settings → SMTP credentials**
5. Create SMTP credentials

#### Update `.env`:
```env
MAIL_USERNAME=postmaster@sandboxXXXXXXXXX.mailgun.org
MAIL_PASSWORD=your-smtp-password
MAIL_FROM=noreply@rekhawpctelangana.com
MAIL_PORT=587
MAIL_SERVER=smtp.mailgun.org
MAIL_STARTTLS=True
MAIL_SSL_TLS=False
USE_CREDENTIALS=True
```

---

## 📋 Comparison Table

| Service | Free Limit | Setup Difficulty | Reliability |
|---------|-----------|------------------|-------------|
| **Brevo** | 300/day | ⭐ Easy | ⭐⭐⭐⭐ |
| **Gmail** | 500/day | ⭐⭐ Medium | ⭐⭐⭐⭐⭐ |
| **Resend** | 100/day | ⭐ Easy | ⭐⭐⭐⭐ |
| **SendGrid** | 100/day | ⭐⭐ Medium | ⭐⭐⭐⭐⭐ |
| **Mailgun** | 1,000/month | ⭐⭐⭐ Hard | ⭐⭐⭐⭐ |

---

## 🚀 Quick Start (Recommended)

### Use Brevo (Your Current Setup):
1. Sign up at https://www.brevo.com/
2. Verify email
3. Get SMTP credentials from Settings
4. Update `.env` with real credentials
5. Restart backend: `python main.py`
6. Test by submitting district enquiry form

### Or Use Gmail (Most Reliable):
1. Enable 2-Step Verification on powerliftingassociationofts@gmail.com
2. Generate App Password
3. Update `.env` with Gmail credentials
4. Restart backend
5. Test

---

## 🧪 Testing Email After Setup

### Test via API:
```bash
curl -X POST http://localhost:8000/api/v1/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "message": "Test message"
  }'
```

### Test via District Form:
1. Open your website
2. Go to Districts page
3. Click "Enquire" on any district
4. Fill and submit form
5. Check powerliftingassociationofts@gmail.com

---

## 🔧 Troubleshooting

### "Failed to send email"
- Check MAIL_PASSWORD is correct
- Ensure USE_CREDENTIALS=True
- Verify MAIL_SERVER and MAIL_PORT
- Check backend logs for detailed error

### Gmail "Less secure app"
- Use App Password, NOT your regular password
- Must enable 2-Step Verification first

### Brevo "Invalid credentials"
- Use SMTP key, not account password
- Server must be smtp-relay.brevo.com (not smtp-relay.sendinblue.com)

---

## 📝 Current Email Flows

### 1. District Enquiry Email
**Trigger:** User submits district enquiry form
**Endpoint:** `POST /api/v1/districts/enquiry`
**Recipient:** powerliftingassociationofts@gmail.com
**Content:** District name, user name, email, phone, message

### 2. Contact Form Email
**Trigger:** User submits contact form
**Endpoint:** `POST /api/v1/send-email`
**Recipient:** powerliftingassociationofts@gmail.com
**Content:** Name, email, phone, address, message

---

## ✅ After Setup Checklist
- [ ] Email service account created
- [ ] Credentials added to `.env`
- [ ] `USE_CREDENTIALS` set to `True`
- [ ] Backend restarted
- [ ] Test email sent successfully
- [ ] Production `.env` updated (if different from local)
- [ ] Email deliverability tested (check spam folder)

---

## 💡 Pro Tips

1. **Start with Brevo** - It's already configured, just need credentials
2. **Use Gmail** if you want maximum reliability
3. **Monitor usage** - All free tiers have daily/monthly limits
4. **Test locally first** before deploying
5. **Check spam folder** when testing
6. **Add SPF/DKIM records** to your domain for better deliverability (advanced)

---

## 🆘 Need Help?
If emails still don't work after setup:
1. Check backend logs for errors
2. Verify credentials in `.env`
3. Test SMTP connection: `telnet smtp-relay.brevo.com 587`
4. Ensure firewall allows outbound port 587
