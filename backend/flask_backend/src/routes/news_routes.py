from flask import Blueprint, request, jsonify
from services.news import News

news_bp = Blueprint("news", __name__)

@news_bp.post("/financialInsights")
def extract_news():
    data = request.json
    preferences = data.get("preferences", [])
    news = News()
    news_data = news.get_everything(preferences)
    return jsonify(news_data)