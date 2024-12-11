from flask import Blueprint, jsonify, make_response, request, session
from flask_cors import cross_origin
from sqlalchemy import desc 
from .models import Chat, User
from app import bcrypt, db


user = Blueprint('User', __name__)
chat = Blueprint('Chat', __name__)


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
    #Adds to saving session
    db.session.add(new_user)
    #Commits save
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


#Chat routes for saving, retrieving, and deleting chats
@chat.route('/save', methods = ["POST", 'OPTIONS'])
def save():
    if request.method == 'OPTIONS':
        print('great')
        return _build_cors_preflight_response()
        #return '', 204  # Return an empty response for the OPTIONS preflight request
    
    user_id = session.get('user_id')

    if not user_id:
        return jsonify({'error': 'No user in session'}), 401
    
    data = request.get_json()

    title = data['title']

    conversation = data.get('messages', [])

    chat = Chat(user_id = user_id, title = title)
    chat.save_conversation(conversation)

    #Adds to saving session
    db.session.add(chat)
    #Commits save
    db.session.commit()
    #Need to do the db migrations too
    return _corsify_actual_response(jsonify({'message': 'Conversation saved successfully'})), 200


@chat.route('/edit', methods = ['PUT'])
def edit():

    return 

@chat.route('/delete', methods = ["DELETE"])
def delete():

    return

@chat.route('/retrieve/titles', methods = ['GET'])
def retrieve_titles():
    user_id = session.get('user_id')

    user_chats = Chat.query.filter_by(user_id = user_id).order_by(desc(Chat.timestamp)).all()

    chat_map = {}

    #Loop through and get all title names and ids and return as a jsonify as key value pairs
    for chat in user_chats:
        chat_map[chat.id] = {'title': chat.title}

    return jsonify({'chat_titles': {chat_map}}), 200

@chat.route('/retrieve/chat', methods = ['GET'])
def retrieve_chat():

    #Query based on chat id and user id to get a specific chat and return the sequence of responses as key-value pairs
    #key = who spoke, value = what was spoken
    user_id = session.get('user_id')

    if not user_id:
        return jsonify({'error': 'No user in session'}), 401

    data = request.get_json()

    chat_id = data['id']

    user_chat = Chat.query.filter_by(user_id = user_id, id = chat_id).first()

    messages = user_chat.get_conversation()

    return jsonify({"messages": messages}), 200



def _build_cors_preflight_response():
    response = make_response()
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response