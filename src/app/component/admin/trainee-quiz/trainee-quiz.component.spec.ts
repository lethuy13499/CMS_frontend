import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeQuizComponent } from './trainee-quiz.component';

describe('TraineeQuizComponent', () => {
  let component: TraineeQuizComponent;
  let fixture: ComponentFixture<TraineeQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
