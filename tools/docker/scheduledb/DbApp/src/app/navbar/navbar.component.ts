import { Component, OnInit } from '@angular/core';
import { EnvService } from '../env.service';
import { NavbarService } from 'src/app/_services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public websiteURL: string;
  constructor(private env: EnvService,  private ns: NavbarService) {
    this.websiteURL = `${env.WEBSITE_URL}:${env.WEBSITE_PORT}`;
   }

   isLoggedIn = false;
   isRoleAdmin = false;

  ngOnInit() {
    this.ns.getLoginStatus().subscribe(status => this.isLoggedIn = status);
    this.ns.getRoleStatus().subscribe(status => this.isRoleAdmin = status);
  }

}
