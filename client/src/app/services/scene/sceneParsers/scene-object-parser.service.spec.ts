import { TestBed } from '@angular/core/testing';

import { SceneObjectParserService } from './scene-object-parser.service';

describe('SceneObjectParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SceneObjectParserService = TestBed.get(SceneObjectParserService);
    expect(service).toBeTruthy();
  });
});
