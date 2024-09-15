from flask import Flask, request, jsonify
import http.client
from pymongo import MongoClient
from config import MONGO_URI
from flask_cors import CORS
from quickbooks import quickbooks_bp
from friend import friend_bp
from user import user_bp
from challenges import challenges_bp
from routes import routes_bp

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

conn = http.client.HTTPSConnection("paywithpretendpointsapi.onrender.com")
payload = "{\n  \"email\": \"example@email.com\",\n  \"password\": \"*********\"\n}"
headers = { 'Content-Type': "application/json" }
conn.request("POST", "/api/v1/auth", payload, headers)
res = conn.getresponse()
data = res.read()
rbc_token = data.decode("utf-8")

app = Flask(__name__)
client = MongoClient(MONGO_URI)
db = client['tasksdb']
tasks_collection = db['tasks']

@app.route('/')
def home():
    return "Welcome to the Home Page!"

app.register_blueprint(quickbooks_bp)
app.register_blueprint(friend_bp)
app.register_blueprint(user_bp)
app.register_blueprint(challenges_bp)
app.register_blueprint(routes_bp)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
