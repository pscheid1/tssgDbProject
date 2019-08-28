
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {

  error = '';
  user = new User();
  private uri: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.uri = environment.TSSGAPIURL + ':' + environment.TSSGAPIPORT + '/users';
  }

  private extractData(res: HttpResponse<User>) {
    const body = res;
    return body || {};
  }

  private handleErrorPromise(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        console.error('user.service.handleErrorPromise offline error: ' + error);
      } else {
        // Handle Http Error (error.status === 403, 404...)
        // alert('Http Error');
        HttpErrorResponse.toString();
        console.error('user.service.handleErrorPromise HttpErrorResponse: ' + HttpErrorResponse.toString());
      }
    } else {
      console.error('user.service.handleErrorPromise Error: ' + error);
      console.error('user.service.handleErrorPromise Error: name ' + error.name + ' - message ' + error.message);
    }

    return Promise.reject(error || error.message);
  }


  // private handleErrorPromise (error: HttpErrorResponse | any) {
  //   return Promise.reject(error.message || error);
  // }

  getAll() {
    return this.http.get<User[]>(`${this.uri}`);
  }

  getCurrent() {
    return this.http.get<User>(`${this.uri}/current`);
  }

  // request a list of current users - id, firstname, lastname only
  listUsers() {
    return this.http.get(`${this.uri}/list`);
  }

  getById(_id: string) {
    // console.log('user.service.getById: _id = ' + _id);
    return this.http.get(`${this.uri}/edit/` + _id);
  }

  async deleteUser(_id: string) {
    console.error('Meeting.service.ts - _id:' + _id);
    return await this.http.get(`${this.uri}/delete/${_id}`)
    // return await this.http.get(`${uri}/delete/5d0516139da64c4facd357fb`)
    .toPromise()
    .then(this.extractData)
    .catch (this.handleErrorPromise);
  }

  async registerUser(obj: User) {
    return await this.http.post(`${this.uri}/register/`, obj)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleErrorPromise);
  }

  async updateUser(obj: User) {
    return await this.http.post(`${this.uri}/update/`, obj)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleErrorPromise);
  }

}
