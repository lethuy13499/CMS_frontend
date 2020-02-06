import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeAssignmentsComponent } from './trainee-assignments.component';

describe('TraineeAssignmentsComponent', () => {
  let component: TraineeAssignmentsComponent;
  let fixture: ComponentFixture<TraineeAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
