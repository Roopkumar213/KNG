import sqlite3
import hashlib
from datetime import datetime
import os

DB_NAME = os.environ.get('DATABASE_URL', 'sqlite:///kangundhi.db').replace('sqlite:///', '')

def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    c = conn.cursor()
    
    # Users (Admin)
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL
        )
    ''')
    
    # Bookings
    c.execute('''
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            date TEXT NOT NULL,
            group_size INTEGER,
            experience_level TEXT,
            message TEXT,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Inquiries
    c.execute('''
        CREATE TABLE IF NOT EXISTS inquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Audit Logs (Government Compliance)
    c.execute('''
        CREATE TABLE IF NOT EXISTS audit_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_type TEXT NOT NULL, -- 'LOGIN', 'LOGIN_FAIL', 'BOOKING_UPDATE'
            user_id INTEGER, -- Nullable for failed logins
            description TEXT,
            ip_address TEXT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create default admin if not exists
    # Default: admin@kangundhi.com / admin123
    admin_hash = hashlib.sha256("admin123".encode()).hexdigest()
    try:
        c.execute("INSERT INTO users (email, password_hash) VALUES (?, ?)", ("admin@kangundhi.com", admin_hash))
    except sqlite3.IntegrityError:
        pass
        
    conn.commit()
    conn.close()
    print("Database initialized.")

if __name__ == '__main__':
    init_db()
