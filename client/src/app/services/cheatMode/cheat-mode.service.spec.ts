
import { TestBed } from "@angular/core/testing";
import { expect } from "chai";
import { CheatModeService } from "./cheat-mode.service";
// tslint:disable
describe("Tests for CheatModeService", () => {

  let cheatModeService: CheatModeService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    cheatModeService = new CheatModeService();
  });

  describe("testing the value of cheatActivated attribute in various situations", () => {
    it("should be false on creation of the service", () => {
      expect(cheatModeService.cheatActivated).to.be.false;
    });
  });
});