from flask import request, jsonify
from . import api_bp
from ..logic.explanation_generator import generate_explanation
from .schemas import ClarifyRequestSchema, ClarifyResponseSchema
from marshmallow import ValidationError

clarify_request_schema = ClarifyRequestSchema()
clarify_response_schema = ClarifyResponseSchema()

@api_bp.route('/clarify', methods=['POST'])
def clarify_topic():
    try:
        data = clarify_request_schema.load(request.get_json())
        topic = data['topic']
        explanation, terms, sources = generate_explanation(topic)
        result = clarify_response_schema.dump({'explanation':explanation, 'terms':f"\n{terms}", 'sources':{sources}})
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500