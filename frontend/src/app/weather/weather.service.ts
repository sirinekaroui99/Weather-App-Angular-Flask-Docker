import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weather } from './weather';


@Injectable({providedIn: 'root'})
export class WeatherService {

  

  constructor(private http:HttpClient) { } 

  public getWeather(lon:number,lat:number): Observable<Weather> {

    const url = `http://localhost:5000/weather/${lat}/${lon}`;
    return this.http.get<Weather>(url);
  }
  public getWeatherdays(lon:number,lat:number) {

    const url = `http://localhost:5000/weathers/${lat}/${lon}`;
    return this.http.get(url);
  }
  public getWeathercity(city:string): Observable<Weather> {

    const url = `http://localhost:5000/weather/${city}`;
    return this.http.get<Weather>(url);
  }

}