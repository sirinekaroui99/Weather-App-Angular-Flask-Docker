from datetime import timedelta
import datetime
from flask import jsonify, request
from passlib.hash import pbkdf2_sha256
from db_connection import db

from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

def data():
    
    # POST a data to database
    #if request.method == 'POST':
    body = request.json
    print(body)
    username = body['username'] 
    email = body['email']
    password = body['password']
    city = body['city'] 
      
    password = pbkdf2_sha256.encrypt(password)
    print(password)
        # db.users.insert_one({
        # Check for existing email address
    if db.users.find_one({ "email": email }):
        return jsonify({ "error": "Email address already in use" }), 400 
    
    if db['users'].insert_one({
            "username": username,
            "email": email,
            "password":password,
            "city":city 
        }) : 
        return jsonify({"success" : "Signup succeed"}), 200
    
    return jsonify({ "error": "Signup failed" }), 400




def refresh_expiring_jwts(response):
    try:
        #get_jwt() returns a dictionary containing the data from the JWT access token sent in the current request.
        #expt represents the expiration time of the JWT access token
        exp_timestamp = get_jwt()["exp"] #This value is used later in the code to check if the token is about to expire and to refresh it if necessary.
        now = datetime.now(datetime.timezone.utc)
        target_timestamp = datetime.timestamp(now + datetime.timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    print('email',email)
    user = db.users.find_one({"email" : email})
    print('user',user)
    if user == None :
        return jsonify({"error" : "email does not exist"})
    
    if user and pbkdf2_sha256.verify(password, user['password']): 
        user['_id'] = str(user['_id'])
        access_token = create_access_token(identity=user['_id'])
        response = {"access_token":access_token}
        return response
    return jsonify({"error" : "Can't login password incorrect"})


def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response
