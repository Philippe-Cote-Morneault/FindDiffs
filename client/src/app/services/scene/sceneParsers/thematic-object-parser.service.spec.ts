import { TestBed } from '@angular/core/testing';

import { ThematicObjectParserService } from './thematic-object-parser.service';

describe('ThematicObjectParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThematicObjectParserService = TestBed.get(ThematicObjectParserService);
    expect(service).toBeTruthy();
  });
});
