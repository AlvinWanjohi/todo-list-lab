from flask import Flask, request, make_response
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, Newsletter
from config import config
import os

# Initialize Flask app
app = Flask(__name__)

# Get the current environment (default: development)
env = os.getenv("FLASK_ENV", "development")
app.config.from_object(config[env])

# Initialize database and migration
db.init_app(app)
migrate = Migrate(app, db)

# Initialize Flask-RESTful API
api = Api(app)

# Home Route
class Home(Resource):
    def get(self):
        return make_response({"message": "Welcome to the Newsletter RESTful API"}, 200)

# Get all newsletters
class Newsletters(Resource):
    def get(self):
        newsletters = [n.to_dict() for n in Newsletter.query.all()]
        return make_response(newsletters, 200)

    def post(self):
        data = request.get_json()
        if not data or not data.get("title") or not data.get("body"):
            return make_response({"error": "Title and body are required"}, 400)

        new_record = Newsletter(title=data["title"], body=data["body"])
        db.session.add(new_record)
        db.session.commit()
        return make_response(new_record.to_dict(), 201)

# Get a single newsletter by ID
class NewsletterByID(Resource):
    def get(self, id):
        newsletter = Newsletter.query.get(id)
        if not newsletter:
            return make_response({"error": "Newsletter not found"}, 404)
        return make_response(newsletter.to_dict(), 200)

# Register API resources
api.add_resource(Home, '/')
api.add_resource(Newsletters, '/newsletters')
api.add_resource(NewsletterByID, '/newsletters/<int:id>')

# Run the app
if __name__ == '__main__':
    app.run(port=5000, debug=app.config["DEBUG"])
