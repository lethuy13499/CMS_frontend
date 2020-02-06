import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamUserHistoryComponent } from './exam-user-history.component';

describe('ExamUserHistoryComponent', () => {
  let component: ExamUserHistoryComponent;
  let fixture: ComponentFixture<ExamUserHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamUserHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamUserHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
