import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthenticationService } from './_services/authentication.service';
import { MeetingService } from './_services/meeting.service';
import { TeamService } from './_services/team.service';
import { UserService } from './_services/user.service';
import { VenueService } from './_services/venue.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetingAddComponent } from './meeting-add/meeting-add.component';
import { MeetingEditComponent } from './meeting-edit/meeting-edit.component';
import { MeetingGetComponent } from './meeting-get/meeting-get.component';
import { VenueAddComponent } from './venue-add/venue-add.component';
import { VenueGetComponent } from './venue-get/venue-get.component';
import { VenueEditComponent } from './venue-edit/venue-edit.component';
import { FormsModule } from '@angular/forms';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { TssgErrorHandler } from './_helpers/tssg.error.handler';
import { HomeComponent } from './user-home/home.component';
import { UserGetAllComponent } from './user-get-all/user-get-all.component';
import { LoginComponent } from './user-login/login.component';
import { LogoutComponent } from './user-logout/logout.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserGetCurrComponent } from './user-get-curr/user-get-curr.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { TeamAddComponent } from './team-add/team-add.component';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { TeamGetComponent } from './team-get/team-get.component';
import { MeetingGetScheduleComponent } from './meeting-get-schedule/meeting-get-schedule.component';

import { APP_BASE_HREF } from '@angular/common';

import { EnvServiceProvider } from './env.service.provider';

@NgModule({
  declarations: [
    AppComponent,
    MeetingAddComponent,
    MeetingEditComponent,
    MeetingGetComponent,
    VenueAddComponent,
    VenueGetComponent,
    VenueEditComponent,
    HomeComponent,
    UserGetAllComponent,
    LoginComponent,
    LogoutComponent,
    UserCreateComponent,
    UserGetCurrComponent,
    UserEditComponent,
    NavbarComponent,
    TeamAddComponent,
    TeamEditComponent,
    TeamGetComponent,
    MeetingGetScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    EnvServiceProvider,
    AuthenticationService,
    MeetingService,
    TeamService,
    UserService,
    VenueService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: TssgErrorHandler },
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
