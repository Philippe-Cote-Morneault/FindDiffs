import { expect } from "chai";
import * as THREE from "three";
import { ObjectType } from "../../../../../../common/model/scene/scene";
import { sceneModifications } from "../../../tests/scene/geometricSceneModificationsMock";
import { ModifiedSceneParserService } from "./modifiedSceneParser.service";

describe("ModifiedSceneParserService", () => {
    const modifiedSceneParserService: ModifiedSceneParserService = new ModifiedSceneParserService(ObjectType.Geometric);

    it("Should create a scene with the right amount of objects.", async () => {
        const threeScene: THREE.Scene = await modifiedSceneParserService.parseModifiedScene(new THREE.Scene(), sceneModifications);
        expect(threeScene.children.length).
            // tslint:disable-next-line:no-magic-numbers
            to.equal(2);
    });
});