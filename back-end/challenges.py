from flask import Flask, request, jsonify, Blueprint
from pymongo import MongoClient
from config import MONGO_URI

app = Flask(__name__)
challenges_bp = Blueprint('challenges', __name__)

# Connect to MongoDB (Update the URI with your connection details)
client = MongoClient(MONGO_URI)
db = client['challenges_db']

# Define the challenges collection and ensure there's a unique index on user_id
challenges_collection = db['challenges']
# challenges_collection.create_index("user_id", unique=True)

@app.route('/add_user', methods=['POST'])
def add_user():
    """ Adds a new user with an empty list of achievements. """
    user_id = request.json.get('user_id')
    if not user_id:
        return jsonify({'status': 'error', 'message': 'user_id is required'}), 400

    try:
        challenges_collection.insert_one({
            "user_id": user_id,
            "achievements": []
        })
        return jsonify({'status': 'success', 'message': 'User added with empty achievements'}), 201
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/add_achievement/<user_id>', methods=['PUT'])
def add_achievement(user_id):
    """ Adds a new achievement to the user's list of achievements. """
    achievement = request.json.get('achievement')
    if not achievement:
        return jsonify({'status': 'error', 'message': 'Achievement data is required'}), 400

    try:
        result = challenges_collection.update_one(
            {"user_id": user_id},
            {"$push": {"achievements": achievement}}
        )
        if result.modified_count:
            return jsonify({'status': 'success', 'message': 'Achievement added'})
        else:
            return jsonify({'status': 'failure', 'message': 'User not found'}), 404
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)
