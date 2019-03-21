
import { TestBed } from "@angular/core/testing";
import { expect } from "chai";
import { CheatModeService } from "./cheat-mode.service";
// tslint:disable
describe("Tests pour le service: CheatModeService", () => {

  const cheatModeService: CheatModeService = new CheatModeService();
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be false on creation", () => {
    expect(cheatModeService.cheatActivated).to.be.false;
  });
});