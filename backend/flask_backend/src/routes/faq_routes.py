from flask import Blueprint, request, jsonify
from services.faq_chatbot import FAQChatBot

faq_bp = Blueprint("faq", __name__)

@faq_bp.post("/faqHandler")
def faq_handler():
    data = request.json
    user_query = data.get("user_query", "")
    chatbot = FAQChatBot()
    response = chatbot.get_financial_insight(user_query)
    return jsonify({"response": response})