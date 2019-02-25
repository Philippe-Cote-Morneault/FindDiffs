import { expect } from "chai";
import { sceneModifications } from "src/app/tests/scene/geometricSceneModificationsMock";
import { scene } from "src/app/tests/scene/sceneMock";
import { ModifiedSceneParserService } from "./modified-scene-parser.service";

describe("ModifiedSceneParserService", () => {
    const modifiedSceneParserService: ModifiedSceneParserService = new ModifiedSceneParserService();
    const numberOfLightsInScene: number = 5;

    it("Should create a scene with the right amount of objects.", () => {
        const sceneChildrenCount: number = numberOfLightsInScene + 1 + scene.sceneObjects.length +
            sceneModifications.addedObjects.length - sceneModifications.deletedObjects.length;

        expect(modifiedSceneParserService.parseModifiedScene(scene, sceneModifications).children.length).to.equal(sceneChildrenCount);
    });
});
