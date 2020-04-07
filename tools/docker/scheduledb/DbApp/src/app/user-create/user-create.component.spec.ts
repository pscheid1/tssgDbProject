// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { UserCreateComponent } from './user-create.component';


describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  // let fixture: ComponentFixture<UserCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        RouterTestingModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        UserCreateComponent,
        HttpClient,
        HttpHandler,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    component = TestBed.inject(UserCreateComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('user._id should be null', () => {
    expect(component.user._id).toBeNull();
  });

  it('user.username should be null', () => {
    expect(component.user.username).toBeNull();
  });

});
