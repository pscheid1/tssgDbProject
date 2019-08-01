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
    this.vs.deleteVenue(_id).subscribe(res => {
      this.ngOnInit(); // added by ps to refresh the page after deletion.
    });
  }
}
