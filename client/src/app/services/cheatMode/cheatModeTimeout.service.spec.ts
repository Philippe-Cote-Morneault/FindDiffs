import { TestBed } from "@angular/core/testing";

import { CheatModeTimeoutService } from "./cheatModeTimeout.service";

describe("TimerService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CheatModeTimeoutService = TestBed.get(CheatModeTimeoutService);
    expect(service).toBeTruthy();
  });
});
