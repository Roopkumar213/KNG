import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

# Configuration from environment variables
SMTP_SERVER = os.environ['SMTP_HOST']
SMTP_PORT = int(os.environ['SMTP_PORT'])
SMTP_USER = os.environ['SMTP_USER']
SMTP_PASS = os.environ['SMTP_PASSWORD']
EMAIL_FROM = os.environ['EMAIL_FROM'] 

def create_booking_email(booking_data):
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: 'Georgia', serif; color: #1c1917; line-height: 1.6; }}
            .container {{ max-width: 600px; margin: 0 auto; border: 1px solid #d6d3d1; background: #fafaf9; }}
            .header {{ background: #1c1917; color: #fff; padding: 20px; text-align: center; }}
            .header h1 {{ margin: 0; font-family: 'Courier New', monospace; letter-spacing: 2px; text-transform: uppercase; }}
            .content {{ padding: 30px; }}
            .card {{ background: #fff; padding: 20px; border: 1px solid #e7e5e4; margin-bottom: 20px; border-left: 4px solid #ea580c; }}
            .label {{ font-size: 12px; text-transform: uppercase; color: #78716c; font-weight: bold; display: block; margin-bottom: 4px; }}
            .value {{ font-size: 16px; font-weight: bold; display: block; margin-bottom: 16px; }}
            .footer {{ text-align: center; font-size: 12px; color: #a8a29e; padding: 20px; border-top: 1px solid #d6d3d1; }}
            .btn {{ display: inline-block; background: #ea580c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Kangundi Tourism</h1>
            </div>
            <div class="content">
                <p><strong>Subject:</strong> 📍 New Guide Booking Request</p>
                <p>Hello Admin,</p>
                <p>A new guide request has been received for the boulder fields.</p>
                
                <div class="card">
                    <span class="label">Tourist Name</span>
                    <span class="value">{booking_data['name']}</span>
                    
                    <span class="label">Contact Info</span>
                    <span class="value">{booking_data['email']} | {booking_data['phone']}</span>
                    
                    <span class="label">Requested Date</span>
                    <span class="value">{booking_data['date']}</span>
                    
                    <span class="label">Group Details</span>
                    <span class="value">{booking_data['size']} Climbers | Level: {booking_data['experience']}</span>
                </div>
                
                <p style="text-align: center;">
                    <a href="mailto:{booking_data['email']}" class="btn">Reply to Tourist</a>
                </p>
            </div>
            <div class="footer">
                &copy; 2026 Kangundi Heritage & Adventure.<br>
                Official Government Notification System.
            </div>
        </div>
    </body>
    </html>
    """
    return html

def send_email(to_email, subject, html_content):
    # In a real demo without valid credentials, we log to console instead of crashing
    print("========================================")
    print(f"📧 SENDING EMAIL TO: {to_email}")
    print(f"Subject: {subject}")
    # print(html_content) # Uncomment to see full HTML
    print("========================================")
    
    # Logic for real sending implementation:
    # try:
    #     msg = MIMEMultipart("alternative")
    #     msg["Subject"] = subject
    #     msg["From"] = SMTP_USER
    #     msg["To"] = to_email
    #     msg.attach(MIMEText(html_content, "html"))
    #     with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
    #         server.starttls()
    #         server.login(SMTP_USER, SMTP_PASS)
    #         server.sendmail(SMTP_USER, to_email, msg.as_string())
    # except Exception as e:
    #     print(f"Error sending email: {e}")
    
    return True
