from flask import Flask
import http.client
from quickbooks import quickbooks_bp
from friend import friend_bp
from user import user_bp
from challenges import challenges_bp
from routes import routes_bp

app = Flask(__name__)

conn = http.client.HTTPSConnection("paywithpretendpointsapi.onrender.com")
payload = "{\n  \"email\": \"example@email.com\",\n  \"password\": \"*********\"\n}" #Insert credentials
headers = { 'Content-Type': "application/json" }
conn.request("POST", "/api/v1/auth", payload, headers)
res = conn.getresponse()
data = res.read()
rbc_token = data.decode("utf-8")

app.register_blueprint(quickbooks_bp)
app.register_blueprint(friend_bp)
app.register_blueprint(user_bp)
app.register_blueprint(challenges_bp)
app.register_blueprint(routes_bp)

# @app.route('/')
# def index():
#     return "Welcome to the Home Page!"


if __name__ == "__main__":
    app.run(debug=True)
