import { TestBed } from '@angular/core/testing';

import { MousePositionService } from './mouse-position.service';

describe('MousePositionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MousePositionService = TestBed.get(MousePositionService);
    expect(service).toBeTruthy();
  });
});
