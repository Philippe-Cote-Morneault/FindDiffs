import { TestBed } from '@angular/core/testing';

import { SceneParserService } from './scene/scene-parser.service';

describe('SceneParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SceneParserService = TestBed.get(SceneParserService);
    expect(service).toBeTruthy();
  });
});
