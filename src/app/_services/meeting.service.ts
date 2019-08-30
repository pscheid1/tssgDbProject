import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import Meeting from 'src/app/_models/Meeting';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private uri: string;

  constructor(private http: HttpClient) {
    this.uri = environment.TSSGAPIURL + ':' + environment.TSSGAPIPORT + '/meetings';
   }

  private extractData(res: HttpResponse<Meeting>) {
    const body = res;
    return body || {};
  }

  private handleErrorPromise(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        console.error('meeting.service.handleErrorPromise offline error: ' + error);
      } else {
        // Handle Http Error (error.status === 403, 404...)
        HttpErrorResponse.toString();
        console.error('meeting.service.handleErrorPromise HttpErrorResponse: ' + HttpErrorResponse.toString());
      }
    }

    return Promise.reject(error || error.message);
  }

  async addMeeting(obj: Meeting) {
    return await this.http.post(`${this.uri}/add`, obj)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  // request all meetings from the node server
  getMeetings() {
    return this.http.get(`${this.uri}`);
  }

  // send edit request to the node server. called from meeting-get.component.html
  // via app-routing.module.ts path match for 'meeting/edit/:_id'
  editMeeting(_id) {
    return (
      this.http
        // .get(`${this.uri}/edit/` + _id);
        .get(this.uri + '/edit/' + _id)
    );
  }

  // request all meeting schedule (next 3 meetings) from the node server
  getSchedule(team: string) {
    return this.http.get(`${this.uri}/schedule/${team}`);
  }

  // send edit request to the node server. called from meeting-get.component.html
  // via app-routing.module.ts path match for 'meeting/edit/:_id'
  editSchedule(_id) {
    return (
      this.http
        // .get(`${this.uri}/edit/` + _id);
        .get(this.uri + '/edit/' + _id)
    );
  }

  async deleteMeeting(_id) {
    return await this.http.get(`${this.uri}/delete/${_id}`)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  // post meeting data to update back to the node server. called from meeting-edit.component.ts
  async updateMeeting(obj: Meeting) {
    // console.log('meeting.service.updateMeeting.meetingDate: ' + obj.meetingDate);
    return await this.http.post(`${this.uri}/update`, obj)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }
}
