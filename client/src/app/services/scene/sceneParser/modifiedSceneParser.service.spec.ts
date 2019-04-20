import { expect } from "chai";
import * as THREE from "three";
import { ObjectType } from "../../../../../../common/model/scene/scene";
import { sceneModifications } from "../../../tests/scene/geometricSceneModificationsMock";
import { ICommonSceneAndObjects } from "./ICommonSceneAndObjects";
import { ModifiedSceneParserService } from "./modifiedSceneParser.service";

describe("ModifiedSceneParserService", () => {
    const modifiedSceneParserService: ModifiedSceneParserService = new ModifiedSceneParserService(ObjectType.Geometric);

    it("Should create a scene with the right amount of objects.", async () => {
        const numberOfObjects: number = 2;
        const sceneAndObjects: ICommonSceneAndObjects =
            await modifiedSceneParserService.parseModifiedScene(new THREE.Scene(), sceneModifications);
        const threeScene: THREE.Scene = sceneAndObjects.scene;
        expect(threeScene.children.length).to.equal(numberOfObjects);
    });
});
