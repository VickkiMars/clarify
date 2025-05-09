from marshmallow import Schema, fields

class ClarifyRequestSchema(Schema):
    topic = fields.String(required=True)

class ClarifyResponseSchema(Schema):
    explanation = fields.String(required=True)
    result = fields.String(required=True)
    sources = fields.Mapping(required=True)