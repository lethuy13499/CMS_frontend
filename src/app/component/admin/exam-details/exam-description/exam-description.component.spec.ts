import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDescriptionComponent } from './exam-description.component';

describe('ExamDescriptionComponent', () => {
  let component: ExamDescriptionComponent;
  let fixture: ComponentFixture<ExamDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
