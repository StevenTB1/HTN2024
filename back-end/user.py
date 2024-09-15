from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)

# Connect to MongoDB (Update the URI with your connection details)
client = MongoClient('mongodb://localhost:27017/')
db = client['user_db']

# Define the user collection and ensure there's a unique index on user_id
user_collection = db['users']
user_collection.create_index("user_id", unique=True)

@app.route('/create_user', methods=['POST'])
def create_user():
    """ Creates a new user with provided details. """
    user_data = request.json
    try:
        # Ensures that the user_id is provided in the request
        if not user_data.get('user_id'):
            return jsonify({'status': 'error', 'message': 'user_id is required'}), 400
        
        result = user_collection.insert_one(user_data)
        return jsonify({'status': 'success', 'user_id': str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/get_user/<user_id>', methods=['GET'])
def get_user(user_id):
    """ Retrieves a user by user_id. """
    try:
        user = user_collection.find_one({"user_id": user_id})
        if user:
            user['_id'] = str(user['_id'])  # Convert ObjectId to string for JSON response
            return jsonify({'status': 'success', 'user': user}), 200
        else:
            return jsonify({'status': 'error', 'message': 'User not found'}), 404
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
