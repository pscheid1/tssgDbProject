import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EnvService } from '../env.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NavbarService } from 'src/app/_services/navbar.service';
import { Title } from '@angular/platform-browser';

const jwtHelper = new JwtHelperService();

@Component({
  selector: 'app-user-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  currentUser: User;
  userFromApi: User;
  dspCreatedDate = '';
  errorMsg = '';
  ngVersion = '10';  // initialize to default value
  BACKEND_VERSION;
  FRONTEND_VERSION;

  constructor(
    private route: ActivatedRoute,
    private us: UserService,
    private router: Router,
    private as: AuthenticationService,
    private env: EnvService,
    private ns: NavbarService,
    private titleService:Title
  ) {
    this.currentUser = this.as.currentUserValue;
    this.BACKEND_VERSION = env.BACKEND_VERSION;
    this.FRONTEND_VERSION = env.FRONTEND_VERSION;
    this.titleService.setTitle('TSSG Home');
  }

  ngOnInit() {
    if (this.route.snapshot.data.type === 'authDenied') {
      this.errorMsg = 'User is not authorized for this request.';
    } else {
      this.errorMsg = '';
    }

    const user: User = JSON.parse(localStorage.getItem('currentUser'));
    console.log(`home.component current user: ${JSON.stringify(user)}`);
    const token = user.token;
    console.error(`home.component current access token: ${token} <<<<<<<<<<<<<<<<<<<<<<<<<<<<<`);

    // Check whether token is valid.  If expired, display msg & go to user/login page; otherwise continue
    if (jwtHelper.isTokenExpired(token)) {
      // access jwt expired, force a logout
      this.as.logout();
      alert('M007\nYour access JWT has expired.\nYou have been automatically logged out.\nPlease login again.');
      this.router.navigate(['user/login']);
    }

    // set up the navbar
    console.error(`home.component.ts - calling ns.updateNavAfterAuth(${user.role})`);
    this.ns.updateNavAfterAuth(user.role);

    const body = document.getElementsByTagName('body');
    if (body.length > 0) {
      // console.log(`body.length: ${body.length}`);
      // console.log(`body[0]: ${body[0].innerHTML}`);
      const ngv = body[0].innerHTML.indexOf('ng-version');
      // console.log(`ngv: ${ngv}`);
      this.ngVersion = body[0].innerHTML.substr(44, 6);
      // console.log(`ng-version: ${this.ngVersion})}`);
    }

    this.us.getById(user._id)
      .then(res => {
        const usr = res as User;
        this.currentUser = usr;
        if (usr.createdDate) {
          this.dspCreatedDate = usr.createdDate.toString().substring(0, 10);
        }
        this.userFromApi = usr;
      })
      .catch(err => {
        this.errorMsg = `${err.statusText.status}: ${err.statusText.name}, ${err.statusText.message} from ${err.statusText.url}`;
        if (this.errorMsg.includes('Unknown')) {
          this.errorMsg += ' - Possible no connection with backend server.';
        }
        this.forceElementView('bottom');
      });
  }

  // scroll browser to element id
  forceElementView(id: string) {
    const element = document.getElementById(id);
    element.scrollIntoView();
  }
}
