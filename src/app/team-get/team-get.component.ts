import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/_models/Team';
import { TeamService } from '../_services/team.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team-get',
  templateUrl: './team-get.component.html',
  styleUrls: ['./team-get.component.css']
})
export class TeamGetComponent implements OnInit {
teams: Team[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ts: TeamService) { }

  ngOnInit() {
    this.ts.getteams().subscribe((data: Team[]) => {
      this.teams = data;
    });
  }

  deleteTeam(_id) {
    this.ts.deleteteam(_id).subscribe(res => {
      this.ngOnInit(); // added by ps to refresh the page after deletion.
    });
  }
}
