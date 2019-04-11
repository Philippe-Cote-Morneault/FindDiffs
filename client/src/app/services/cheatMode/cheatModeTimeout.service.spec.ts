import { expect } from "chai";
import * as sinon from "sinon";
import { sceneModifications } from "../../tests/scene/geometricSceneModificationsMock";
import { scene } from "../../tests/scene/sceneMock";
import { CheatModeService } from "./cheatMode.service";
import { CheatModeTimeoutService } from "./cheatModeTimeout.service";

describe("CheatModeTimeoutService", () => {

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
      expect(cheatModeService.cheatActivated).to.equal(true);
      cheatModeTimeoutService.stopCheatMode();
      stub.restore();
    });

    it("should make the objects flash by changing cheatActivated to false", () => {
      const stub: sinon.SinonStub = sinon.stub(cheatModeService, "toggleCheatMode");
      stub.returns({});

      jasmine.clock().install();
      cheatModeTimeoutService.startCheatMode(cheatModeService, scene, sceneModifications);
      const delay8ThSecond: number = 125;
      jasmine.clock().tick(delay8ThSecond);
      cheatModeTimeoutService.stopCheatMode();
      expect(cheatModeService.cheatActivated).to.equal(false);
      stub.restore();
      jasmine.clock().uninstall();
    });

    it("should call toggleCheatMode once when startCheatMode is called", () => {
      const stub: sinon.SinonStub = sinon.stub(cheatModeService, "toggleCheatMode");
      stub.returns({});

      cheatModeTimeoutService.startCheatMode(cheatModeService, scene, sceneModifications);
      cheatModeTimeoutService.stopCheatMode();
      sinon.assert.calledOnce(stub);
      stub.restore();
    });

    it("should call toggleCheatMode four times in one second", () => {
      const stub: sinon.SinonStub = sinon.stub(cheatModeService, "toggleCheatMode");
      stub.returns({});

      jasmine.clock().install();
      cheatModeTimeoutService.startCheatMode(cheatModeService, scene, sceneModifications);
      const sleepTime: number = 999;
      jasmine.clock().tick(sleepTime);
      cheatModeTimeoutService.stopCheatMode();
      const callCountOfToggleCheatMode: number = 8;
      sinon.assert.callCount(stub, callCountOfToggleCheatMode);
      stub.restore();
      jasmine.clock().uninstall();
    });
  });

  describe("stopCheatMode()", () => {
    it("should stop calling toggleCheatMode", () => {
      const stub: sinon.SinonStub = sinon.stub(cheatModeService, "toggleCheatMode");
      stub.returns({});

      jasmine.clock().install();
      cheatModeTimeoutService.startCheatMode(cheatModeService, scene, sceneModifications);
      cheatModeTimeoutService.stopCheatMode();
      stub.resetHistory();
      const sleepTime: number = 999;
      jasmine.clock().tick(sleepTime);
      sinon.assert.callCount(stub, 0);
      stub.restore();
      jasmine.clock().uninstall();
    });
  });

  describe("ngOnInit()", () => {
    it("should call stopCheatMode() on initialization", () => {
      const stub: sinon.SinonStub = sinon.stub(cheatModeService, "toggleCheatMode");
      stub.returns({});

      const spy: sinon.SinonSpy = sinon.spy(cheatModeTimeoutService, "stopCheatMode");
      jasmine.clock().install();
      cheatModeTimeoutService.startCheatMode(cheatModeService, scene, sceneModifications);
      cheatModeTimeoutService.ngOnInit();
      const sleepTime: number = 999;
      jasmine.clock().tick(sleepTime);
      sinon.assert.calledOnce(spy);
      stub.restore();
      spy.restore();
      jasmine.clock().uninstall();
    });

    it("should stop an active timer on initialization", () => {
      const stub: sinon.SinonStub = sinon.stub(cheatModeService, "toggleCheatMode");
      stub.returns({});

      jasmine.clock().install();
      cheatModeTimeoutService.startCheatMode(cheatModeService, scene, sceneModifications);
      cheatModeTimeoutService.ngOnInit();
      stub.resetHistory();
      const sleepTime: number = 999;
      jasmine.clock().tick(sleepTime);
      sinon.assert.callCount(stub, 0);
      stub.restore();
      jasmine.clock().uninstall();
    });
  });
});
