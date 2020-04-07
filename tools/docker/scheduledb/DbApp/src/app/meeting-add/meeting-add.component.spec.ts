// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MeetingAddComponent } from './meeting-add.component';

describe('MeetingAddComponent', () => {
  let component: MeetingAddComponent;
  // let fixture: ComponentFixture<MeetingAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        RouterTestingModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        MeetingAddComponent,
        HttpClient,
        HttpHandler,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    component = TestBed.inject(MeetingAddComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dummy test - true === true', () => {
    expect(true).toBeTrue();
  });

});
