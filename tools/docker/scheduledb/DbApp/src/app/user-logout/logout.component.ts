import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NavbarService } from 'src/app/_services/navbar.service';
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
    private router: Router
  ) { }

  ngOnInit() {
    this.authenticationService.logout();
    this.ns.updateNavAfterAuth('    ');
    this.router.navigate(['user/login']);
  }
}
