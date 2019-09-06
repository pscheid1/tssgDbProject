import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingService } from '../_services/meeting.service';
import Meeting from 'src/app/_models/Meeting';
import { VenueService } from '../_services/venue.service';
import { TeamService } from '../_services/team.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

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
    this.ts.listTeams().subscribe(t => {
      this.teams = t;
    });
    this.vs.listVenues().subscribe(v => {
      this.venues = v;
      if (this.route.snapshot.data.type === 'schedule') {
        this.route.params.subscribe(params => {
          this.ms.editSchedule(`${params._id}`).subscribe(res => {
            this.meeting = res as Meeting;
          });
        });
      } else {
        this.route.params.subscribe(params => {
          this.ms.editMeeting(`${params._id}`).subscribe(res => {
            this.meeting = res as Meeting;
          });
        });
      }
    });
  }

  cancel() {
    //  the router.navigate call will cause the return data to be passed back to venue-get.component
    if (this.route.snapshot.data.type === 'schedule') {
      this.router.navigate(['meeting/schedule']);
    } else {
      this.router.navigate(['meeting']);
    }
  }

  // post updated meeting data back to node server via meeting.service.ts update
  updateMeeting(meetingForm: NgForm) {
    // if meetingDate has not been changed, it is returned as a string representing an ISO date format
    // if meetingDate has been changed, it is returned as a Date object
    // this.typeOf = Object.prototype.toString.call(this.meeting.meetingDate).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
    // console.error('typeOf = ' + this.typeOf);
    // console.log('meeting-edit.updateMeeting: meetingDate = ' + this.meeting.meetingDate);
    this.route.params.subscribe(params => {
      this.ms.updateMeeting(this.meeting);
      //  the router.navigate call will cause the return data to be passed back to meeting-get.component
      if (this.route.snapshot.data.type === 'edit') {
        this.router.navigate(['meeting']);
      } else {
        this.router.navigate([`meeting/schedule/${this.meeting.team}`]);
      }
    });

  }
}
