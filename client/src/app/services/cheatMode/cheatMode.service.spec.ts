import { TestBed } from "@angular/core/testing";

import { CheatModeService } from "./cheatMode.service";

describe("CheatModeService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CheatModeService = TestBed.get(CheatModeService);
    expect(service).toBeTruthy();
  });
});
