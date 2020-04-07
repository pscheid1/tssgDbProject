// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MeetingEditComponent } from './meeting-edit.component';

describe('MeetingEditComponent', () => {
  let component: MeetingEditComponent;
  // let fixture: ComponentFixture<MeetingEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        RouterTestingModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        MeetingEditComponent,
        HttpClient,
        HttpHandler,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    component = TestBed.inject(MeetingEditComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
