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
    sinon.assert.calledOnce(stub);
    stub.restore();
  });

  it("should call toggleCheatMode four times in one second", () => {
    const stub: sinon.SinonStub = sinon.stub(cheatModeService, "toggleCheatMode");
    stub.callsFake(() => {});
    jasmine.clock().install();
    cheatModeTimeoutService.startCheatMode(cheatModeService, scene, sceneModifications);
    jasmine.clock().tick(999);
    cheatModeTimeoutService.stopCheatMode();
    sinon.assert.callCount(stub, 4);
    stub.restore();
    jasmine.clock().uninstall();
  });
});
