// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { UserGetCurrComponent } from './user-get-curr.component';

describe('UserGetCurrComponent', () => {
  let component: UserGetCurrComponent;
  // let fixture: ComponentFixture<UserGetCurrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        RouterTestingModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        UserGetCurrComponent,
        HttpClient,
        HttpHandler,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    component = TestBed.inject(UserGetCurrComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dummy test - true === true', () => {
    expect(true).toBeTrue();
  });

  it('currentUser should be null', () => {
    expect(component.currentUser).toBeNull();
  });

});
