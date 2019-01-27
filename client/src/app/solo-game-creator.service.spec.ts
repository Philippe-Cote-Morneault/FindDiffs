import { TestBed } from '@angular/core/testing';

import { SoloGameCreatorService } from './solo-game-creator.service';

describe('SoloGameCreatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoloGameCreatorService = TestBed.get(SoloGameCreatorService);
    expect(service).toBeTruthy();
  });
});
