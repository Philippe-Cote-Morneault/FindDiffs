import { expect } from "chai";
import * as sinon from "sinon";
import { ICommonGeometricModifications } from "../../../../../common/model/scene/modifications/geometricModifications";
import { ICommonThematicModifications } from "../../../../../common/model/scene/modifications/thematicModifications";
import { ObjectType } from "../../../../../common/model/scene/scene";
import { sceneModifications } from "../../tests/scene/geometricSceneModificationsMock";
import { scene } from "../../tests/scene/sceneMock";
import { SceneLoaderService } from "../scene/sceneLoader/sceneLoader.service";
import { ModifiedSceneParserService } from "../scene/sceneParser/modifiedSceneParser.service";
import { SceneParserService } from "../scene/sceneParser/sceneParser.service";
import { CheatModeService } from "./cheatMode.service";
import { CheatModeHandlerService } from "./cheatModeHandler.service";
import { CheatModeTimeoutService } from "./cheatModeTimeout.service";

// tslint:disable
describe("CheatModeHandlerService", () => {

    let cheatModeHandlerService: CheatModeHandlerService;
    let cheatModeService: CheatModeService;
    let cheatModeTimeoutService: CheatModeTimeoutService;
    let originalLoaderService: SceneLoaderService;
    let modifiedLoaderService: SceneLoaderService;
    let modifiedScene: ICommonGeometricModifications & ICommonThematicModifications;

    beforeEach(() => {
        cheatModeService = new CheatModeService();
        cheatModeTimeoutService = new CheatModeTimeoutService();
        cheatModeHandlerService = new CheatModeHandlerService(cheatModeService, cheatModeTimeoutService);    
    });

    describe("keyPressed()", () => {
        beforeEach(async () => {
            modifiedScene = (sceneModifications as ICommonGeometricModifications & ICommonThematicModifications);
            originalLoaderService = new SceneLoaderService();
            modifiedLoaderService = new SceneLoaderService();
            originalLoaderService.scene = await new SceneParserService(scene).parseScene();
            modifiedLoaderService.scene = 
              await new ModifiedSceneParserService(ObjectType.Geometric).parseModifiedScene(originalLoaderService.scene, modifiedScene);
        });
        it("should call startCheatMode once", () => {
            const stub: sinon.SinonStub = sinon.stub(cheatModeTimeoutService, "startCheatMode").callsFake(() => {});
            const event: KeyboardEvent = new KeyboardEvent("KeyboardEvent", {key: "t"});
            cheatModeHandlerService.keyPressed(event, originalLoaderService, modifiedLoaderService);
            expect(stub.calledOnce).to.be.true;
            stub.restore();
        });
    });
});
