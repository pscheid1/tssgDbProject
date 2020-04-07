import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { TeamGetComponent } from './team-get.component';

describe('TeamGetComponent', () => {
  let component: TeamGetComponent;
  // let fixture: ComponentFixture<TeamGetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        RouterTestingModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        TeamGetComponent,
        HttpClient,
        HttpHandler,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    component = TestBed.inject(TeamGetComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
