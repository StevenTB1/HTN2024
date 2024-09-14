from flask import Flask
# from flask import PyMongo
from pymongo.mongo_client import MongoClient
import http.client

app = Flask(__name__)

uri = "mongodb+srv://htn:htn@htn2024.mabwh.mongodb.net"
client = MongoClient(uri)
db = client['UserData']
collection = db['Person']

conn = http.client.HTTPSConnection("paywithpretendpointsapi.onrender.com")
payload = "{\n  \"email\": \"example@email.com\",\n  \"password\": \"*********\"\n}" #Insert credentials
headers = { 'Content-Type': "application/json" }
conn.request("POST", "/api/v1/auth", payload, headers)
res = conn.getresponse()
data = res.read()
rbc_token = data.decode("utf-8")

@app.route('/')
def index():
    return "Runa"


# @app.router('/update-progress/<int:id>', methods=['POST'])
# def update_task(id):
#     return

def create_rbc_memeber(name : str, address : str, phone : str, email : str, balance : str = 0):
    headers = {
        'Content-Type': "application/json",
        'Authorization': "Bearer YOUR_SECRET_TOKEN"
    }

    payload = "{\n  \"name\": \""+name+"\",\n  \"address\": \""+address+"\",\n  \"phone\": \""+phone+"\",\n  \"email\": \""+email+"\",\n  \"balance\": "+balance+"\n}"

    conn.request("POST", "/api/v1/loyalty/members", payload, headers)

    return

if __name__ == "__main__":
    app.run(debug=True)
    # app.run()