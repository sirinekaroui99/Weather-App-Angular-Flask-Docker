from pymongo import MongoClient

client = MongoClient ( host ='database', port = 27017)
db = client.mydb
users = db['users']
weather_data = db['weather_data']