import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NavbarService } from 'src/app/_services/navbar.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  errorMsg = '';

  constructor(
    private authenticationService: AuthenticationService,
    private ns: NavbarService,
    private router: Router,
    private titleService:Title
  ) {
    this.titleService.setTitle('TSSG Logout');
  }

  ngOnInit() {
    this.authenticationService.logout();
    // console.error(`logout.component.ts - calling ns.updateNavAfterAuth(' ')`);
    this.ns.updateNavAfterAuth(' ');
    this.router.navigate(['user/login']);
  }
}
