import { TestBed } from '@angular/core/testing';

import { GamesListViewService } from './games-list-view.service';

describe('GamesListViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GamesListViewService = TestBed.get(GamesListViewService);
    expect(service).toBeTruthy();
  });
});
