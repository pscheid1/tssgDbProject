import { Component, OnInit } from '@angular/core';
import Meeting from '../_models/Meeting';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ms: MeetingService
  ) { }

  ngOnInit() {
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
        this.ngOnInit(); // added by ps to refresh the page after deletion.
      })
      .catch(err => {
        // err is an instance of TypeError.  I have not found any way to
        // get meaningful information back.  I'm forcing the 'Not Found' below
        // because what is returned is dog shit.
        this.errorMsg = 'Not Found: ' + err.message;
        // ensure href does not already contain '#bottom'
        // if not, add '#bottom' to scroll page to bottom to
        // insure error message is visable
        if ((window.location.href).indexOf('#bottom') < 0) {
          window.location.href = window.location.href + '#bottom';
        }
      });

  }
}
