import { TestBed } from '@angular/core/testing';

import { GeometricObjectParserService } from './geometric-object-parser.service';

describe('GeometricObjectParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeometricObjectParserService = TestBed.get(GeometricObjectParserService);
    expect(service).toBeTruthy();
  });
});
