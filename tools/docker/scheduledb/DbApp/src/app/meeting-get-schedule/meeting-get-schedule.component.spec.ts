import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingGetScheduleComponent } from './meeting-get-schedule.component';

describe('MeetingGetScheduleComponent', () => {
  let component: MeetingGetScheduleComponent;
  let fixture: ComponentFixture<MeetingGetScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingGetScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingGetScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
