from flask import jsonify, request
from bson.objectid import ObjectId
from db_connection import db,users
from passlib.hash import pbkdf2_sha256
from bson import ObjectId

def create():
    print('create')
    return "Yo Yo yiiiiin"
    
    
def read(id):
    user = users.find_one({'_id' : ObjectId(id)})
    print('user',  user)
    user['_id'] = str(user['_id'])
    if user: 
        return jsonify(user)
    else:
        return jsonify({'error': 'Account not found'}), 404
    
    
def update(id):
    print('update') 
    email = request.json.get("email")
    city = request.json.get("city")
    
    #user = users.find_one({'email' : email})
    user = users.find_one({'_id' : ObjectId(id)})
    
    if user :
        filter = { "_id": ObjectId(id) }
        new_values = { "$set": { "city": city, "email": email } }
        users.update_one(filter, new_values)
        return jsonify({'success': 'updated successfully'}), 200
    
    return jsonify({'error' : 'error updating city'}), 404

def update_password():
    id = request.json.get('_id')
    request_password = request.json.get('new_password')
    new_password = pbkdf2_sha256.encrypt(request_password)
    password = { "$set" : {"password" : new_password }}
    user = users.find_one({'_id' : ObjectId(id)})
    print('user', user["_id"])
    filter = {"email" : user["email"]}
    if user:
        users.update_one(filter, password)
        return jsonify({'sucess': 'password updated'}),200
    
    return jsonify({'error' : 'error updating password'}),404

    
def delete():
    print('delete')
    email = request.json.get("email")
    password = request.json.get("password")
    
    user = users.find_one({"email" : email})
        
    if user and pbkdf2_sha256.verify(password, user['password']): 
        users.delete_one({"email" : email})
        return jsonify({"success" : "delete success"}),200
    
    return jsonify({"error" : "delete failed"}),400