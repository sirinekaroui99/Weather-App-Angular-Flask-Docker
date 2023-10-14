from datetime import timedelta
from views import weatherdata, auth, crud
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
                               
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.config["JWT_SECRET_KEY"] = "WEATHER"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(seconds=2)
#initialize the jwt object, which is an instance of the JWTManager class.
jwt = JWTManager(app)

app.add_url_rule('/weather/<city>', view_func=weatherdata.get_weatherc,methods = ["GET"])
app.add_url_rule('/weather/<lat>/<lon>', view_func=weatherdata.get_weather,methods = ["GET"])
app.add_url_rule('/weathers/<lat>/<lon>', view_func=weatherdata.get_weather_latlon, methods = ["GET"])
app.add_url_rule('/consume', view_func=weatherdata.consume_message,methods = ["GET"])
app.add_url_rule('/signup', view_func=auth.data,methods = ["POST"])
app.add_url_rule('/token', view_func=auth.create_token,methods = ["POST"])
app.add_url_rule('/logout', view_func=auth.logout,methods = ["GET"])


app.add_url_rule('/create', view_func=crud.create, methods = ['POST'] )
app.add_url_rule('/read/<id>', view_func=crud.read, methods = ['GET'] )
app.add_url_rule('/update/<id>', view_func=crud.update, methods = ['PUT'] )
app.add_url_rule('/updatepassword', view_func=crud.update_password, methods = ['POST'] )
app.add_url_rule('/delete', view_func=crud.delete, methods = ['GET'] )
 
if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0")

