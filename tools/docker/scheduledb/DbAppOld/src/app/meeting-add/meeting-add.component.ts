import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MeetingService } from '../_services/meeting.service';
import { Meeting } from 'src/app/_models/meeting';
import { VenueService } from '../_services/venue.service';
import { TeamService } from '../_services/team.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-meeting-add',
  templateUrl: './meeting-add.component.html',
  styleUrls: ['./meeting-add.component.css']
})

export class MeetingAddComponent implements OnInit {

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

  newMeeting: Meeting = {
    _id: null,
    team: null,
    venue: null,
    meetingDate: null,
    startTime: null,
    endTime: null,
    comments: null
  };

  hstep = 1;
  mstep = 15;
  sstep = 10;

  venues: any = [];
  teams: any = [];
  errorMsg = '';

  constructor(
    private router: Router,
    private ms: MeetingService,
    private vs: VenueService,
    private ts: TeamService
  ) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
      minDate: new Date(),              // prevent scheduling prior to current date
      dateInputFormat: 'YYYY-MM-DD',
    });

  }

  ngOnInit() {
    this.vs.listVenues().subscribe(v => {
      this.venues = v;
    });
    this.ts.listTeams().subscribe(t => {
      this.teams = t;
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }

  addMeeting(meetingForm: NgForm): void {
    this.ms.addMeeting(this.meeting)
      .then(res => {
        this.router.navigate(['meeting']);
      })
      .catch(err => {
        this.errorMsg = err.status + ': ' + err.statusText;
        if ((window.location.href).indexOf('#bottom') < 0) {
          window.location.href = window.location.href + '#bottom';
        }
      });
  }
}
