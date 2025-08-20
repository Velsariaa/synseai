from datetime import datetime
import pytz
from enum import Enum
from . import db
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import os

class UserRole(str, Enum):
    USER = 'user'
    EMPLOYEE = 'employee'
    ADMIN = 'admin'

# Load environment variables from .env file
load_dotenv()

class User(db.Model):
    """User account model."""
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    contact_number = db.Column(db.String(20), nullable=True)
    password_hash = db.Column(db.String(128))
    created_at = db.Column(db.DateTime, default=datetime.now(pytz.timezone(os.getenv('APP_TIMEZONE'))))
    position = db.Column(db.String(100), nullable=True)
    role = db.Column(db.Enum(UserRole), default=UserRole.USER, nullable=False)

    # Relationships
    company = db.relationship('Company', back_populates='user', uselist=False)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'), nullable=True)
    department = db.relationship('Department', backref='users')

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __init__(self, **kwargs):
        """
        Remove password from kwargs if it exists so that User constructor 
        won't find the corresponding password property as we only store password_hash
        """
        password = kwargs.pop('password', None)
        super(User, self).__init__(**kwargs)
        if password:
            self.set_password(password)

    def set_password(self, password):
        """Create hashed password."""
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        """Check if the provided password matches the stored hash."""
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        """Return user data as a dictionary."""
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'position': self.position,
            'role': self.role.value,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

    def __repr__(self):
        return f'<User {self.email}>'
