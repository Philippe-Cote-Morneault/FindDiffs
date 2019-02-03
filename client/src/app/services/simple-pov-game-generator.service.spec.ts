import { TestBed } from '@angular/core/testing';

import { SimplePovGameGeneratorService } from './simple-pov-game-generator.service';

describe('SimplePovGameGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimplePovGameGeneratorService = TestBed.get(SimplePovGameGeneratorService);
    expect(service).toBeTruthy();
  });
});
