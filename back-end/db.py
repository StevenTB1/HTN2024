from flask import Flask
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)

# Connect to MongoDB (Update the URI with your connection details)
client = MongoClient('mongodb+srv://htn:htn@htn2024.mabwh.mongodb.net')
db = client['friends_db']

# Ensure the collection has the desired schema with a unique index on user_id
friends_collection = db['friends']
friends_collection.create_index("user_id", unique=True)



@app.route('/add_user/<user_id>', methods=['POST'])
# def add_user(user_id):
    # """ Adds a new user with no friends initially. """
    # try:
    #     result = friends_collection.insert_one({
    #         "user_id": user_id,
    #         "friends": []
    #     })
    #     return {'status': 'success', 'id': str(result.inserted_id)}
    # except Exception as e:
    #     return {'status': 'error', 'message': str(e)}

@app.route('/add_friend/<user_id>/<friend_id>', methods=['PUT'])
def add_friend(user_id, friend_id):
    try:
        result = friends_collection.insert_one({
            "user_id": user_id,
            "friends": []
        })
        return {'status': 'success', 'id': str(result.inserted_id)}
    except Exception as e:
        return {'status': 'error', 'message': str(e)}
    
    """ Adds a friend to the user's friend list. """
    try:
        result = friends_collection.update_one(
            {"user_id": user_id},
            {"$addToSet": {"friends": friend_id}}  # Use $addToSet to avoid duplicates
        )
        if result.modified_count:
            return {'status': 'success', 'message': 'Friend added'}
        else:
            return {'status': 'failure', 'message': 'User not found or friend already added'}
    except Exception as e:
        return {'status': 'error', 'message': str(e)}

if __name__ == '__main__':
    app.run(debug=True)
