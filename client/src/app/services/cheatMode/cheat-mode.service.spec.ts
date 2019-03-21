
import { TestBed } from "@angular/core/testing";
import { expect } from "chai";
import * as sinon from "sinon";
import { ICommonGeometricModifications } from "../../../../../common/model/scene/modifications/geometricModifications";
import { ICommonThematicModifications } from "../../../../../common/model/scene/modifications/thematicModifications";
import { ObjectType } from "../../../../../common/model/scene/scene";
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

    it("should change cheatActivated to true when the method toggleCheatMode is called once", () => {
      const stub: sinon.SinonStub = sinon.stub(cheatModeService, "toggleCheatMode").callsFake(
        () => {cheatModeService.cheatActivated = !cheatModeService.cheatActivated;
      });
      const blankModifiedScene: ICommonGeometricModifications & ICommonThematicModifications = {
        id: "",
        type: ObjectType.Geometric,
        addedObjects: [],
        deletedObjects: [],
        colorChangedObjects: [],
        texturesChangedObjects: [],
      };
      cheatModeService.toggleCheatMode(blankModifiedScene);
      expect(cheatModeService.cheatActivated).to.be.true;
      stub.restore();
    });
  });
});