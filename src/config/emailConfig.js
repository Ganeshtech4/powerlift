// EmailJS Configuration
// Follow these steps to set up EmailJS:

/* 
SETUP INSTRUCTIONS:

1. Go to https://www.emailjs.com/ and create a free account
2. Create a new service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - {{name}} - User's name
   - {{email}} - User's email
   - {{phone}} - User's phone number
   - {{address}} - User's address
   - {{message}} - User's message

4. Get your credentials from EmailJS dashboard:
   - Service ID
   - Template ID
   - Public Key

5. Replace the values below with your actual EmailJS credentials
*/

export const emailConfig = {
  serviceId: 'service_xxxxxxx', // Replace with your EmailJS service ID
  templateId: 'template_xxxxxxx', // Replace with your EmailJS template ID
  publicKey: 'your_public_key_here' // Replace with your EmailJS public key
};

/* 
SAMPLE EMAIL TEMPLATE FOR EMAILJS:

Subject: New Contact Form Submission - WPC Telangana

Hello,

You have received a new message from the WPC Telangana contact form:

Name: {{name}}
Email: {{email}}
Phone: {{phone}}
Address: {{address}}

Message:
{{message}}

---
This message was sent from the WPC Telangana website contact form.
*/

export default emailConfig;