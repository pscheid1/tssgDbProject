// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { VenueGetComponent } from './venue-get.component';

describe('VenueGetComponent', () => {
  let component: VenueGetComponent;
  // let fixture: ComponentFixture<VenueGetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        RouterTestingModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        VenueGetComponent,
        HttpClient,
        HttpHandler,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    component = TestBed.inject(VenueGetComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
