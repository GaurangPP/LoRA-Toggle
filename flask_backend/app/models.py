from datetime import datetime
from flask import json
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

    #Forming a relationship between the database models
    chats = db.relationship('Chat', backref='users', lazy=True)


class Chat(db.Model):
    __tablename__ = "chats"
    #id = db.Column(db.Integer, primary_key=True, unique = True, default = get_uuid)
    id = db.Column(db.Integer, primary_key=True, unique = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', name='fk_users_id'), nullable=False)
    title = db.Column(db.String(150), nullable = False)
    conversation = db.Column(db.Text, nullable=False)  # Store serialized JSON
    timestamp = db.Column(db.DateTime, default=datetime.now())

    def save_conversation(self, messages):
        # Convert list of messages to JSON and save it to the db.Text field
        self.conversation = json.dumps(messages)  # Serialize list to JSON

    def get_conversation(self):
        # Convert the stored JSON back to a Python list
        return json.loads(self.conversation)  # Deserialize JSON back to list
