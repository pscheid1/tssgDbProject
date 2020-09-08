import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { User } from 'src/app/_models/user';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

const jwtHelper = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private jwtService = new JwtHelperService();
  public obserUser: Observable<User>;
  constructor(
    private router: Router,
    private as: AuthenticationService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // const cu = this.as.currentUserValue;
    // const cuToken = cu.token;

    // cannot use as.currentUserValue as it is cached. Get currentUser directly from local storage
    const user: User = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(`auth.guard.canActivate current user: ${JSON.stringify(user)}`);
    const token = user.token;
    // console.log(`auth.guard.canActivate current access token: ${token}`);

    // const userTokenInfo = this.jwtService.decodeToken(token);
    // const cuTokenInfo = this.jwtService.decodeToken(cu.token);
    // const currentTime = new Date().getTime() / 1000;
    // console.log(`\nauth.guard.canActivate currentTime: ${currentTime}`);
    // console.log(`auth.guard.canActivate user.token expiring time: ${userTokenInfo.exp}`);
    // console.log(`auth.guard.canActivate cu.token expiring time: ${cuTokenInfo.exp}\n`)

    // Check whether token is valid.  If expired, return false; otherwise continue
    if (jwtHelper.isTokenExpired(token)) {
      // access jwt expired, force a logout
      this.as.logout();
      alert('M001\nYour access JWT has expired.\nYou have been automatically logged out.\nPlease login again.');
      this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    // because token has not expired, we will refresh it. This is to provide a token
    // update with each successful authorization access which will renew the validity period.
    // console.log(`auth.guard.canActivate user: ${JSON.stringify(user)}`);
    const tokenInfo = this.jwtService.decodeToken(user.token);
    // console.log(`auth.guard.canActivate tokenInfo: ${JSON.stringify(tokenInfo)}`);
    let newUser: User;
    try {
      await this.as.refresh(`${tokenInfo.alt_jti}`);
      newUser = JSON.parse(localStorage.getItem('currentUser'));
      // console.log(`auth.guard.canActivate new token: ${newToken}`);
      // continue
    } catch (err) {
      // console.log(`auth.guard.canActivate as.refresh return err: ${err}`);
      this.as.logout();
      alert('M002\nYour refresh JWT has expired.\nYou have been automatically logged out.\nPlease login again.');
      this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url } })
      return false;
    }

    // check if route is restricted by role
    if (route.data.roles && route.data.roles.indexOf(newUser.role) === -1) {
      // console.log(`auth.guard.canActivate - Request not authorized.`);
      // role not authorised so redirect to home page
      this.router.navigate(['/user/notauthorized']);
      return false;
    }
    // authorised so return true
    // console.log(`auth.guard.canActivate - Request authorized.`);
    return true;
  }
}
