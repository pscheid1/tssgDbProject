import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MeetingService } from 'src/app/_services/meeting.service';

describe('MeetingService', () => {
  let service: MeetingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        RouterTestingModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        MeetingService,
        HttpClient,
        HttpHandler,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    service = TestBed.inject(MeetingService);
  });

  // MeetingService.getTest(<string>) will return <string>
  it('MeetingService.getTest() should return "hello"', () => {
    expect(service.getTest('hello')).toEqual('hello');
  });
});

