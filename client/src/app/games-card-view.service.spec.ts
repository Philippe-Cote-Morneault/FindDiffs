import { TestBed } from '@angular/core/testing';

import { GamesCardViewService } from './games-card-view.service';

describe('GamesCardViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GamesCardViewService = TestBed.get(GamesCardViewService);
    expect(service).toBeTruthy();
  });
});
