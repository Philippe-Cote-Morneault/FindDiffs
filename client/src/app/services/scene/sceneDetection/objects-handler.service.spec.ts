import { TestBed } from '@angular/core/testing';

import { ObjectsHandlerService } from './objects-handler.service';

describe('ObjectsHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObjectsHandlerService = TestBed.get(ObjectsHandlerService);
    expect(service).toBeTruthy();
  });
});
