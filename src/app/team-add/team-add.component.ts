import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../_services/team.service';
import { Team } from 'src/app/_models/Team';
// import { User } from 'src/app/_models/User';
import { UserService } from '../_services/user.service';

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

  // leaderList = ['Bugs Bunny', 'Donald Duck', 'Elmer Fudd'];
  // memberList = ['Bugs Bunny', 'Donald Duck', 'Elmer Fudd', 'Porky Pig', 'Mickey Mouse', 'Gyro Gearloose'];
  leaderList = new Array();
  memberList = new Array();
  ul: any;
  member: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ts: TeamService,
    private us: UserService) {
  }

  ngOnInit() {
    this.us.listUsers().subscribe(u => {
      this.ul = u;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.ul.length; i++) {
        this.member = this.ul[i].firstname + ' ' + this.ul[i].lastname;
        this.leaderList.push(this.member);
        this.memberList.push(this.member);
      }
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }

  addTeam(teamForm: NgForm) {
    this.ts.addteam(this.team)
      .then(res => {
        this.router.navigate(['team']);
      })
      .catch(err => {
        this.errorMsg = err;
      });
  }

}

