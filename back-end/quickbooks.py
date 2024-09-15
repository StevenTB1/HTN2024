from flask import Flask, request, redirect, url_for, session, jsonify, Blueprint
import requests
import json
import os
import uuid
from flask_cors import CORS

app = Flask(__name__)
quickbooks_bp = Blueprint('quickbooks', __name__)

app.secret_key = os.urandom(24)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})

@app.route('/')
def home():
    return 'WELCOME TO QuickBooks OAuth 2.0 integration'

@app.route('/login')
def login():
    state = str(uuid.uuid4())
    session['oauth_state'] = state
    print("Session in /login:", dict(session))
    authorization_url = (f"{AUTHORIZATION_BASE_URL}?"
                            f"response_type=code&"
                            f"scope={SCOPE}&"
                            f"client_id={CLIENT_ID}&"
                            f"redirect_uri={REDIRECT_URI}&"
                            f"state={state}")
    return redirect(authorization_url)

@app.route('/callback')
def callback():
    code = request.args.get('code')
    if not code:
        return "Error: No code received"
    
    token_response = exchange_code_for_token(code)
    if token_response:
        session['access_token'] = token_response['access_token']
        session['refresh_token'] = token_response.get('refresh_token', '')
        return redirect(f'http://localhost:3000/pages/welcome?success=true')
    else:
        return "Error: Unable to fetch token"

def exchange_code_for_token(code):
    response = requests.post(TOKEN_URL,
                             headers={
                                 'Content-Type': 'application/x-www-form-urlencoded'
                             },
                             auth=(CLIENT_ID, CLIENT_SECRET),
                             data={
                                 'grant_type': 'authorization_code',
                                 'code': code,
                                 'redirect_uri': REDIRECT_URI
                             })
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        return None
    
@app.route('/check-session')
def check_session():
    print("Session in /check-session:", dict(session))
    if 'access_token' in session:
        return jsonify({"status": "authenticated"}), 200
    else:
        return jsonify({"status": "unauthenticated"}), 401
    
@app.route('/logout')
def logout():
    session.pop('access_token', None)  
    session.pop('refresh_token', None)
    session.clear() 
    return jsonify({"status": "success", "message": "Logged out successfully"}), 200


@app.route('/fetch_expenses')
def fetch_expenses():
    if 'access_token' not in session:
        return redirect(url_for('login'))

    access_token = session['access_token']
    expenses = get_expenses(access_token)
    
    return json.dumps(expenses, indent=2)

def get_expenses(access_token):
    endpoint = 'https://sandbox-quickbooks.api.intuit.com/v3/company/YOUR_COMPANY_ID/query'
    query = 'SELECT * FROM Purchase WHERE AccountRef.Name = \'Expense\''
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    response = requests.post(endpoint, headers=headers, json={'query': query})
    if response.status_code == 200:
        return response.json()
    else:
        print(f'Error: {response.status_code}')
        print(response.text)
        return None

@app.route('/refresh_token')
def refresh_token():
    if 'refresh_token' not in session:
        return redirect(url_for('login'))

    refresh_token = session['refresh_token']
    response = requests.post(TOKEN_URL,
                             headers={
                                 'Content-Type': 'application/x-www-form-urlencoded'
                             },
                             auth=(CLIENT_ID, CLIENT_SECRET),
                             data={
                                 'grant_type': 'refresh_token',
                                 'refresh_token': refresh_token
                             })
    
    if response.status_code == 200:
        token_data = response.json()
        session['access_token'] = token_data['access_token']
        return redirect(url_for('fetch_expenses'))
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        return "Error: Unable to refresh token"
    
@app.route('/add_expense', methods=['POST'])
def add_expense():
    if 'access_token' not in session:
        return redirect(url_for('login'))
    
    expense_data = request.json
    if not expense_data:
        return "Error: NO expense data provided", 400
    
    access_token = session['access_token']
    response = create_expense(access_token, expense_data)

    if response.status_code == 200:
        return json.dumps(response.json(), indent=2)
    else:
        return f"Error: {response.status_code} - {response.text}", response.status_code
    
def create_expense(access_token, expense_data):
    endpoint = 'https://sandbox-quickbooks.api.intuit.com/v3/company/YOUR_COMPANY_ID/vendor'
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    
    response = requests.post(endpoint, headers=headers, json=expense_data)
    return response

if __name__ == '__main__':
    app.run(debug=True, port=5000)