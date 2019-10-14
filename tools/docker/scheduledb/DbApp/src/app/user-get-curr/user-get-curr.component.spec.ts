import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGetCurrComponent } from './user-get-curr.component';

describe('UserGetCurrComponent', () => {
  let component: UserGetCurrComponent;
  let fixture: ComponentFixture<UserGetCurrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGetCurrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGetCurrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
