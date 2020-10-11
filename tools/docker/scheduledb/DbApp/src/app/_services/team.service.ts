import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Team } from 'src/app/_models/team';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})

export class TeamService {
  private uri: string;
  constructor(private http: HttpClient, private env: EnvService) {
    this.uri = `${env.BACKEND_URL}:${env.BACKEND_PORT}/teams`;
  }


  private extractData(res: HttpResponse<Team>) {
    const body = res;
    return body || {};
  }

  private handleErrorPromise(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        console.error('team.service.handleErrorPromise offline error: ' + error);
      } else {
        // Handle Http Error (error.status === 403, 404...)
        HttpErrorResponse.toString();
        console.error('team.service.handleErrorPromise HttpErrorResponse: ' + HttpErrorResponse.toString());
      }
    }

    return Promise.reject(error || error.message);
  }

  // sinple unit test routine
  getTest(value: string) {
    return value;
  }

  async addteam(obj: Team) {
    return await this.http.post(`${this.uri}/add`, obj)
      .toPromise()
      .then(this.extractData)
      .catch(err => {
        throw new HttpErrorResponse({ status: 409, statusText: err, url: `${this.uri}/add` });
      });
  }

  // request all teams from the node server
  getteams() {
    return this.http.get(`${this.uri}`);
  }

  // request a list of current team id's
  listTeams() {
    return this.http.get(`${this.uri}/teams`);
  }

  // send edit request to the node server. called from team-get.component.html
  // via app-routing.module.ts path match for 'team/edit/:_id'
  async editTeam(_id) {
    return await this.http.get(`${this.uri}/edit/${_id}`)
      .toPromise()
      .then(this.extractData)
      .catch(err => {
        throw new HttpErrorResponse({ status: 404, statusText: err, url: `${this.uri}/edit` });
      });
  }

  async deleteTeam(_id) {
    if (confirm('M005\nSelect OK to delete, or Cancel to return.')) {
      return await this.http.get(`${this.uri}/delete/${_id}`)
        .toPromise()
        .then(this.extractData)
        .catch(err => {
          throw new HttpErrorResponse({ status: 404, statusText: err, url: `${this.uri}/delete` });
        });
    }
    return;
  }

  async updateteam(obj: Team) {
    return await this.http.post(`${this.uri}/update/`, obj)
      .toPromise()
      .then(this.extractData)
      .catch(err => {
        throw new HttpErrorResponse({ status: 404, statusText: err, url: `${this.uri}/update` });
      });
  }
}
