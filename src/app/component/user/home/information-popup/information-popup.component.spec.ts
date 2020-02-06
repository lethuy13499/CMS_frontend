import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationPopupComponent } from './information-popup.component';

describe('InformationPopupComponent', () => {
  let component: InformationPopupComponent;
  let fixture: ComponentFixture<InformationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
