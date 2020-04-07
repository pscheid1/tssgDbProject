// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MeetingGetComponent } from './meeting-get.component';

describe('MeetingGetComponent', () => {
  let component: MeetingGetComponent;
  // let fixture: ComponentFixture<MeetingGetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        RouterTestingModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        MeetingGetComponent,
        HttpClient,
        HttpHandler,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    component = TestBed.inject(MeetingGetComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
