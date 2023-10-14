import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ServiceUserService } from 'src/app/Services/service-user.service';
import { DialogBodyComponent } from 'src/app/dialog-body/dialog-body.component'; 
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  username : any;
  email : any;
  city : any;
  Id : any;

  constructor(private matDialog:MatDialog, private serviceuser : ServiceUserService, private router: Router){

  }
  openDialog(){
    this.matDialog.open(DialogBodyComponent,{
      width : '500px',
      height: '350px',
      position: {top: '-500px' , left : '320px'}
    })
  }

  ngOnInit(): void {
    const data = localStorage.getItem("myToken"); 
    const jsonObj = JSON.parse(data!);
      const token = jsonObj.access_token;
      const decodedToken : any = jwt_decode(token);
    this.Id = decodedToken.sub

    this.getuserbyid();

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
