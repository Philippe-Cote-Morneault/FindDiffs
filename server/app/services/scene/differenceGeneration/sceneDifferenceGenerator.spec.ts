import { expect } from "chai";
import { ICommonSceneModifications } from "../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonScene } from "../../../../../common/model/scene/scene";
import { DefaultGrid } from "../grid";
import { SceneGenerator } from "../sceneGenerator";
import { SceneDifferenceGenerator } from "./sceneDifferenceGenerator";

describe("GeometricObjectGenerator", () => {
    describe("generateModifiedScene()", () => {
        it("Should return an array of objects which is bigger than the original", () => {
            const SCENE_SIZE: number = 1000;
            const SCENE_OBJECT_MARGIN: number = 20;
            const grid: DefaultGrid = new DefaultGrid(SCENE_SIZE, SCENE_SIZE, SCENE_OBJECT_MARGIN);

            // tslint:disable:no-magic-numbers
            const generateScene: SceneGenerator = new SceneGenerator(100);
            const sceneObj: ICommonScene = generateScene.generateScene();

            const differenceGenerator: SceneDifferenceGenerator = new SceneDifferenceGenerator(sceneObj, grid);
            const differenceObj: ICommonSceneModifications = differenceGenerator.generateModifiedScene(true, false, false);

            expect(differenceObj.addedObjects.length + sceneObj.sceneObjects.length).to.be.gte(sceneObj.sceneObjects.length);
        });
        it("Should return an array of objects which is lower than the original", () => {
            const SCENE_SIZE: number = 1000;
            const SCENE_OBJECT_MARGIN: number = 20;
            const grid: DefaultGrid = new DefaultGrid(SCENE_SIZE, SCENE_SIZE, SCENE_OBJECT_MARGIN);

            // tslint:disable:no-magic-numbers
            const generateScene: SceneGenerator = new SceneGenerator(100);
            const sceneObj: ICommonScene = generateScene.generateScene();

            const differenceGenerator: SceneDifferenceGenerator = new SceneDifferenceGenerator(sceneObj, grid);
            const differenceObj: ICommonSceneModifications = differenceGenerator.generateModifiedScene(false, true, false);

            expect(sceneObj.sceneObjects.length - differenceObj.addedObjects.length).to.be.lte(sceneObj.sceneObjects.length);
        });
    });
});
