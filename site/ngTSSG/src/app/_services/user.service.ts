
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';


const uri = 'http://localhost:7010/users';

@Injectable({ providedIn: 'root' })
export class UserService {

  error = '';
  user = new User();
  // returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {

  }

  private extractData(res: HttpResponse<User>) {
    const body = res;
    return body || {};
  }

  private handleErrorPromise (error: HttpErrorResponse | any) {
    return Promise.reject(error.message || error);
  }

  getAll() {
    return this.http.get<User[]>(`${uri}`);
  }

  getCurrent() {
    return this.http.get<User>(`${uri}/current`);
  }

  getById(_id: string) {
    console.log('user.service.getById: _id = ' + _id);
    return this.http.get(`${uri}/edit/` + _id);
  }

  async deleteUser(_id: string) {
    return await this.http.get(`${uri}/delete/${_id}`)
    // return await this.http.get(`${uri}/delete/5d0516139da64c4facd357fb`)
    .toPromise()
    .then(this.extractData)
    .catch (this.handleErrorPromise);
  }

  async registerUser(obj: User) {
    return await this.http.post(`${uri}/register/`, obj)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleErrorPromise);
  }

  async updateUser(obj: User) {
    return await this.http.post(`${uri}/update/`, obj)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleErrorPromise);
  }

}
