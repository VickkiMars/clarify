from flask import Flask
from flask_cors import CORS
from backend.app.api.routes import api_bp
from backend.app.config import Config
from backend.app.extensions import cors

app = Flask(__name__)
app.config.from_object(Config)

cors.init_app(app)

app.register_blueprint(api_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)