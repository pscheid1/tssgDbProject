import { Component, OnInit } from '@angular/core';
import Team from 'src/app/_models/Team';
import { TeamService } from '../_services/team.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team-get',
  templateUrl: './team-get.component.html',
  styleUrls: ['./team-get.component.css']
})
export class TeamGetComponent implements OnInit {
teams: Team[];
errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ts: TeamService) { }

  ngOnInit() {
    this.ts.getteams().subscribe((data: Team[]) => {
      this.teams = data;
    });
  }

  // deleteTeam(_id) {
  //   this.ts.deleteteam(_id).subscribe(res => {
  //     this.ngOnInit(); // added by ps to refresh the page after deletion.
  //   });
  // }

  deleteTeam(_id) {
    this.ts.deleteteam(_id)
      .then(res => {
        this.ngOnInit(); // added by ps to refresh the page after deletion.
      })                    //;
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
