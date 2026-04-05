from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["farmy"]

# Collections
users_collection = db["users"]
crops_collection = db["crops"]
expenses_collection = db["expenses"]
predictions_collection = db["predictions"]
products_collection = db["products"]
orders_collection = db["orders"]