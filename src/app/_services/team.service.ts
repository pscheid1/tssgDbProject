import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import Team from 'src/app/_models/team';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TeamService {
  private uri: string;
  constructor(private http: HttpClient) {
    this.uri = environment.TSSGAPIURL + ':' + environment.TSSGAPIPORT + '/teams';
   }


  private extractData(res: HttpResponse<Team>) {
    const body = res;
    return body || {};
  }

  private handleErrorPromise (error: HttpErrorResponse | any) {
    return Promise.reject(error.message || error);
  }

  async addteam(obj: Team){
    return await this.http.post(`${this.uri}/add`, obj)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleErrorPromise);
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
  editteam(_id) {
    // console.log('team.service.editteam: _id = ' + _id);
    return this
            .http
            .get(`${this.uri}/edit/` + _id);
            // .get(this.uri + '/edit/' + _id);
    }

  deleteteam(_id) {
    return this.http.get(`${this.uri}/delete/${_id}`);
  }

  async updateteam(obj: Team) {
    // obj._id = '5d0516139da64c4facd357fb';
    // console.log('team.service.updateteam: _id = ' + obj._id);
    return await this.http.post(`${this.uri}/update/`, obj)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleErrorPromise);
  }
}
