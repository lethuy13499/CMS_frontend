import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterLessonComponent } from './chapter-lesson.component';

describe('ChapterLessonComponent', () => {
  let component: ChapterLessonComponent;
  let fixture: ComponentFixture<ChapterLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
