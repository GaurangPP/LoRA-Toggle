from flask import Blueprint, jsonify, request, session
from flask_cors import cross_origin 
from .models import User
from app import bcrypt, db


user = Blueprint('User', __name__)


#Route to get a user registered
@user.route('/register',methods=['POST'])
def register():
    data = request.get_json()

    username = data["username"]
    email = data["email"]
    password = data["password"]

    user_exists = User.query.filter_by(username=username).first()

    if user_exists is not None:
        return jsonify({'error':'Username already in use'}), 409

    email_exists = User.query.filter_by(email=email).first()

    if email_exists is not None:
        return jsonify({'error':'Email already in use'}), 409
    
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_password)
    #What is db.session? Assuming this adds to the session db?
    db.session.add(new_user)
    #Saves?
    db.session.commit()
    session["user_id"] = new_user.id

    return jsonify({
        'id': new_user.id,
        'username': new_user.username,
        'email': new_user.email,
        'message': 'User registered successfully'
        }), 200

@user.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data['email']
    password = data['password']

    #Understand the query and the filter_by
    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({'error': 'Incorrect username or password'}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({'error': 'Incorrect username or password'}), 401
    

    session["user_id"] = user.id

    return jsonify({
        'id': user.id,
        'email': user.email,
        'message': 'Successfully logged in'
    }), 200


@user.route('/logout', methods=['POST'])
def logout():
     session.pop("user_id")
     return jsonify({'message': 'User logged out successfully'}), 200


@user.route('/info', methods=["GET"])
def retrieve():
    user_id = session.get('user_id')

    if not user_id:
        return jsonify({'error': 'No user in session'}), 401 
    
    user = User.query.filter_by(id=user_id).first()

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email
    }), 200


