import { Component, OnInit } from '@angular/core';
import { Venue } from 'src/app/_models/Venue';
import { VenueService } from '../_services/venue.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-venue-get',
  templateUrl: './venue-get.component.html',
  styleUrls: ['./venue-get.component.css']
})
export class VenueGetComponent implements OnInit {
  venues: Venue[];
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vs: VenueService) { }

  ngOnInit() {
    this.vs.getVenues().subscribe((data: Venue[]) => {
      this.venues = data;
    });
  }

  deleteVenue(_id) {
    this.vs.deleteVenue(_id)
      .then(res => {
        this.ngOnInit(); // added by ps to refresh the page after deletion.
      })                    //;
      .catch(err => {
        // err is an instance of TypeError.  I have not found any way to
        // get meaningful information back.  I'm forcing the 'Not Found' below
        // because what is returned is dog shit.
        this.errorMsg = 'Not Found: ' + err.message;
        // ensure href does not already contain '#bottom'
        // if not, add '#bottom' to scroll page to bottom to
        // insure error message is visable
        if ((window.location.href).indexOf('#bottom') < 0) {
          window.location.href = window.location.href + '#bottom';
        }
      });
  }
}
