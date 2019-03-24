import { TestBed } from '@angular/core/testing';

import { ObjectRestorationService } from './object-restoration.service';

describe('ObjectRestorationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);
    expect(service).toBeTruthy();
  });
});
