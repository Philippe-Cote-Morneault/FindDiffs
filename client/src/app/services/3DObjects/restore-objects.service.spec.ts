import { TestBed } from '@angular/core/testing';

import { RestoreObjectsService } from './restore-objects.service';

describe('RestoreObjectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestoreObjectsService = TestBed.get(RestoreObjectsService);
    expect(service).toBeTruthy();
  });
});
