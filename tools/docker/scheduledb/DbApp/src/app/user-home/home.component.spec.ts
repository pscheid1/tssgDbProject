import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  // let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        RouterTestingModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        HomeComponent,
        HttpClient,
        HttpHandler,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    component = TestBed.inject(HomeComponent);
  });

  it('currentUser should be null', () => {
    expect(component.currentUser).toBeNull();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
