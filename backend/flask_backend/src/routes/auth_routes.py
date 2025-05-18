from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from services.userService import create_user, verify_user
from models.userModel import User

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/register")
def register():
    data = request.json
    name, email, password = data["name"], data["email"], data["password"]
    user = User(name=name, email=email, password=password)
    response = create_user(user)
    if response["success"]:
        return jsonify({"message": response["message"]}), 201
    return jsonify({"error": response["message"]}), 400

@auth_bp.post("/login")
def login():
    data = request.json
    email, password = data["email"], data["password"]
    response = verify_user(email, password)
    if response["success"]:
        access_token = create_access_token(identity=email)
        return jsonify({"message": response["message"], "access_token": access_token})
    return jsonify({"error": response["message"]}), 401
