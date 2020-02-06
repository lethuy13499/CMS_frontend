import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDemoComponent } from './exam-demo.component';

describe('ExamDemoComponent', () => {
  let component: ExamDemoComponent;
  let fixture: ComponentFixture<ExamDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
