﻿
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

  // sinple unit test routine
  getTest(value: string) {
    return value;
  }

  async getAll() {
    return await this.http.get(`${this.uri}`)
      .toPromise()
      .then(this.extractData)
      .catch(err => {
        throw new HttpErrorResponse({ status: 404, statusText: err,  url: `${this.uri}` });
      });
  }

  async getCurrent() {
    return await this.http.get(`${this.uri}/current`)
      .toPromise()
      .then(this.extractData)
      .catch(err => {
        throw new HttpErrorResponse({ status: 404, statusText: err, url: `${this.uri}/current` });
      });
  }

  // request a list of current users - id, firstname, lastname only
  // all users excluding role = Contact
  listUsers() {
    return this.http.get(`${this.uri}/list`);
  }

  // request a list of current users - id, firstname, lastname only
  // all users with role = Contact only
  listContacts() {
    return this.http.get(`${this.uri}/contacts`);
  }

  async getById(_id: string) {
    return await this.http.get(`${this.uri}/edit/${_id}`)
      .toPromise()
      .then(this.extractData)
      .catch(err => {
        console.log(`user.service.getById err = ${err}`);
        throw new HttpErrorResponse({ status: 404, statusText: err, url: `${this.uri}/edit` });
      });
  }

  async deleteUser(_id: string) {
    if (confirm('Select OK to delete, or Cancel to return.')) {
      return await this.http.get(`${this.uri}/delete/${_id}`)
        .toPromise()
        .then(this.extractData)
        .catch(err => {
          // console.log(`user.service.getById err = ${err}`);
          throw new HttpErrorResponse({ status: 404, statusText: err, url: `${this.uri}/delete` });
        });
    }
    return;
  }

  async registerUser(obj: User) {
    return await this.http.post(`${this.uri}/register/`, obj)
      .toPromise()
      .then(this.extractData)
      .catch(err => {
        // console.log(`user.service.registerUser err = ${err}`);
        throw new HttpErrorResponse({ status: 409, statusText: err, url: `${this.uri}/register` });
      });
  }

  async updateUser(obj: User) {
    return await this.http.post(`${this.uri}/update/`, obj)
      .toPromise()
      .then(this.extractData)
      .catch(err => {
        // console.log(`user.service.getById err = ${err}`);
        throw new HttpErrorResponse({ status: 404, statusText: err, url: `${this.uri}/update` });
      });
  }
}


