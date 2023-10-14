import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceUserService } from 'src/app/Services/service-user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  myForm : FormGroup; 
  constructor(private fb:FormBuilder , private userservice : ServiceUserService , private router : Router) 
  {
    let formconrols = {  
      username : new FormControl(),
      email: new FormControl() ,
      password: new FormControl(), 
      city: new FormControl()
    }
      this.myForm= this.fb.group(formconrols)
    
   }

  ngOnInit(): void {
  }

  
  saveUser()
{ 
  console.log(this.myForm.value)
  let data = this.myForm.value ; 
  console.log(data);


  this.userservice.adduser(data).subscribe(
   res=>{ console.log(res) ;
    //this.toastr.success('Sucess');
    this.router.navigate(['/signin']) ; 
  }, 
  err=>{
    console.log(err) ; 
   // this.toastr.error('Mail Existant !')
  }
  )
}


}
