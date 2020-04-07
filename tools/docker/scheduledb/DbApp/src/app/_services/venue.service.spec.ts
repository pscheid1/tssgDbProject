// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { VenueService } from 'src/app/_services/venue.service';


describe('VenueService', () => {
  let service: VenueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        RouterTestingModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        VenueService,
        HttpClient,
        HttpHandler,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    service = TestBed.inject(VenueService);
  });

  // VenueService.getTest(<string>) will return <string>
  it('VenueService.getTest() should return "hello"', () => {
    expect(service.getTest('hello')).toEqual('hello');
  });
});

