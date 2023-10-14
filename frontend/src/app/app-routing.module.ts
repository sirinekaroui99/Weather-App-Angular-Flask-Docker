import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './Public/signin/signin.component';
import { SignupComponent } from './Public/signup/signup.component';
import { TopbarComponent } from './Shared/topbar/topbar.component';
import { SidebarComponent } from './Shared/sidebar/sidebar.component';
import { UserprofileComponent } from './Private/userprofile/userprofile.component'; 
import { DialogOverviewExampleComponent } from './dialog-overview-example/dialog-overview-example.component';
import { ForecastComponent } from './forecast/forecast.component';
import { MapComponent } from './map/map.component';
import { LoggedComponent } from './logged/logged.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [ 
  {path : 'signin' , component : SigninComponent } , 
  {path : 'signup' , component : SignupComponent},
  {path : 'top' , component : TopbarComponent},
  {path : 'side' , component : SidebarComponent}, 
  {path : 'profile' , component : UserprofileComponent} , 
  {path : 'notif' , component : DialogOverviewExampleComponent}, 
  {path : 'map' , component : MapComponent} ,
  {path : 'forecast' , component : ForecastComponent} ,
  {path : 'logged' , component : LoggedComponent} ,
  {path : 'notification/:temp' , component : NotificationComponent} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
