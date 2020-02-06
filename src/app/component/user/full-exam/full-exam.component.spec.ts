import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullExamComponent } from './full-exam.component';

describe('FullExamComponent', () => {
  let component: FullExamComponent;
  let fixture: ComponentFixture<FullExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
