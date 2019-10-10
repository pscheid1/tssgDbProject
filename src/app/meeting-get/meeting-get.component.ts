import { Component, OnInit } from '@angular/core';
import Meeting from '../_models/meeting';
import { MeetingService } from '../_services/meeting.service';
import { ActivatedRoute, Router } from '@angular/router';

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
      this.ms.getMeetings().subscribe((data: Meeting[]) => {
        this.meetings = data;
      });
    }
  }

  deleteMeeting(_id) {
    this.errorMsg = '';
    this.ms.deleteMeeting(_id)
      .then(res => {
        this.ngOnInit();
      })
      .catch(err => {
        this.errorMsg = err.status + ': ' + err.statusText;
        if ((window.location.href).indexOf('#bottom') < 0) {
          window.location.href = window.location.href + '#bottom';
        }
      });

  }
}
