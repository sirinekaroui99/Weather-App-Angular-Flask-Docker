import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as feather from 'feather-icons';
//import {Map, marker, tileLayer} from 'leaflet';
import * as L from 'leaflet';
import  'leaflet-control-geocoder';
import {Geocoder, geocoder, geocoders} from 'leaflet-control-geocoder';
const apikey:string = "53031dbaeeed7c204302450a0b03ad97";
import {Map, marker, tileLayer} from 'leaflet';

import { WeatherService } from '../weather/weather.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Weather } from '../weather/weather';

@Component({
  selector: 'app-root',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
  
})
export class ForecastComponent implements OnInit{
public firstDayWeathers : any;
  public dailyWeathers: any[] = [];
 public weathers:any[];
  public weather: Weather;
  constructor(private weatherService: WeatherService){}
  ngOnInit(): void {
    feather.replace();
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
            let lon:number = position.coords.longitude;
            let lat:number = position.coords.latitude;
        this.getWeather(lon, lat);
         this.getWeatherdays(lon, lat);

      });
    }
  }
 

  public getWeather(lon:number,lat:number): void {
    this.weatherService.getWeather(lon,lat).subscribe(
      data => {
        this.weather = data;
        console.log(data);
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
 

}
  

