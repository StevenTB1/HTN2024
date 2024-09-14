import pymongo
from pymongo import MongoClient

# Replace the following with your MongoDB Atlas connection string
# Be sure to replace <username> and <password> with your actual username and password
uri = "mongodb+srv://htn:htn@htn2024.mabwh.mongodb.net"

# Create a connection to the cluster
client = MongoClient(uri)

# Select the database you want to use (if it doesn't exist, MongoDB will create it for you)
db = client['myDatabase']

# Select a collection (if it doesn't exist, MongoDB will create it for you)
collection = db['myCollection']

# Insert a sample document
sample_data = {"name": "John Doe", "email": "johndoe@example.com"}
collection.insert_one(sample_data)

# Query the document you just inserted
result = collection.find_one({"name": "John Doe"})
print(result)
