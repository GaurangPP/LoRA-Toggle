from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from app import db


def get_uuid():
    return uuid4().hex
    
#User class for auth
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique = True, default = get_uuid)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
