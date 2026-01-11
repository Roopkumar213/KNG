from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import hashlib
import jwt
import datetime
import os
from dotenv import load_dotenv
from database import get_db_connection, init_db
from email_service import send_email, create_booking_email

load_dotenv()

app = Flask(__name__)
CORS(app, origins=os.environ.get('ALLOWED_ORIGINS', 'http://localhost:3000').split(',')) # Enable CORS for React Frontend

SECRET_KEY = os.environ['SECRET_KEY']

# Initialize DB on start
init_db()

def token_required(f):
    def decorator(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        try:
            token = token.split(" ")[1] # Bearer <token>
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except:
            return jsonify({'message': 'Token is invalid'}), 401
        return f(*args, **kwargs)
    decorator.__name__ = f.__name__
    return decorator

@app.route('/api/bookings', methods=['POST'])
def create_booking():
    data = request.json
    try:
        conn = get_db_connection()
        c = conn.cursor()
        c.execute('''
            INSERT INTO bookings (name, email, phone, date, group_size, experience_level, message)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (data['name'], data['email'], data.get('phone'), data['date'], data['size'], data.get('experience'), data.get('message')))
        booking_id = c.lastrowid
        conn.commit()
        conn.close()
        
        # Send Email
        html_content = create_booking_email(data)
        send_email(os.environ['ADMIN_EMAIL'], "📍 New Guide Booking Request", html_content)
        
        return jsonify({'success': True, 'bookingId': booking_id, 'message': 'Booking request received.'}), 201
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/inquiries', methods=['POST'])
def create_inquiry():
    data = request.json
    try:
        conn = get_db_connection()
        c = conn.cursor()
        c.execute('INSERT INTO inquiries (name, email, message) VALUES (?, ?, ?)',
                 (data['name'], data['email'], data['message']))
        conn.commit()
        conn.close()
        return jsonify({'success': True, 'message': 'Inquiry received.'}), 201
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# Audit Helper
def log_audit(event_type, description, user_id=None):
    try:
        conn = get_db_connection()
        c = conn.cursor()
        ip = request.remote_addr
        c.execute('INSERT INTO audit_logs (event_type, user_id, description, ip_address) VALUES (?, ?, ?, ?)',
                  (event_type, user_id, description, ip))
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Audit Log Failed: {e}")

# Security Headers (Government-Grade)
@app.after_request
def add_security_headers(response):
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['Content-Security-Policy'] = "default-src 'self' http://localhost:3000; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    return response

@app.route('/admin/login', methods=['POST'])
def login():
    auth = request.json
    if not auth or not auth.get('email') or not auth.get('password'):
        log_audit('LOGIN_FAIL', f"Missing creds for {auth.get('email', 'unknown')}")
        return jsonify({'message': 'Could not verify'}), 401
        
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (auth['email'],)).fetchone()
    conn.close()
    
    if not user:
        log_audit('LOGIN_FAIL', f"User not found: {auth['email']}")
        return jsonify({'message': 'User not found'}), 401
        
    input_hash = hashlib.sha256(auth['password'].encode()).hexdigest()
    
    if user['password_hash'] == input_hash:
        token = jwt.encode({
            'user_id': user['id'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, SECRET_KEY, algorithm="HS256")
        
        log_audit('LOGIN_SUCCESS', f"Admin login: {auth['email']}", user['id'])
        return jsonify({'token': token})
        
    log_audit('LOGIN_FAIL', f"Invalid password: {auth['email']}", user['id'])
    return jsonify({'message': 'Login failed'}), 401

@app.route('/admin/bookings', methods=['GET'])
@token_required
def get_bookings():
    conn = get_db_connection()
    bookings = conn.execute('SELECT * FROM bookings ORDER BY created_at DESC').fetchall()
    conn.close()
    return jsonify([dict(row) for row in bookings])

@app.route('/admin/inquiries', methods=['GET'])
@token_required
def get_inquiries():
    conn = get_db_connection()
    inquiries = conn.execute('SELECT * FROM inquiries ORDER BY created_at DESC').fetchall()
    conn.close()
    return jsonify([dict(row) for row in inquiries])
    
# Admin Audit Endpoint (Optional View)
@app.route('/admin/audit', methods=['GET'])
@token_required
def get_audit_logs():
    conn = get_db_connection()
    logs = conn.execute('SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 50').fetchall()
    conn.close()
    return jsonify([dict(row) for row in logs])

if __name__ == '__main__':
    app.run(debug=True, port=5000)
