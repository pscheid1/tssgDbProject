// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { TeamAddComponent } from './team-add.component';

describe('TeamAddComponent', () => {
  let component: TeamAddComponent;
  // let fixture: ComponentFixture<TeamAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        RouterTestingModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        TeamAddComponent,
        HttpClient,
        HttpHandler,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    component = TestBed.inject(TeamAddComponent);
  });

 it('should create', () => {
    expect(component).toBeTruthy();
  });
});
