import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../_services/team.service';
import { Team } from 'src/app/_models/Team';

@Component({
  selector: 'app-team-add',
  templateUrl: './team-add.component.html',
  styleUrls: ['./team-add.component.css']
})
export class TeamAddComponent implements OnInit {
  team: Team = {
    _id: null,
    description: null,
    teamLead: null,
    members: null,
    zoomLink: null,
    comments: null
  };

  errorMsg = '';

  users = ['Bugs Bunny', 'Donald Duck', 'Elmer Fudd'];

constructor(
  private route: ActivatedRoute,
  private router: Router,
  private vs: TeamService) {
}

ngOnInit() {
}

cancel() {
  this.router.navigate(['/']);
}

addTeam(teamForm: NgForm) {
  this.vs.addteam(this.team)
    .then(res => {
      this.router.navigate(['team']);
    })
    .catch(err => {
      this.errorMsg = err;
    });
}

}

