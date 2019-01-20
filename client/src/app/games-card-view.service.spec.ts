import { TestBed } from '@angular/core/testing';

import { GamesCardViewService } from './games-card-view.service';

describe('GamesCardViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GamesCardViewService = TestBed.get(GamesCardViewService);
    expect(service).toBeTruthy();
  });

  it('sorting [] should return []', () => {
    let gameTest = new GamesCardViewService();
    const result: number[]= gameTest.getBestTime([]);
    expect(result).toEqual([]);
  });
});
