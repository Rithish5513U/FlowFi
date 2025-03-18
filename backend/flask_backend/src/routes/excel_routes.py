from flask import Blueprint, jsonify
from services.excelhandler import ExcelHandler

excel_bp = Blueprint("excel", __name__)

@excel_bp.post("/triggerExcel")
def trigger_excel():
    excel = ExcelHandler()
    data = excel.get_json()
    return jsonify(data)