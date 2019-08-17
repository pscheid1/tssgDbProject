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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ms: MeetingService
  ) {}

  ngOnInit() {
    if (this.router.url === '/meeting/schedule') {
      this.heading = 'List Next 3 Meetings';
      this.ms.getSchedule().subscribe((data: Meeting[]) => {
        this.meetings = data;
      });
    } else {
      this.heading = 'List All Meetings';
      this.ms.getMeetings().subscribe((data: Meeting[]) => {
        this.meetings = data;
      });
    }
  }

  deleteMeeting(_id) {
    this.ms.deleteMeeting(_id).subscribe(res => {
      this.ngOnInit(); // added by ps to refresh the page after deletion.
    });
  }
}
