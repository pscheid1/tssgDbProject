import { Component, OnInit } from '@angular/core';
import { Venue } from 'src/app/_models/venue';
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
    this.errorMsg = '';
    this.vs.deleteVenue(_id)
      .then(res => {
        this.ngOnInit();
      })
      .catch(err => {
        this.errorMsg = err.status + ': ' + err.statusText;
        if ((window.location.href).indexOf('#bottom') < 0) {
          window.location.href = window.location.href + '#bottom';
        }
      });
  }
}
