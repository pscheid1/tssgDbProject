import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VenueService } from '../_services/venue.service';
import { Venue } from 'src/app/_models/Venue';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-venue-edit',
  templateUrl: './venue-edit.component.html',
  styleUrls: ['./venue-edit.component.css']
})
export class VenueEditComponent implements OnInit {
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
    private us: UserService
  ) {

  }

  // get the data from the node server and display in venue-edit.component.html file
  // the params variable name is determined by path declaration using :variable in the app-routing.module.ts
  ngOnInit() {
    this.us.listContacts().subscribe(u => {
      this.cl = u;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.cl.length; i++) {
        this.member = this.cl[i].firstname + ' ' + this.cl[i].lastname;
        this.contactList.push(this.member);
      }
    });

    // this.route.params.forEach(function (item) { });
    this.route.params.subscribe(params => {
      this.vs.editVenue(`${params._id}`).subscribe(res => {
        this.venue = res as Venue;
      });
    });
  }

  cancel() {
    this.router.navigate(['venue']);
  }

  updateVenue(venueForm: any) {
    // console.log('venue-edit.component.updateVenue');
    this.vs.updateVenue(this.venue)
      .then(res => {
        this.router.navigate(['venue']);
      })
      .catch(err => {
        this.errorMsg = err;
        // ensure href does not already contain '#bottom'
        // if not, add '#bottom' to scroll page to bottom to
        // insure error message is visable
        if ((window.location.href).indexOf('#bottom') < 0) {
          window.location.href = window.location.href + '#bottom';
        }
      });
  }
}
