from flask import Flask, request, jsonify, Blueprint
from pymongo import MongoClient
from bson.objectid import ObjectId
from config import MONGO_URI

app = Flask(__name__)
routes_bp = Blueprint('routes', __name__)
client = MongoClient(MONGO_URI)
db = client['tasksdb']
tasks_collection = db['tasks']

# POST endpoint to create a new task
@app.route('/api/create-task/', methods=['POST'])
def create_task():
    data = request.get_json()
    input_value = data.get('inputValue')
    taskId = 1

    # Validate input
    if not input_value:
        return jsonify({'message': 'Task description is required'}), 400

    # Insert task into MongoDB
    task = {
        'Saving Goal': input_value,
        'taskID': taskId
    }

    result = tasks_collection.insert_one(task)

    # Send response with the created task ID
    return jsonify({'message': 'Task created', 'task_id': str(result.inserted_id)}), 201

# PUT endpoint to update an existing task
@app.route('/api/update-task/<taskId>/', methods=['PUT'])
def update_task(task_id):
    data = request.get_json()
    input_value = data.get('inputValue')

    # Validate input
    if not input_value:
        return jsonify({'message': 'Task description is required'}), 400

    # Update task in MongoDB
    result = tasks_collection.update_one(
        {'_id': ObjectId(task_id)},
        {'$set': {'description': input_value}}
    )

    # Check if the task was found and updated
    if result.matched_count == 0:
        return jsonify({'message': f'Task with ID {task_id} not found'}), 404
    return jsonify({'message': f'Task {task_id} updated to: {input_value}'}), 200

if __name__ == '__main__':
    app.run(debug=True)