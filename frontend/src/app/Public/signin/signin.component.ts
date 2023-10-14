
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceUserService } from 'src/app/Services/service-user.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  myForm: any; 
  token: any;
  Id: any;
  result : any;
  constructor(private fb:FormBuilder , private userservice : ServiceUserService , private router : Router)
   { 

    let formconrols = {  
  
      email :new FormControl(), 
      password:new FormControl() 

   } ;
   this.myForm= this.fb.group(formconrols)


   }

  ngOnInit(): void { 
    
    
       let loggedIn= this.userservice.isLoggedIn() ; 
       if (loggedIn){ 
        //this.router.navigate(['/profile'])
       }
     
  }
  loginUser()
  { 
  
    let data = this.myForm.value ; 
    
    this.userservice.loginuser(data).subscribe(
     res=>{ 
      console.log(res) ;
      this.result = res
      console.log('result',this.result)
      const data = JSON.stringify(this.result);
      const jsonObj = JSON.parse(data);
      console.log('ddddd',jsonObj.ID)
      this.token = jsonObj.access_token;
       localStorage.setItem("myToken", data);
       this.router.navigate(['/profile'])
    }, 
    err=>{
      console.log(err.error.Error) ; 
    //  this.toastr.error("error")
    }
    ) 
    
  }

}
