import smtplib
from email.mime.text import MIMEText
from flask import render_template_string

def send_welcome_email(recipient, student_id, cap_gb, timeout, mac):
    """Sends a branded HTML email to the student."""
    # This matches our HTML template
    with open('templates/email_welcome.html', 'r') as f:
        template = f.read()
    
    body = render_template_string(template, 
                                  student_id=student_id, 
                                  cap_gb=cap_gb, 
                                  timeout=timeout, 
                                  mac=mac)
    
    msg = MIMEText(body, 'html')
    msg['Subject'] = f"UJ WiFi Access: {student_id}"
    msg['From'] = "wifi-noreply@uj.ac.za"
    msg['To'] = recipient

    # Replace with actual SMTP settings
    # with smtplib.SMTP('smtp.uj.ac.za', 587) as server:
    #     server.starttls()
    #     server.send_message(msg)
    print(f"📧 Notification sent to {student_id}@student.uj.ac.za")

from twilio.rest import Client
import os

# Your Twilio Credentials (Get these from twilio.com)
ACCOUNT_SID = 'your_sid_here'
AUTH_TOKEN = 'your_token_here'
client = Client(ACCOUNT_SID, AUTH_TOKEN)

def send_uj_alert(message):
    try:
        msg = client.messages.create(
            from_='whatsapp:+14155238886', # Twilio Sandbox Number
            body=f"🟠 *UJ WiFi Alert:* {message}",
            to='whatsapp:+27XXXXXXXXX'   # Your Phone Number
        )
        return True
    except Exception as e:
        print(f"WhatsApp Error: {e}")
        return False