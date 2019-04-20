import { expect } from "chai";
import * as sinon from "sinon";
import { ICommonGeometricModifications } from "../../../../../common/model/scene/modifications/geometricModifications";
import { ICommonThematicModifications } from "../../../../../common/model/scene/modifications/thematicModifications";
import { ObjectType } from "../../../../../common/model/scene/scene";
import { sceneModifications } from "../../tests/scene/geometricSceneModificationsMock";
import { scene } from "../../tests/scene/sceneMock";
import { SceneLoaderService } from "../scene/sceneLoader/sceneLoader.service";
import { ICommonSceneAndObjects } from "../scene/sceneParser/ICommonSceneAndObjects";
import { ModifiedSceneParserService } from "../scene/sceneParser/modifiedSceneParser.service";
import { SceneParserService } from "../scene/sceneParser/sceneParser.service";
import { CheatModeService } from "./cheatMode.service";
import { CheatModeHandlerService } from "./cheatModeHandler.service";
import { CheatModeTimeoutService } from "./cheatModeTimeout.service";

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
            const sceneAndObjectsOriginal: ICommonSceneAndObjects = await new SceneParserService(scene).parseScene();
            originalLoaderService.scene = sceneAndObjectsOriginal.scene;
            const sceneAndObjectsModified: ICommonSceneAndObjects =
                await new ModifiedSceneParserService(ObjectType.Geometric).parseModifiedScene(originalLoaderService.scene, modifiedScene);
            modifiedLoaderService.scene = sceneAndObjectsModified.scene;
        });

        it("should call startCheatMode once", () => {
            const stub: sinon.SinonStub = sinon.stub(cheatModeTimeoutService, "startCheatMode");
            stub.returns({});

            const event: KeyboardEvent = new KeyboardEvent("KeyboardEvent", {key: "t"});
            cheatModeHandlerService.keyPressed(event, originalLoaderService, modifiedLoaderService);
            expect(stub.calledOnce).to.equal(true);
            stub.restore();
        });

        it("should call stopCheatMode once", () => {
            const startStub: sinon.SinonStub = sinon.stub(cheatModeTimeoutService, "startCheatMode");
            startStub.returns({});
            const stopStub: sinon.SinonStub = sinon.stub(cheatModeTimeoutService, "stopCheatMode");
            stopStub.returns({});

            const event: KeyboardEvent = new KeyboardEvent("KeyboardEvent", {key: "t"});
            cheatModeHandlerService.keyPressed(event, originalLoaderService, modifiedLoaderService);
            cheatModeHandlerService.keyPressed(event, originalLoaderService, modifiedLoaderService);
            expect(stopStub.calledOnce).to.equal(true);
            startStub.restore();
            stopStub.restore();
        });

        it("should call toggleCheatMode if cheatActivated is true when the cheat mode is disabled", () => {
            const startStub: sinon.SinonStub = sinon.stub(cheatModeTimeoutService, "startCheatMode");
            startStub.returns({});
            const stopStub: sinon.SinonStub = sinon.stub(cheatModeTimeoutService, "stopCheatMode");
            stopStub.returns({});
            const cheatModeStub: sinon.SinonStub = sinon
            .stub(cheatModeHandlerService.cheatModeService, "toggleCheatMode");
            cheatModeStub.returns({});
            const event: KeyboardEvent = new KeyboardEvent("KeyboardEvent", {key: "t"});
            cheatModeHandlerService.keyPressed(event, originalLoaderService, modifiedLoaderService);
            cheatModeHandlerService.cheatModeService.cheatActivated = true;
            cheatModeHandlerService.keyPressed(event, originalLoaderService, modifiedLoaderService);
            expect(cheatModeStub.calledOnce).to.equal(true);
            startStub.restore();
            stopStub.restore();
            cheatModeStub.restore();
        });
    });
});
