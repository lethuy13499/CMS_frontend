import { TestBed } from '@angular/core/testing';

import { RegistrantionService } from './registrantion.service';

describe('RegistrantionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrantionService = TestBed.get(RegistrantionService);
    expect(service).toBeTruthy();
  });
});
