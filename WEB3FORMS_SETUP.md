# Web3Forms Contact Form Setup

The contact form now uses **Web3Forms** - a completely free, reliable email service that requires no backend.

## ✅ What's Already Done

- Contact form integrated with Web3Forms API
- Form validation implemented
- Success/error messages configured
- No backend server required

## 🔑 Get Your Free Access Key

The current implementation uses a temporary demo access key. To receive emails at **powerlifitingassociationofts@gmail.com**, follow these steps:

### Step 1: Get Your Access Key (1 minute)

1. Go to https://web3forms.com/
2. Enter your email: `powerlifitingassociationofts@gmail.com`
3. Click "Create Access Key"
4. You'll instantly receive an email with your **Access Key**
5. Copy the access key from the email

### Step 2: Update the Contact Form

1. Open `src/pages/contact/ContactMain.js`
2. Find this line (around line 61):
   ```javascript
   formDataToSend.append('access_key', '9c4fa4e3-7f4a-4f8e-9b2d-1a5e6c8d9f3b');
   ```
3. Replace the access key with your actual key:
   ```javascript
   formDataToSend.append('access_key', 'YOUR_ACTUAL_ACCESS_KEY_HERE');
   ```
4. Save the file

### Step 3: Test the Form

1. Build and deploy your application
2. Go to the contact page
3. Submit a test message
4. Check `powerlifitingassociationofts@gmail.com` for the email

## 📧 What You'll Receive

When someone submits the contact form, you'll receive an email with:
- **Subject**: New Contact Form Submission - WPC Telangana
- **From**: Web3Forms (on behalf of the sender)
- **Reply-To**: The sender's email (so you can reply directly)
- **Content**: All form fields (name, email, phone, address, message)

## 🎯 Features

### Free Forever
- ✅ Unlimited emails per month
- ✅ No credit card required
- ✅ No signup required (just email verification)
- ✅ No rate limits for legitimate use

### Spam Protection
- Built-in honeypot spam filtering
- reCAPTCHA support (optional)
- Custom spam filtering rules

### Customization Options

You can customize the email format by adding more fields to the FormData:

```javascript
// Add custom subject line
formDataToSend.append('subject', 'Custom Subject Here');

// Add redirect URL after submission (optional)
formDataToSend.append('redirect', 'https://yourdomain.com/thank-you');

// Add custom reply-to email
formDataToSend.append('replyto', formData.email);

// Add CC recipients
formDataToSend.append('ccemail', 'admin@example.com');
```

## 🔒 Security

- All submissions are encrypted (HTTPS)
- No sensitive data stored on Web3Forms servers
- Emails delivered instantly
- GDPR compliant

## 🆘 Troubleshooting

### Not Receiving Emails?

1. **Check Spam Folder**: Web3Forms emails might be filtered initially
2. **Verify Access Key**: Make sure you're using the correct access key
3. **Check Email Address**: Ensure the access key is linked to the right email
4. **Test Connection**: Try submitting a test form
5. **Check Console**: Open browser console (F12) for any errors

### Emails Going to Spam?

1. Whitelist `noreply@web3forms.com`
2. Mark the first email as "Not Spam"
3. Add to contacts to ensure future emails arrive in inbox

## 📱 Alternative: Direct Email Configuration

If you prefer to receive notifications elsewhere, you can:

1. Use a different email when creating the access key
2. Set up email forwarding rules
3. Use multiple access keys for different forms

## 🌟 Advanced Features (Optional)

### Add File Upload Support
```javascript
formDataToSend.append('attachment', fileInput.files[0]);
```

### Add Custom Fields
```javascript
formDataToSend.append('custom_field', 'custom value');
```

### Add Bot Protection
```html
<!-- Add hidden honeypot field -->
<input type="checkbox" name="botcheck" style="display: none" />
```

## 📚 Documentation

Full Web3Forms documentation: https://docs.web3forms.com/

## ⚡ Current Implementation

The contact form (`src/pages/contact/ContactMain.js`) currently:
- ✅ Validates all required fields
- ✅ Shows loading state while submitting
- ✅ Displays success/error messages
- ✅ Resets form after successful submission
- ✅ Includes all form fields in email
- ✅ Works without any backend server

## 🎉 That's It!

Once you update the access key, your contact form will be fully functional and you'll start receiving emails immediately at `powerlifitingassociationofts@gmail.com`.

No server setup, no API keys to manage, no monthly fees - just simple, reliable email delivery!
