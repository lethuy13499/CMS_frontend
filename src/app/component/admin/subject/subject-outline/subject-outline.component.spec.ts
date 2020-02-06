import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectOutlineComponent } from './subject-outline.component';

describe('SubjectOutlineComponent', () => {
  let component: SubjectOutlineComponent;
  let fixture: ComponentFixture<SubjectOutlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectOutlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
