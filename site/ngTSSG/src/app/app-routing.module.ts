import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VenueAddComponent } from './venue-add/venue-add.component';
import { VenueEditComponent } from './venue-edit/venue-edit.component';
import { VenueGetComponent } from './venue-get/venue-get.component';
import { MeetingAddComponent } from './meeting-add/meeting-add.component';
import { MeetingEditComponent } from './meeting-edit/meeting-edit.component';
import { MeetingGetComponent } from './meeting-get/meeting-get.component';
import { HomeComponent } from './user-home/home.component';
import { AdminComponent } from './user-admin/admin.component';
import { LoginComponent } from './user-login/login.component';
import { LogoutComponent } from './user-logout/logout.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserGetComponent } from './user-get/user-get.component';
import { UserEditComponent } from './user-edit/user-edit.component';
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
    path: 'meeting/schedule',
    component: MeetingGetComponent,
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
    path: 'user/admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'user/get',
    component: UserGetComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.User] }
  },
  {
    // the router id syntax (:name) will set the params variable name (params.name)
    path: 'user/admin/edit/:_id',
    component: UserEditComponent,
    canActivate: [AuthGuard],
    data: { type: 'admin', roles: [Role.Admin] }
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
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],   // tracing on for debugging
  exports: [RouterModule]
})

export class AppRoutingModule { }
