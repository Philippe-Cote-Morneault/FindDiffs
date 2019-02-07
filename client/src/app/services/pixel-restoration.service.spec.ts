import { TestBed } from "@angular/core/testing";

import { PixelRestorationService } from "./pixel-restoration.service";

describe("PixelRestorationService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: PixelRestorationService = TestBed.get(PixelRestorationService);
    expect(service).toBeTruthy();
  });
});
