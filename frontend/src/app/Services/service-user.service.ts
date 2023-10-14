import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ServiceUserService {

  private myuser:User = new User();
  constructor(private http:HttpClient,private router : Router) { } 

  adduser(user: any) {

    return this.http.post(`http://localhost:5000/signup`,user)
  } 
  
  loginuser(user:any){
    return this.http.post(`http://localhost:5000/token`,user)
  } 
  getUsertwithid (id :any) { 
    return this.http.get(`http://localhost:5000/read/`+id)
  } 
  updateUser(user : User, id : any){ 
    return this.http.put(`http://localhost:5000/update/`+id,user)
  }
  isLoggedIn() { 

    const data = localStorage.getItem("myToken"); 
    const jsonObj = JSON.parse(data!);
      console.log('ddddd',jsonObj.ID)
      const token = jsonObj.access_token;
      const decodedToken : any = jwt_decode(token);
    console.log(decodedToken.sub);
    if (token) { 
      return true; }
    else { return false; }
}




}
