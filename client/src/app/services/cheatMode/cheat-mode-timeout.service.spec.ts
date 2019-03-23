import { expect } from "chai";
import * as sinon from "sinon";
import { sceneModifications } from "../../tests/scene/geometricSceneModificationsMock";
import { scene } from "../../tests/scene/sceneMock";
import { CheatModeTimeoutService } from "./cheat-mode-timeout.service";
import { CheatModeService } from "./cheat-mode.service";

// tslint:disable
describe("TimerService", () => {

  let cheatModeTimeoutService: CheatModeTimeoutService;
  let cheatModeService: CheatModeService;
  beforeEach(() => {
    cheatModeTimeoutService = new CheatModeTimeoutService;
    cheatModeService = new CheatModeService;
  });

  it("should call toggleCheatMode once", () => {
    const stub: sinon.SinonStub = sinon.stub(cheatModeService, "toggleCheatMode");
    stub.callsFake(() => {});
    cheatModeTimeoutService.startCheatMode(cheatModeService, scene, sceneModifications);
    cheatModeTimeoutService.stopCheatMode();
    expect(stub.calledOnce).to.be.true;
  });
});
