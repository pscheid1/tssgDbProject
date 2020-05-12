import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingService } from '../_services/meeting.service';
import { Meeting } from 'src/app/_models/meeting';
import { VenueService } from '../_services/venue.service';
import { TeamService } from '../_services/team.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-meeting-edit',
  templateUrl: './meeting-edit.component.html',
  styleUrls: ['./meeting-edit.component.css']
})
export class MeetingEditComponent implements OnInit {

  datePickerConfig: Partial<BsDatepickerConfig>;

  meeting: Meeting = {
    _id: null,
    team: null,
    venue: null,
    meetingDate: null,
    startTime: null,
    endTime: null,
    comments: null
  };

  initialTeam = '';

  hstep = 1;
  mstep = 15;
  sstep = 10;

  venues: any = [];
  teams: any = [];

  typeOf = '';
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ms: MeetingService,
    private vs: VenueService,
    private ts: TeamService
  ) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
      minDate: new Date(),
      dateInputFormat: 'YYYY-MM-DD'
    });
  }

  // get the data from the node server and display in meeting-edit.component.html file
  // the params variable name is determined by path declaration using :variable in the app-routing.module.ts
  ngOnInit() {
    this.errorMsg = '';
    this.ts.listTeams().subscribe(t => {
      this.teams = t;
    });
    this.vs.listVenues().subscribe(v => {
      this.venues = v;
    });
    if (this.route.snapshot.data.type === 'schedule') {
      this.route.params.subscribe(params => {
        this.ms.editSchedule(`${params._id}`)
          .then(res => {
            this.meeting = res as Meeting;
            // save initial team in case cancel is selected and data has been modified
            this.initialTeam = this.meeting.team;
          })
          .catch((err: HttpErrorResponse) => {
            this.errorMsg = err.status + ': ' + err.statusText + ' From ' + err.url;
            if (this.errorMsg.includes('Unknown')) {
              this.errorMsg += ' - Possible no connection with backend server.';
            }
            this.forceElementView('bottom');
          });
      });
    } else {
      this.route.params.subscribe(params => {
        this.ms.editMeeting(`${params._id}`)
          .then(res => {
            this.meeting = res as Meeting;
            // save initial team in case cancel is selected and data has been modified
            this.initialTeam = this.meeting.team;
          })
          .catch((err: HttpErrorResponse) => {
            this.errorMsg = err.status + ': ' + err.statusText + ' From ' + err.url;
            if (this.errorMsg.includes('Unknown')) {
              this.errorMsg += ' - Possible no connection with backend server.';
            }
            this.forceElementView('bottom');
          });
      });
    }
  }


  cancel() {
    //  the router.navigate call will cause the return data to be passed back to venue-get.component
    if (this.route.snapshot.data.type === 'schedule') {
      if (this.initialTeam !== '') {
        this.router.navigate([`meeting/schedule/${this.initialTeam}`]);
      } else {
        // if a page did not load, we have no initialTeam. use browser history
        history.go(-2);
      }
    } else {
      this.router.navigate(['meeting']);
    }
  }

  // scroll browser to element id
  forceElementView(id: string) {
    const element = document.getElementById(id);
    element.scrollIntoView();
  }

  updateMeeting(meetingForm: NgForm) {

    // Test for meeting id, team and venue should not be required as it should
    // be impossible to delete or change the existing meeting id entry.
    // For the team and venue, they may be changed, but not deleted.

    if (!this.meeting.meetingDate) {
      this.errorMsg = 'Meeting meetingDate is required.';
      this.forceElementView('bottom');
      return;
    }

    if (!this.meeting.startTime) {
      this.errorMsg = 'Meeting startTime is required.';
      this.forceElementView('bottom');
      return;
    }

    if (!this.meeting.endTime) {
      this.errorMsg = 'Meeting endTime is required.';
      this.forceElementView('bottom');
      return;
    }

    // none of the other entries are requied, therefore
    // no validation is required.
    // any entries will be trimmed by the database if
    // requested in the schema.

    let hours = this.meeting.startTime.getHours();
    if (hours < 0 || hours > 23) {
      this.errorMsg = 'Invalid meeting startTime. Hours must be 0 thru 23.';
      this.forceElementView('bottom');
      return;
    }

    let minutes = this.meeting.startTime.getMinutes();
    if (minutes !== 0 && minutes !== 15 && minutes !== 30 && minutes !== 45) {
      this.errorMsg = 'Invalid meeting startTime. Minutes must be 00, 15, 30 or 45.';
      this.forceElementView('bottom');
      return;
    }

    hours = this.meeting.endTime.getHours();
    if (hours < 0 || hours > 23) {
      this.errorMsg = 'Invalid meeting endTime. Hours must be 0 thru 23.';
      this.forceElementView('bottom');
      return;
    }

    minutes = this.meeting.endTime.getMinutes();
    if (minutes !== 0 && minutes !== 15 && minutes !== 30 && minutes !== 45) {
      this.errorMsg = 'Invalid meeting endTime. Minutes must be 00, 15, 30 or 45.';
      this.forceElementView('bottom');
      return;
    }

    if (this.meeting.endTime <= this.meeting.startTime) {
      this.errorMsg = 'Meeting endTime must be > meeting startTime';
      this.forceElementView('bottom');
      return;
    }

    // If meetingDate is a string, it has not been altered. Do not test as
    // it may be a date in the past. An expired meeting is OK but createing
    // a meeting in the past is not allowed.
    // If meetingDate has been changed, with or without the date picker, it
    // will be an object.
    if (typeof (this.meeting.meetingDate) === 'object') {
      // meetingDate has been changed or re-entered
      if (this.meeting.meetingDate < new Date()) {
        this.errorMsg = 'Cannot create a meeting in the past.';
        this.forceElementView('bottom');
        return;
      }
    }

    this.errorMsg = '';
    // post updated meeting data back to node server via meeting.service.ts updateMeeting()
    this.ms.updateMeeting(this.meeting)
      .then(result => {
        if (this.route.snapshot.data.type === 'edit') {
          //  pass returned data back to meeting-get.component
          this.router.navigate(['meeting']);
        } else {
          //  pass returned data back to meeting-get=schedule.component
          this.router.navigate([`meeting/schedule/${this.initialTeam}`]);
        }
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
