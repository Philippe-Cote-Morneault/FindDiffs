import { TestBed } from '@angular/core/testing';

import { ImagePairService } from './image-pair.service';

describe('ImagePairService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImagePairService = TestBed.get(ImagePairService);
    expect(service).toBeTruthy();
  });
});
