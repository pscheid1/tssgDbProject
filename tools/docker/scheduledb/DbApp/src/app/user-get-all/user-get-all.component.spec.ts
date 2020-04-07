// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { UserGetAllComponent } from './user-get-all.component';

describe('UserGetAllComponent', () => {
  let component: UserGetAllComponent;
  // let fixture: ComponentFixture<UserGetAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        RouterTestingModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        UserGetAllComponent,
        HttpClient,
        HttpHandler,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    component = TestBed.inject(UserGetAllComponent);
  });

  it('dummy positive test', () => {
    expect(true).toBeTrue();
  });

  it('should be less than 1', () => {
    expect(component.users.length).toBe(0);
  });
});
