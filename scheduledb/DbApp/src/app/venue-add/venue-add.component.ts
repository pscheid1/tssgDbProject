import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VenueService } from '../_services/venue.service';
import { Venue } from 'src/app/_models/venue';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-venue-add',
  templateUrl: './venue-add.component.html',
  styleUrls: ['./venue-add.component.css']
})
export class VenueAddComponent implements OnInit {
  venue: Venue = {
    _id: null,
    description: null,
    contact: null,
    website: null,
    calendar: null,
    address: null,
    town: null,
    location: null,
    iconimage: null
  };

  errorMsg = '';
  contactList = new Array();
  cl: any;
  member: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vs: VenueService,
    private us: UserService) {

  }


  ngOnInit() {
    this.us.listContacts().subscribe(u => {
      this.cl = u;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.cl.length; i++) {
        this.member = this.cl[i].firstname + ' ' + this.cl[i].lastname;
        this.contactList.push(this.member);
      }
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }

  addVenue(venueForm: NgForm) {
    this.vs.addVenue(this.venue)
      .then(res => {
        this.router.navigate(['venue']);
      })
      .catch(err => {
        this.errorMsg = err.status + ': ' + err.statusText;
        if ((window.location.href).indexOf('#bottom') < 0) {
          window.location.href = window.location.href + '#bottom';
        }
      });
  }
}
