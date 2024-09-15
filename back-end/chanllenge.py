from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)

# Connect to MongoDB (Update the URI with your connection details)
client = MongoClient('mongodb://localhost:27017/')
db = client['challenges_db']

# Define the challenges collection and ensure there's a unique index on user_id
challenges_collection = db['Ochallenges']
challenges_collection.create_index("user_id", unique=True)

@app.route('/add_user', methods=['POST'])
def add_user():
    """ Adds a new user with an empty list of challenges. """
    user_id = request.json.get('user_id')
    if not user_id:
        return jsonify({'status': 'error', 'message': 'user_id is required'}), 400

    try:
        challenges_collection.insert_one({
            "user_id": user_id,
            "challenges": []
        })
        return jsonify({'status': 'success', 'message': 'User added with empty challenges'}), 201
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/add_challenge/<user_id>', methods=['PUT'])
def add_challenge(user_id):
    """ Adds a new challenge to the user's list of challenges. """
    challenge_data = request.json
    try:
        result = challenges_collection.update_one(
            {"user_id": user_id},
            {"$push": {"challenges": challenge_data}}
        )
        if result.modified_count:
            return jsonify({'status': 'success', 'message': 'Challenge added'})
        else:
            return jsonify({'status': 'failure', 'message': 'User not found'}), 404
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
