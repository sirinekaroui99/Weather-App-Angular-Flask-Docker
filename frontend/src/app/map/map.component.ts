import { Component, OnInit} from '@angular/core';
import * as feather from 'feather-icons';
import {Map, marker, tileLayer} from 'leaflet';
import * as L from 'leaflet';
import  'leaflet-control-geocoder';
import {Geocoder, geocoder, geocoders} from 'leaflet-control-geocoder';
import { WeatherService } from '../weather/weather.service';
import { Weather } from '../weather/weather';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { ServiceUserService } from '../Services/service-user.service';
@Component({
  selector: 'app-root',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
  
})
export class MapComponent implements OnInit {
  username : any;
  email : any;
  city : any;
  Id : any;
  public temp :number;
  public firstDayWeathers : any;
  public dailyWeathers: any[] = [];
  public weathers:any[];
   public weather: Weather;
  weatherData: any;
  constructor(private weatherService: WeatherService,private toastr: ToastrService,private serviceuser : ServiceUserService, private router: Router){}
  ngOnInit(): void {
    const data = localStorage.getItem("myToken"); 
    const jsonObj = JSON.parse(data!);
      const token = jsonObj.access_token;
      const decodedToken : any = jwt_decode(token);
    this.Id = decodedToken.sub

    this.getuserbyid();
    feather.replace();
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
            let lon:number = position.coords.longitude;
            let lat:number = position.coords.latitude;
        this.getWeather(lon, lat);
        this.getWeatherdays(lon, lat);
      });
    }
     //setting map initial view
     var map = new Map('map').setView([36.8587351, 10.1882320], 10);
     let marker: L.Marker | null = null;
     //implement geocoder search
     new Geocoder({
         geocoder: new geocoders.Nominatim(),
         position: 'topleft', 
         
 
         }).addTo(map); 
         
     
   
 //end od goecoder implementation
 //creating layers
     var layer=  tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
           maxZoom: 17,
           attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       }).addTo(map);
 
 map.addLayer(layer);
 //adding markers
 
 map.on('click', (event: L.LeafletMouseEvent) => {
 if (marker !== null) {
   map.removeLayer(marker);
 }
 
 marker = L.marker([event.latlng.lat, event.latlng.lng]).addTo(map);
 //end of markers
 
 //get long and lat from marker
 (document.getElementById('latitude') as HTMLInputElement).value =
   event.latlng.lat.toString();
   console.log(event.latlng.lat);
 
  (document.getElementById('longitude') as HTMLInputElement).value =
   event.latlng.lng.toString();
   console.log(event.latlng.lng);
   this.getWeather(event.latlng.lng, event.latlng.lat);
   this.getWeatherdays(event.latlng.lng, event.latlng.lat);    
 });
  }
 

  public getWeather(lon:number,lat:number): void {
    this.weatherService.getWeather(lon,lat).subscribe(
      data => {
       
        this.weather = data;
this.temp=data.temperature;
        console.log(data);
        console.log(this.temp);
        if (this.temp>20){
          this.toastr.success('Notification', 'Chaleur Extreme!');
        } else if(this.temp<0){
          this.toastr.success('Notification', 'Froid Extreme!');
        }
       
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getWeatherdays(lon:number,lat:number): void {
    this.weatherService.getWeatherdays(lon, lat).subscribe(
      (data: any) => {
        this.weathers = data;
        
        // Extract daily weather data from API response
        this.dailyWeathers = Object.values(this.weathers).map((weathers: any[]) => {
          return {
            date: new Date(weathers[0].dt_txt),
            weathers: weathers
            
          };
        });
        console.log(this.dailyWeathers);
       
        const options = { timeZone: 'America/New_York', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
       // Get weather data for first day
       const firstDay = this.dailyWeathers[0];
       this.firstDayWeathers = firstDay.weathers.map((weather: any) => {
        const date = new Date(weather.dt_txt);
        return {
         
         formattedDate :date.toLocaleString('en-US', options as Intl.DateTimeFormatOptions),
          
           weather: weather
         };
       });
       console.log(this.firstDayWeathers);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public searchlocation(key: string): void {
    console.log(key);
    this.weatherService.getWeathercity(key).subscribe(
      data => {
        this.weather = data;
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  getuserbyid(){
    this.serviceuser.getUsertwithid(this.Id).subscribe(
    result => {
      let user : any = result
      this.username = user.username
      this.email = user.email
      this.city = user.city
      console.log('user', this.username)
    },
    errors => { console.log(errors); }
  )
  }
  
  logout() {
    // Supprimer le token du localStorage
    localStorage.removeItem('myToken');
    // Rediriger vers la page d'accueil
    this.router.navigate(['/signin']); // Remplacez '/accueil' par le chemin de votre landing page
  }

}
  
