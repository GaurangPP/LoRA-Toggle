from flask import Blueprint, jsonify, request 
from app import db
from app.models import MyModel

main = Blueprint('main', __name__)

@main.route('/api/data', methods=['GET'])
def get_data():
    data = MyModel.query.all()
    return jsonify([item.to_dict() for item in data])

@main.route('/api/data', methods=['POST'])
def create_data():
    data = request.json
    new_item = MyModel(name=data['name'], value=data['value'])
    db.session.add(new_item)
    db.session.commit()
    return jsonify(new_item.to_dict()), 201