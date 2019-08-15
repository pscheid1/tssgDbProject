import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VenueService } from '../_services/venue.service';
import { Venue } from 'src/app/_models/Venue';

@Component({
  selector: 'app-venue-edit',
  templateUrl: './venue-edit.component.html',
  styleUrls: ['./venue-edit.component.css']
})
export class VenueEditComponent implements OnInit {
  venue: Venue = {
    _id: null,
    description: null,
    website: null,
    calendar: null,
    address: null,
    town: null,
    location: null,
    iconimage: null
  };

  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vs: VenueService
  ) {

  }

  // get the data from the node server and display in venue-edit.component.html file
  // the params variable name is determined by path declaration using :variable in the app-routing.module.ts
  ngOnInit() {
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
