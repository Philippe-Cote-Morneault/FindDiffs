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

  describe("startCheatMode()", () => {
    it("should start the cheat mode by changing cheatActivated to true", () => {
      const stub: sinon.SinonStub = sinon.stub(cheatModeService, "toggleCheatMode").callsFake(
        () => {cheatModeService.cheatActivated = !cheatModeService.cheatActivated;
      });
      cheatModeTimeoutService.startCheatMode(cheatModeService, scene, sceneModifications);
      expect(cheatModeService.cheatActivated).to.be.true;
      cheatModeTimeoutService.stopCheatMode();
      stub.restore();
    });

    it("should make the objects flash by changing cheatActivated to false", () => {
      const stub: sinon.SinonStub = sinon.stub(cheatModeService, "toggleCheatMode");
      stub.callsFake(() => {});
      jasmine.clock().install();
      cheatModeTimeoutService.startCheatMode(cheatModeService, scene, sceneModifications);
      jasmine.clock().tick(125);
      cheatModeTimeoutService.stopCheatMode();
      expect(cheatModeService.cheatActivated).to.be.false;
      stub.restore();
      jasmine.clock().uninstall();
    })
    it("should call toggleCheatMode once when startCheatMode is called", () => {
      const stub: sinon.SinonStub = sinon.stub(cheatModeService, "toggleCheatMode").callsFake(() => {});
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
      sinon.assert.callCount(stub, 8);
      stub.restore();
      jasmine.clock().uninstall();
    });
  });

  describe("stopCheatMode", () => {
    it("should stop calling toggleCheatMode", () => {
      const stub: sinon.SinonStub = sinon.stub(cheatModeService, "toggleCheatMode");
      stub.callsFake(() => {});
      jasmine.clock().install();
      cheatModeTimeoutService.startCheatMode(cheatModeService, scene, sceneModifications);
      cheatModeTimeoutService.stopCheatMode();
      stub.resetHistory();
      jasmine.clock().tick(999);
      sinon.assert.callCount(stub, 0);
      stub.restore();
      jasmine.clock().uninstall();
    });
  });

  describe("ngOnInit()", () => {
    it("should call stopCheatMode() on initialisation", () => {
      const stub: sinon.SinonStub = sinon.stub(cheatModeService, "toggleCheatMode");
      stub.callsFake(() => {});
      const spy: sinon.SinonSpy = sinon.spy(cheatModeTimeoutService, "stopCheatMode");
      jasmine.clock().install();
      cheatModeTimeoutService.startCheatMode(cheatModeService, scene, sceneModifications);
      cheatModeTimeoutService.ngOnInit();
      jasmine.clock().tick(999);
      sinon.assert.calledOnce(spy);
      stub.restore();
      spy.restore();
      jasmine.clock().uninstall();
    });

    it("should stop an active timer on initialisation", () => {
      const stub: sinon.SinonStub = sinon.stub(cheatModeService, "toggleCheatMode");
      stub.callsFake(() => {});
      jasmine.clock().install();
      cheatModeTimeoutService.startCheatMode(cheatModeService, scene, sceneModifications);
      cheatModeTimeoutService.ngOnInit();
      stub.resetHistory();
      jasmine.clock().tick(999);
      sinon.assert.callCount(stub, 0);
      stub.restore();
      jasmine.clock().uninstall();
    });
  });
});
