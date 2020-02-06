import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamUsersComponent } from './exam-users.component';

describe('ExamUsersComponent', () => {
  let component: ExamUsersComponent;
  let fixture: ComponentFixture<ExamUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
