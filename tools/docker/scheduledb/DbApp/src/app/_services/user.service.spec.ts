import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { UserService } from 'src/app/_services/user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          RouterModule.forRoot([]),
          RouterTestingModule,
          HttpClientModule,
          FormsModule
        ],
      providers: [
        UserService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get(): string {
                  return '123';
                },
              },
            },
          }
        },
        HttpClient,
        HttpHandler,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    service = TestBed.inject(UserService);
  });

  // UserService.getTest(<string>) will return <string>
  it('UserService.getTest() should return "hello"', () => {
    expect(service.getTest('hello')).toEqual('hello');
  });
});

