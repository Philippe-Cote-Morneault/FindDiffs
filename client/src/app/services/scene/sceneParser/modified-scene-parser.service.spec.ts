import { expect } from "chai";
import * as THREE from "three";
import { ObjectType } from "../../../../../../common/model/scene/scene";
import { sceneModifications } from "../../../tests/scene/geometricSceneModificationsMock";
import { scene } from "../../../tests/scene/sceneMock";
import { ModifiedSceneParserService } from "./modified-scene-parser.service";

describe("ModifiedSceneParserService", () => {
    const modifiedSceneParserService: ModifiedSceneParserService = new ModifiedSceneParserService(ObjectType.Geometric);
    const numberOfLightsInScene: number = 5;

    it("Should create a scene with the right amount of objects.", async () => {
        const sceneChildrenCount: number = numberOfLightsInScene + 1 + scene.sceneObjects.length +
            sceneModifications.addedObjects.length - sceneModifications.deletedObjects.length;
        const threeScene: THREE.Scene = await modifiedSceneParserService.parseModifiedScene(new THREE.Scene(), sceneModifications);
        expect(threeScene.children.length).
            to.equal(sceneChildrenCount);
    });
});
