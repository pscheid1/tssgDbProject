import { Component, OnInit } from '@angular/core';
import { EnvService } from '../env.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public website_url: string;
  constructor(private env: EnvService) {
    this.website_url = `${env.WEBSITE_URL}:${env.WEBSITE_PORT}`;
   }

  ngOnInit() {
  }

}
