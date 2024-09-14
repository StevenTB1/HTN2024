from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['POST'])
def handle_data():
    data = request.json
    name = data.get('name', 'Guest')
    return jsonify({'message': f'Hello, {name}'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)