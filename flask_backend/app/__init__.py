from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_session import Session
from config import Config
from flask_sqlalchemy import SQLAlchemy
from config import Config


db: SQLAlchemy = SQLAlchemy()
bcrypt: Bcrypt = Bcrypt()
migrate = Migrate()

#from flask_backend.app.views import main as main_blueprint
#app.register_blueprint(main_blueprint)

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)
    CORS(app, supports_credentials=True)
    Session(app)
    

    #Registering blueprint
    from .views import user
    app.register_blueprint(user)

    with app.app_context():
        db.create_all()  # Create all tables
    
    return app
