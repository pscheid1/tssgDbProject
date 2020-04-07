import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { TeamService } from 'src/app/_services/team.service';


describe('TeamService', () => {
  let service: TeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        RouterTestingModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        TeamService,
        HttpClient,
        HttpHandler,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
    service = TestBed.inject(TeamService);
  });

  // MeetingService.getTest(<string>) will return <string>
  it('TeamService.getTest() should return "hello"', () => {
    expect(service.getTest('hello')).toEqual('hello');
  });
});

