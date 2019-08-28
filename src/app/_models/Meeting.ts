import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class Meeting {
  _id: string;
  team: string;
  venue: string;
  meetingDate: Date;
  startTime: Date;
  endTime: Date;
  comments: string;
}
