import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EnvService } from '../env.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private uri: string;
  private jwtService = new JwtHelperService();

  constructor(private http: HttpClient, private env: EnvService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    // console.log(`authentication.service BACKEND_URL:BACKEND_PORT ${env.BACKEND_URL}:${env.BACKEND_PORT}`);
    this.uri = `${env.BACKEND_URL}:${env.BACKEND_PORT}`;

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.uri}/users/authenticate`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // console.log(`authentication.service.login user: ${JSON.stringify(user)}`);
          const tokenInfo = this.jwtService.decodeToken(user.token); // decode token
          // console.log(`authentication.service.login tokenInfo: ${JSON.stringify(tokenInfo)}`);
          const expireDate = tokenInfo.exp; // get token expiration dateTime
          // console.log(`authentication.service.login tokenInfo.alt_jti: ${tokenInfo.alt_jti}`); // show decoded token object in console
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        // console.log('authentication.service.login: user =  ' + JSON.stringify(user));
        return user;
      }));
  }

  async refresh(_id: string) {
    // console.log(`authentication.service.refresh url: ${this.uri}/users/refresh/${_id}`);
    await this.http.get(`${this.uri}/users/refresh/${_id}`)
      .toPromise()
      .then(user => {
        // console.log(`authentication.service.refresh user: ${JSON.stringify(user)}`);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(null);
      })
      .catch(err => {
        // authentication.service.refresh err = ${err}`);
        throw new Error(`status: 404, statusText: err, url: authentication.service.refresh`);
      });
  }

  async logout() {
    // console.log(`authentication.service.logout `);
    // get currentUser from local storage, convert string to JSON object
    const user: User = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      return ' ';
    }

    // console.log(`authentication.service.logout user: ${user.username}`);
    const token = user.token;
    if (!token) {
      localStorage.removeItem('currentUser');
      return ' ';
    }

    const jwtService = new JwtHelperService();
    const tokenInfo = jwtService.decodeToken(user.token); // decode token
    // console.log(`authentication.service.logout tokenInfo: ${JSON.stringify(tokenInfo)}`);
    // console.log(`authentication.service.logout tokenInfo.alt_jti: ${tokenInfo.alt_jti}`);

    const logoutUrl = `${this.uri}/users/logout/${tokenInfo.alt_jti}`;
    // console.log(`authentication.service.logout get argument:${logoutUrl}`);

    // remove user from local storage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return await this.http.get(`${logoutUrl}`)
      .toPromise()
      .then(msg => {
        // console.log(`authentication.service.logout backend return msg: ${JSON.stringify(msg)}`);
      })
      .catch(err => {
        // console.log(`authentication.service.logout Error: ${JSON.stringify(err)}`);
      });
  }
}
