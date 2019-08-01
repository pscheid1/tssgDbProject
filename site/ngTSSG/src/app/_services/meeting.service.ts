import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import Meeting from 'src/app/_models/Meeting';

const uri = 'http://localhost:7010/meetings';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http: HttpClient) { }

  private extractData(res: HttpResponse<Meeting>) {
    const body = res;
    return body || {};
  }

  private handleErrorPromise(error: HttpErrorResponse | any) {
    return Promise.reject(error.message || error);
  }

  async addMeeting(obj: Meeting) {
    // console.log('meeting date: ' + obj.meetingDate);
    // console.log('meeting start time: ' + obj.startTime);
    // console.log('meeting end time: ' + obj.endTime);
    return await this.http.post(`${uri}/add`, obj)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  // request all meetings from the node server
  getMeetings() {
    return this.http.get(`${uri}`);
  }

  // send edit request to the node server. called from meeting-get.component.html
  // via app-routing.module.ts path match for 'meeting/edit/:_id'
  editMeeting(_id) {
    return (
      this.http
        // .get(`${this.uri}/edit/` + _id);
        .get(uri + '/edit/' + _id)
    );
  }

  // request all meeting schedule (next 3 meetings) from the node server
  getSchedule() {
    return this.http.get(`${uri}/schedule`);
  }

  // send edit request to the node server. called from meeting-get.component.html
  // via app-routing.module.ts path match for 'meeting/edit/:_id'
  editSchedule(_id) {
    return (
      this.http
        // .get(`${this.uri}/edit/` + _id);
        .get(uri + '/edit/' + _id)
    );
  }

  deleteMeeting(_id) {
    return this.http.get(`${uri}/delete/${_id}`);
  }

  // post meeting data to update back to the node server. called from meeting-edit.component.ts
  async updateMeeting(obj: Meeting) {
    // console.log('meeting.service.updateMeeting.meetingDate: ' + obj.meetingDate);
    return await this.http.post(`${uri}/update`, obj)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }
}
