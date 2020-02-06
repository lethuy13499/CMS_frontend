import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterLessonDetailsComponent } from './chapter-lesson-details.component';

describe('ChapterLessonDetailsComponent', () => {
  let component: ChapterLessonDetailsComponent;
  let fixture: ComponentFixture<ChapterLessonDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterLessonDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterLessonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
