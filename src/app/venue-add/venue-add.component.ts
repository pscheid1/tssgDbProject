import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VenueService } from '../_services/venue.service';
import { Venue } from 'src/app/_models/Venue';

@Component({
  selector: 'app-venue-add',
  templateUrl: './venue-add.component.html',
  styleUrls: ['./venue-add.component.css']
})
export class VenueAddComponent implements OnInit {
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
    private vs: VenueService) {

  }


  ngOnInit() {
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
      this.errorMsg = err;
    });
  }
}
