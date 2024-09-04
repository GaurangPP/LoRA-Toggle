from dotenv import load_dotenv
import os
import redis
basedir = os.path.abspath(os.path.dirname(__file__))

load_dotenv()

class Config:
    #fix secret key issues
    SECRET_KEY = os.getenv('SECRET_KEY', 'hiudsbnind')

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = r"sqlite:///./db.sqlite"

    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url('redis://127.0.0.1:6379')

    SESSION_COOKIE_HTTPONLY = False
    SESSION_COOKIE_SECURE = True  # Set to True if using HTTPS
    SESSION_COOKIE_SAMESITE = 'None'  # Or 'None' if needed

    CORS_SUPPORTS_CREDENTIALS=True
    