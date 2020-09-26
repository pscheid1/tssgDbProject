import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EnvService } from '../env.service';
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
  backendVersion;
  frontendVersion;

  constructor(
    private route: ActivatedRoute,
    private us: UserService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private env: EnvService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.backendVersion = env.BACKEND_VERSION;
    this.frontendVersion = env.FRONTEND_VERSION;
  }

  ngOnInit() {
    if (this.route.snapshot.data.type === 'authDenied') {
      this.errorMsg = 'User is not authorized for this request.';
    } else {
      this.errorMsg = '';
    }

    if (this.currentUser === null) {
      // console.log('home.component.ts.currentUser is null ');
      this.router.navigate(['user/login']);
    }
    // console.error('home.component.ts.currentUser: ' + this.currentUser);

    const body = document.getElementsByTagName('body');
    if (body.length > 0) {
      // console.log(`body.length: ${body.length}`);
      // console.log(`body[0]: ${body[0].innerHTML}`);
      const ngv = body[0].innerHTML.indexOf('ng-version');
      // console.log(`ngv: ${ngv}`);
      this.ngVersion = body[0].innerHTML.substr(44, 6);
      // console.log(`ng-version: ${this.ngVersion})}`);
    }

    this.us.getById(this.currentUser._id)
      .then(res => {
        const usr = res as User;
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
