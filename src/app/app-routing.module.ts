import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VenueAddComponent } from './venue-add/venue-add.component';
import { VenueEditComponent } from './venue-edit/venue-edit.component';
import { VenueGetComponent } from './venue-get/venue-get.component';
import { MeetingAddComponent } from './meeting-add/meeting-add.component';
import { MeetingEditComponent } from './meeting-edit/meeting-edit.component';
import { MeetingGetComponent } from './meeting-get/meeting-get.component';
import { MeetingGetScheduleComponent } from './meeting-get-schedule/meeting-get-schedule.component';
import { HomeComponent } from './user-home/home.component';
import { UserGetAllComponent } from './user-get-all/user-get-all.component';
import { LoginComponent } from './user-login/login.component';
import { LogoutComponent } from './user-logout/logout.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserGetCurrComponent } from './user-get-curr/user-get-curr.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { TeamAddComponent } from './team-add/team-add.component';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { TeamGetComponent } from './team-get/team-get.component';

import { AuthGuard } from './_guards/auth.guard';
import { Role } from './_models/role';


const routes: Routes = [
  {
    path: 'venue/create',
    component: VenueAddComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    // the router id syntax (:name) will set the params variable name (params.name)
    path: 'venue/edit/:_id',
    component: VenueEditComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    // the router id syntax (:name) will set the params variable name (params.name)
    path: 'venue/delete/:id',
    component: VenueEditComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'venue',
    component: VenueGetComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'meeting/create',
    component: MeetingAddComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    // the router id syntax (:name) will set the params variable name (params.name)
    path: 'meeting/edit/:_id',
    component: MeetingEditComponent,
    canActivate: [AuthGuard],
    data: { type: 'edit', roles: [Role.Admin] }
  },
  {
    // the router id syntax (:name) will set the params variable name (params.name)
    path: 'meeting/delete/:_id',
    component: MeetingEditComponent,
    canActivate: [AuthGuard],
    data: { type: 'edit', roles: [Role.Admin] }
  },
  {
    path: 'meeting',
    component: MeetingGetComponent,
    canActivate: [AuthGuard],
    data: { type: 'edit', roles: [Role.Admin] }
  },
  {
    // the router id syntax (:name) will set the params variable name (params.name)
    path: 'meeting/schedule/:team',
    component: MeetingGetComponent,
    canActivate: [AuthGuard],
    data: { type: 'schedule', roles: [Role.Admin] }
  },
  {
    // the router id syntax (:name) will set the params variable name (params.name)
    path: 'meeting/get/schedule',
    component: MeetingGetScheduleComponent,
    canActivate: [AuthGuard],
    data: { type: 'schedule', roles: [Role.Admin] }
  },
  {
    // the router id syntax (:name) will set the params variable name (params.name)
    path: 'meeting/schedule/edit/:_id',
    component: MeetingEditComponent,
    canActivate: [AuthGuard],
    data: { type: 'schedule', roles: [Role.Admin] }
  },
  {
    // the router id syntax (:name) will set the params variable name (params.name)
    path: 'meeting/schedule/delete/:_id',
    component: MeetingEditComponent,
    canActivate: [AuthGuard],
    data: { type: 'schedule', roles: [Role.Admin] }
  },
  {
    path: 'team/create',
    component: TeamAddComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    // the router id syntax (:name) will set the params variable name (params.name)
    path: 'team/edit/:_id',
    component: TeamEditComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    // the router id syntax (:name) will set the params variable name (params.name)
    path: 'team/delete/:id',
    component: TeamEditComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'team',
    component: TeamGetComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },

  {
    path: 'user/login',
    component: LoginComponent
  },
  {
    path: 'user/logout',
    component: LogoutComponent,
  },
  {
    path: 'user/create',
    component: UserCreateComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
 {
    path: 'user/get-all',
    component: UserGetAllComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'user/get',
    component: UserGetCurrComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.User] }
  },
  {
    // the router id syntax (:name) will set the params variable name (params.name)
    path: 'user/get-all/edit/:_id',
    component: UserEditComponent,
    canActivate: [AuthGuard],
    data: { type: 'get-all', roles: [Role.Admin] }
  },
  {
    // the router id syntax (:name) will set the params variable name (params.name)
    path: 'user/get/edit/:_id',
    component: UserEditComponent,
    canActivate: [AuthGuard],
    data: { type: 'edit', roles: [Role.Admin, Role.User] }
  },
  {
    path: 'user/notauthorized',
    component: HomeComponent,
    data: { type: 'authDenied' }
  },
  {
    path: '',
    component: HomeComponent,
    data: { type: 'home'}
  },
  {
  // otherwise redirect to home
  path: '**', redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],   // for debugging, set enableTracing: true
  exports: [RouterModule]
})

export class AppRoutingModule { }
