import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/_models/user';
import { Role } from 'src/app/_models/role';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private jwtService = new JwtHelperService();
  public isLoggedIn: boolean;
  public isRoleAdmin: boolean;

  constructor() {
    // cannot use as.currentUserValue as it is cached. Get currentUser directly from local storage
    const user: User = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      // console.log(`navbar.service.ts current user: ${JSON.stringify(user)}`);
      const token = user.token;
      if (token && !this.jwtService.isTokenExpired(token)) {
        // console.log(`navbar.service.ts current access token: ${token}`);
        this.isLoggedIn = true;
        // console.log(`navbar.service.ts user.role: ${user.role}`);
        this.isRoleAdmin = (user.role === Role.Admin) ? Boolean(true) : Boolean(false);
      } else {
        // console.log(`navbar.service.ts - no token or jwt expired.`);
        this.isLoggedIn = false;
        this.isRoleAdmin = false;
      }
    } else {
      // console.log(`navbar.service.ts - user not logged in.`);
      this.isLoggedIn = false;
      this.isRoleAdmin = false;
    }
      // console.log(`navbar.service.ts.constructor isLoggedIn: ${Boolean(this.isLoggedIn)}`);
      // console.log(`navbar.service.ts.constructor isRoleAdmin: ${Boolean(this.isRoleAdmin)}`);
  }

  updateNavAfterAuth(role: string): void {
    // .toLowerCase() will fail if role is null
    if (role === null) { role = ' '; }
    // console.log(`navbar.service.ts.updateNavAfterAuth - role: ${role}`)
    if (role.toLowerCase() === 'admin') {
      this.isRoleAdmin = Boolean(true);
      this.isLoggedIn = Boolean(true);
    } else if (role.toLowerCase() === 'user') {
      this.isRoleAdmin = Boolean(false);
      this.isLoggedIn = Boolean(true);
    }
    else {
      this.isRoleAdmin = Boolean(false);
      this.isLoggedIn = Boolean(false);
    }
  }

}
