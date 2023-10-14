
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SignupComponent } from './Public/signup/signup.component'; 
import { SigninComponent } from './Public/signin/signin.component'; 
import { SidebarComponent } from './Shared/sidebar/sidebar.component';
import { TopbarComponent } from './Shared/topbar/topbar.component';
import { UserprofileComponent } from './Private/userprofile/userprofile.component'; 
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ModalComponent } from './modal/modal.component';
import { WeatherdashboardComponent } from './weatherdashboard/weatherdashboard.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogOverviewExampleComponent } from './dialog-overview-example/dialog-overview-example.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MapComponent } from './map/map.component';
import { ForecastComponent } from './forecast/forecast.component';
import { LoggedComponent } from './logged/logged.component';
import { NotificationComponent } from './notification/notification.component';
import {
  ToastrModule,
  ToastNoAnimation,
  ToastNoAnimationModule} from 'ngx-toastr'; 

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    SidebarComponent,
    TopbarComponent,
    UserprofileComponent,
    ModalComponent,
    WeatherdashboardComponent,
    DialogOverviewExampleComponent,
    DialogBodyComponent,
    MapComponent,
    ForecastComponent,
    LoggedComponent,
    NotificationComponent
  
   
   
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    ToastNoAnimationModule. forRoot(),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
