import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrantionComponent } from './registrantion.component';

describe('RegistrantionComponent', () => {
  let component: RegistrantionComponent;
  let fixture: ComponentFixture<RegistrantionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrantionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrantionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
