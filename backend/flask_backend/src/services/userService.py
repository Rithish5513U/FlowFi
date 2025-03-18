from models import User
from pymongo import MongoClient
from dotenv import load_dotenv
from passlib.context import CryptContext
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client['test']

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

users = db['users']
transactions = db['transactions']

def create_user(user: User):
    try:
        found = users.find_one({"email": user.email})
        if found:
            return {
                "success" : False,
                "message" : "User already exists"
            }
        hashed_password = pwd_context.hash(user.password)
        users.insert_one({
            "name": user.name,
            "email": user.email,
            "password": hashed_password
        })
        return {
            "success" : True,
            "message" : "User created"
        }
    except Exception as e:
        return {
            "success" : False,
            "message" : f"Error detected : {str(e)}"
        }
        
def verify_user(email, password):
    try:
        match = users.find_one({"email": email})
        if not match:
            return {
                "success" : False,
                "message" : "User not found"
            }
        if pwd_context.verify(password, match["password"]):
            return {
                "success" : True,
                "message" : "User verified"
            }
        else:
            return {
                "success" : False,
                "message" : "Password incorrect"
            }
    except Exception as e:
        return {
            "success" : False,
            "message" : f"Error detected : {str(e)}"
        }
        
