import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../_services/team.service';
import Team from 'src/app/_models/Team';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {

  team: Team = {
    _id: null,
    description: null,
    teamLead: null,
    members: null,
    zoomLink: null,
    comments: null
  }

  teamlead: any = [];
  members: any = [];
  leaderList = new Array();
  memberList = new Array();
  ul: any;
  member: string;

  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ts: TeamService,
    private us: UserService
  ) { }

  ngOnInit() {
    this.us.listUsers().subscribe(u => {
      this.ul = u;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.ul.length; i++) {
        this.member = this.ul[i].firstname + ' ' + this.ul[i].lastname;
        if (this.ul[i].role === 'Admin') {
          this.leaderList.push(this.member);
        }
        this.memberList.push(this.member);
      }
    });
    this.route.params.subscribe(params => {
      this.ts.editteam(`${params._id}`).subscribe(res => {
        this.team = res as Team;
      });
    });

  }

  cancel() {
    this.router.navigate(['/']);
  }

  // post updated meeting data back to node server via meeting.service.ts update
  updateTeam(teamForm: NgForm) {
    this.route.params.subscribe(params => {
      this.ts.updateteam(this.team);
      //  the router.navigate call will cause the return data to be passed back to venue-get.component
      this.router.navigate(['team']);
    });

  }
}
