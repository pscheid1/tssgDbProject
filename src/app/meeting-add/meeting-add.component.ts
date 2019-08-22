import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MeetingService } from '../_services/meeting.service';
import Meeting from 'src/app/_models/Meeting';
import { VenueService } from '../_services/venue.service';
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
    venue: null,
    meetingDate: null,
    startTime: null,
    endTime: null,
    comments: null
  };

  newMeeting: Meeting = {
    _id: null,
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

  errorMsg = '';

  constructor(
    private router: Router,
    private ms: MeetingService,
    private vs: VenueService
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
  }

  cancel( ) {
    this.router.navigate(['/']);
  }

  addMeeting(meetingForm: NgForm): void {
    this.ms.addMeeting(this.meeting)
      .then(res => {
        this.router.navigate(['meeting']);
      })
      .catch(err => {
        this.errorMsg = err;
      });
  }
}
