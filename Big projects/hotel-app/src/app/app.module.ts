import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { BookingComponent } from './booking/booking.component';
import { CurrentBookingComponent } from './booking/current-booking/current-booking.component';
import { NewBookingComponent } from './booking/new-booking/new-booking.component';
import { PastBookingsComponent } from './booking/past-bookings/past-bookings.component';
import { StopBookingComponent } from './booking/current-booking/stop-booking.component';
import { environment } from './environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    WelcomeComponent,
    SignupComponent,
    LoginComponent,
    BookingComponent,
    CurrentBookingComponent,
    NewBookingComponent,
    PastBookingsComponent,
    StopBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [StopBookingComponent]
})
export class AppModule { }
