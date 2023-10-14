import json
import math
import requests
import numpy as np
import time
from datetime import datetime
from flask import jsonify, request
from db_connection import weather_data
# from kafka import KafkaConsumer
# from kafka import KafkaProducer
from .kafka_tools import data_reader,data_maker


#Le nom du topic kafka
topic = 'topic1'


#==============================
#          Old version
#==============================
# Create a Kafka consumer instance
# consumer = KafkaConsumer(topic, bootstrap_servers='localhost:9092')

#api générer dans le site openweatherAPI
user_api = '53031dbaeeed7c204302450a0b03ad97' 



def send_to_kafka(weather_data):
    # Create a Kafka producer instance
        # producer = KafkaProducer(bootstrap_servers='localhost:9092')
        #weather_data est un objet dictionnaire
        #pour encoder(serialisé) un objet dict il faut le convertir en chaine de caractére
        #json.dumps() converti un dict en chaine de caractere JSON
        data_serialized = json.dumps(weather_data).encode('utf-8')
        #envoyer les données au topic
        # producer.send(topic, data_serialized)
        data_maker(data_serialized)
        
def get_weather_latlon(lat,lon) : 
    print("lat", lat, "lon", lon)
 
    #api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}
    weather_url = f'http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={user_api}'
    #récupérer les donnée de l'api
    api_link = requests.get(weather_url)
    #conversion des donnée en chaine JSON
    api_data = api_link.json()
    
    response = requests.get(weather_url)

    if response.status_code == 200:
        data = response.json()
        for forecast in data['list']:
            print(forecast['dt_txt'], forecast['main']['temp'], forecast['weather'][0]['description'])
            
    else:
        print(f"Erreur : {response.status_code} - {response.reason}")
    temp_list = [ "03","06","09","12","15","18","21" ]
    day_list = {}
    
    # Diviser la liste en 5 sous-listes
    sub_lists = np.array_split(data['list'], 5)
    
    # Afficher les sous-listes
    for j, sub_list in enumerate(sub_lists):
        data_list = []
        # Boucle à travers chaque élément de la sous-liste
        for i in range(len(sub_list)):
            data_dict = {
                'dt_txt': sub_list[i]['dt_txt'],
                'main': {
                    'temp': math.floor(sub_list[i]['main']['temp']- 273.15),
                    'temp_min': sub_list[i]['main']['temp_min']- 273.15,
                    'temp_max': sub_list[i]['main']['temp_max']- 273.15
                },
                'weather': {
                    'description': sub_list[i]['weather'][0]['description'],
                    'humidity' : sub_list[i]['main']['humidity'],
                    'pressure' : sub_list[i]['main']['pressure'],
                }
            }
            # Ajouter le dictionnaire de données à la liste de données
            data_list.append(data_dict)
        
        # Ajouter la liste de données à la journée correspondante dans le dictionnaire jour
        day_list['day_' + str(j+1)] = data_list

    print(day_list)
        
    
    send_to_kafka(day_list)
    return jsonify(day_list)


def get_weather(lat,lon):

    #https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    #weather_url = f'http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={user_api}'
    weather_url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={user_api}'
    #récupérer les donnée de l'api
    api_link = requests.get(weather_url)
    #conversion des donnée en chaine JSON
    api_data = api_link.json()
    
    print(api_data)
    
    city = api_data['name']
     #create variables to store and display data
    temp_city = math.floor((api_data['main']['temp']) - 273.15)
    #temerature en fahrenheit on l'a convertit en C°
    temp_city_min = math.floor((api_data['main']['temp_min']) - 273.15)
    temp_city_max = math.floor((api_data['main']['temp_max']) - 273.15)
    weather_desc = api_data['weather'][0]['description']
    #la valeur de l'humidité se trouve dans le key 'humidity' qui est de sa part dans le key 'main'
    hmdt = api_data['main']['humidity']
    pressure = api_data['main']['pressure']
    wind_spd = api_data['wind']['speed']
    date_time = datetime.now().strftime("%d %b %Y | %I:%M:%S %p")
    # Temps (nombre de secondes écoulées )
    sunrise = api_data['sys']['sunrise']

    # Conversion en temps lisible
    gmt_sunrise_time = time.gmtime(sunrise)
    
    # Formatage du temps en chaîne GMT
    gmt_sunrise_time_str = time.strftime("%a, %d %b %Y %H:%M:%S GMT", gmt_sunrise_time)

    sunset = api_data['sys']['sunset']
    gmt_sunset_time = time.gmtime(sunset)
    gmt_sunset_time_str = time.strftime("%a, %d %b %Y %H:%M:%S GMT",gmt_sunset_time)

    #écrire les données sous la forme d'un dict
    data = {
        "city" : city,
        "temperature" : temp_city, 
        "temperature_minimale" : temp_city_min,
        "temperature_maximale" : temp_city_max,
        "weather_desc" : weather_desc,
        "Humidity" : hmdt,
        "pressure" : pressure,
        "wind_speed" : wind_spd ,
        "date_time" : date_time,
        "sunrise_time" : gmt_sunrise_time_str,
        "sunset_time" : gmt_sunset_time_str
    }

    
    send_to_kafka(data)
    return jsonify(data)

def get_weatherc(city):
    weather_url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+user_api
    #récupérer les donnée de l'api
    api_link = requests.get(weather_url)
    #conversion des donnée en chaine JSON
    api_data = api_link.json()
    
    
     #create variables to store and display data
    temp_city = math.floor((api_data['main']['temp']) - 273.15)
    #temerature en fahrenheit on l'a convertit en C°
    temp_city_min = math.floor((api_data['main']['temp_min'])-273.15)
    temp_city_max = math.floor((api_data['main']['temp_max'])-273.15)
    weather_desc = api_data['weather'][0]['description']
    #la valeur de l'humidité se trouve dans le key 'humidity' qui est de sa part dans le key 'main'
    hmdt = api_data['main']['humidity']
    pressure = api_data['main']['pressure']
    wind_spd = api_data['wind']['speed']
    date_time = datetime.now().strftime("%d %b %Y | %I:%M:%S %p")
    # Temps (nombre de secondes écoulées )
    sunrise = api_data['sys']['sunrise']

    # Conversion en temps lisible
    gmt_sunrise_time = time.gmtime(sunrise)
    
    # Formatage du temps en chaîne GMT
    gmt_sunrise_time_str = time.strftime("%a, %d %b %Y %H:%M:%S GMT", gmt_sunrise_time)

    sunset = api_data['sys']['sunset']
    gmt_sunset_time = time.gmtime(sunset)
    gmt_sunset_time_str = time.strftime("%a, %d %b %Y %H:%M:%S GMT",gmt_sunset_time)

    #écrire les données sous la forme d'un dict
    data = {
        "city" : city,
        "temperature" : temp_city, 
        "temperature_minimale" : temp_city_min,
        "temperature_maximale" : temp_city_max,
        "weather_desc" : weather_desc,
        "Humidity" : hmdt,
        "pressure" : pressure,
        "wind_speed" : wind_spd ,
        "date_time" : date_time,
        "sunrise_time" : gmt_sunrise_time_str,
        "sunset_time" : gmt_sunset_time_str
    }

    
    send_to_kafka(data)
    return jsonify(data)


def consume_message():
    def action(data):
        weather_data.insert_one({"message": data})
        return jsonify({"sucess": "data saved in data base!"}),200
    # Consume the next message from the 'my-topic' topic 
    data_reader(action)
    # for msg in consumer:
    #     data = msg.value.decode()
    #     # Insert the message into MongoDB
        
            
    
