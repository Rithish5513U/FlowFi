from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS
from src.news import News
from src.faq_chatbot import FAQChatBot
from src.excelhandler import ExcelHandler
from src.services.userService import create_user, verify_user
from src.models.userModel import User
from dotenv import load_dotenv
import os

load_dotenv()
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')

app = Flask(__name__)
CORS(app)

jwt = JWTManager(app)

@app.route('/')
def home():
    return "Welcome to FlowFi!"

@app.post('/register')
def register():
    data = request.json
    name = data['name']
    email = data['email']
    password = data['password']
    user = User(name=name, email=email, password=password)
    response = create_user(user)
    if response.success:
        return jsonify({"message": response.message})
    else:
        return jsonify({"error": response.message})
    
@app.post('/login')
def login():
    data = request.json
    email = data['email']
    password = data['password']
    response = verify_user(email, password)
    if response.success:
        access_token = create_access_token(identity=email)
        return jsonify({"message": response.message, "access_token": access_token})
    else:
        return jsonify({"error": response.message})

@app.post('/financialInsights')
def extract_news():
    # used to extract the news based on user preferences
    data = request.json
    preferences = data['preferences']
    news = News()
    news_data = news.get_everything(preferences)
    return jsonify(news_data)
    
@app.post('/faqHandler')
def faq_handler():
    # used to access the FAQ chatbot
    data = request.json
    user_query = data['user_query']
    chatbot = FAQChatBot()
    response = chatbot.get_financial_insight(user_query)
    return jsonify({"response": response})
    
@app.post('/triggerExcel')
def trigger_excel():
    # used to convert the excel file to json
    excel = ExcelHandler()
    data = excel.get_json()
    return jsonify(data)
        
if __name__ == '__main__':
    app.run(debug = True, port = 8080)