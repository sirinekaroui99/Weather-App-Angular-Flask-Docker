import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ServiceUserService } from '../Services/service-user.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss']
})
export class DialogBodyComponent implements OnInit {

  myForm: any; 
  Id : any

  constructor(private fb:FormBuilder , private userservice : ServiceUserService , private router : Router)
  { 

   let formconrols = {  
 
     email :new FormControl(), 
     password:new FormControl(),
     city:new FormControl() 

  } ;
  this.myForm= this.fb.group(formconrols)

  }
  ngOnInit(): void {
    const data = localStorage.getItem("myToken"); 
    const jsonObj = JSON.parse(data!);
      const token = jsonObj.access_token;
      const decodedToken : any = jwt_decode(token);
    this.Id = decodedToken.sub
  }

  UpdateUser()
  { 
    console.log(this.myForm.value)
    let data = this.myForm.value ; 
    console.log(data);
  
  
    this.userservice.updateUser(data,this.Id).subscribe(
     res=>{ console.log(res) ;
      this.router.navigateByUrl('/profile');
      
    }, 
    err=>{
      console.log(err) ; 
    }
    )
  }

}
