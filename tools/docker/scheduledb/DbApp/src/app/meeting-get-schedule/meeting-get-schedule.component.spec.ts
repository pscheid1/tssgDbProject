// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MeetingGetScheduleComponent } from './meeting-get-schedule.component';

describe('MeetingGetScheduleComponent', () => {
  let component: MeetingGetScheduleComponent;
  // let fixture: ComponentFixture<MeetingGetScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        RouterTestingModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        MeetingGetScheduleComponent,
        HttpClient,
        HttpHandler,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    component = TestBed.inject(MeetingGetScheduleComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
