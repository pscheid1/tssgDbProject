import { Component, OnInit } from '@angular/core';
import { Meeting } from '../_models/meeting';
import { MeetingService } from '../_services/meeting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-meeting-get',
  templateUrl: './meeting-get.component.html',
  styleUrls: ['./meeting-get.component.css']
})
export class MeetingGetComponent implements OnInit {
  meetings: Meeting[];
  heading = '';
  errorMsg = '';
  routerlink = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ms: MeetingService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.data.type === 'edit') {
      this.routerlink = '/meeting/edit/';
    } else {
      this.routerlink = '/meeting/schedule/edit/';
    }
    if (this.route.snapshot.data.type === 'schedule') {
      this.route.params.subscribe(params => {
        this.heading = 'Meetings for Team: ' + params.team;
        this.ms.getSchedule(`${params.team}`).subscribe((data: Meeting[]) => {
          this.meetings = data;
        });
      });
    } else {
      this.heading = 'List All Meetings';
      // this.ms.getMeetings().subscribe((data: Meeting[]) => {
      this.ms.getMeetings()
        .then((data: Meeting[]) => {
          this.meetings = data;
        })
        .catch((err: HttpErrorResponse) => {
          this.errorMsg = err.status + ': ' + err.statusText + ' From ' + err.url;
          if (this.errorMsg.includes('Unknown')) {
            this.errorMsg += ' - Possible no connection with backend server.';
          }
        });
    }
  }

  // scroll browser to element id
  forceElementView(id: string) {
    const element = document.getElementById(id);
    element.scrollIntoView();
  }

  deleteMeeting(_id) {
    this.errorMsg = '';
    this.ms.deleteMeeting(_id)
      .then(res => {
        this.ngOnInit();
      })
      .catch((err: HttpErrorResponse) => {
        this.errorMsg = err.status + ': ' + err.statusText + ' From ' + err.url;
        if (this.errorMsg.includes('Unknown')) {
          this.errorMsg += ' - Possible no connection with backend server.';
        }

        this.forceElementView('bottom');
      });

  }
}
