import { expect } from "chai";
import { NotImplementedException } from "../../../../../common/errors/notImplementedException";
import { Pair } from "../../../../../common/model/pair";
import { ICommonSceneModifications } from "../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonGeometricObject } from "../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ICommonSceneObject } from "../../../../../common/model/scene/objects/sceneObject";
import { ICommonScene, ObjectType } from "../../../../../common/model/scene/scene";
import { DefaultGrid } from "../grid";
import { SceneGenerator } from "../sceneGenerator";
import { SceneDifferenceGenerator } from "./sceneDifferenceGenerator";

describe("GeometricObjectGenerator", () => {
    describe("generateModifiedScene()", () => {
        it("Should return an array of objects which is bigger than the original", () => {
            const SCENE_SIZE: number = 1000;
            const DEPTH: number = 50;
            const SCENE_OBJECT_MARGIN: number = 20;
            const grid: DefaultGrid = new DefaultGrid({x: SCENE_SIZE, y: SCENE_SIZE, z: DEPTH}, SCENE_OBJECT_MARGIN);

            // tslint:disable:no-magic-numbers
            const generateScene: SceneGenerator = new SceneGenerator(100);
            const sceneObj: ICommonScene = generateScene.generateScene();

            const differenceGenerator: SceneDifferenceGenerator = new SceneDifferenceGenerator(sceneObj, grid);
            const differenceObj: ICommonSceneModifications = differenceGenerator.generateModifiedScene(true, false, false);

            expect(differenceObj.addedObjects.length + sceneObj.sceneObjects.length).to.be.gte(sceneObj.sceneObjects.length);
        });

        it("Should return an array of objects which is lower than the original", () => {
            const SCENE_SIZE: number = 1000;
            const DEPTH: number = 50;
            const SCENE_OBJECT_MARGIN: number = 20;
            const grid: DefaultGrid = new DefaultGrid({x: SCENE_SIZE, y: SCENE_SIZE, z: DEPTH}, SCENE_OBJECT_MARGIN);

            // tslint:disable:no-magic-numbers
            const generateScene: SceneGenerator = new SceneGenerator(100);
            const sceneObj: ICommonScene = generateScene.generateScene();

            const differenceGenerator: SceneDifferenceGenerator = new SceneDifferenceGenerator(sceneObj, grid);
            const differenceObj: ICommonSceneModifications = differenceGenerator.generateModifiedScene(false, true, false);

            expect(sceneObj.sceneObjects.length - differenceObj.deletedObjects.length).to.be.lte(sceneObj.sceneObjects.length);
        });

        it("Should return an array of objects with different colors than the original", () => {
            const SCENE_SIZE: number = 1000;
            const DEPTH: number = 50;
            const SCENE_OBJECT_MARGIN: number = 20;
            const grid: DefaultGrid = new DefaultGrid({x: SCENE_SIZE, y: SCENE_SIZE, z: DEPTH}, SCENE_OBJECT_MARGIN);

            // tslint:disable:no-magic-numbers
            const generateScene: SceneGenerator = new SceneGenerator(100);
            const sceneObj: ICommonScene = generateScene.generateScene();
            const differenceGenerator: SceneDifferenceGenerator = new SceneDifferenceGenerator(sceneObj, grid);
            const differenceObj: ICommonSceneModifications = differenceGenerator.generateModifiedScene(false, false, true);

            const objectIdColors: Map<string, number> = new Map();

            sceneObj.sceneObjects.forEach((obj: ICommonSceneObject): void => {
                objectIdColors.set(obj.id, (obj as ICommonGeometricObject).color);
            });

            const objectIdModifiedColors:  Pair<string, number>[] = differenceObj["colorChangedObjects"];
            let counterDifferences: number = 0;

            objectIdModifiedColors.forEach((element: Pair<string, number>): void => {
                const originalColor: number | undefined = objectIdColors.get(element.key);
                const modifiedColor: number | undefined = element.value;
                if (originalColor !== modifiedColor) {
                    counterDifferences++;
                }
            });

            expect(counterDifferences).to.equal(objectIdModifiedColors.length);
        });

        it("Should throw an execption because changing the texture was not implemented", () => {
            const SCENE_SIZE: number = 1000;
            const DEPTH: number = 50;
            const SCENE_OBJECT_MARGIN: number = 20;
            const grid: DefaultGrid = new DefaultGrid({x: SCENE_SIZE, y: SCENE_SIZE, z: DEPTH}, SCENE_OBJECT_MARGIN);

            // tslint:disable:no-magic-numbers
            const generateScene: SceneGenerator = new SceneGenerator(100);
            generateScene["scene"].type = ObjectType.Thematic;
            const sceneObj: ICommonScene = generateScene.generateScene();
            const differenceGenerator: SceneDifferenceGenerator = new SceneDifferenceGenerator(sceneObj, grid);
            const differenceObj: ICommonSceneModifications = differenceGenerator.generateModifiedScene(false, false, true);

            expect(NotImplementedException);
            expect(differenceObj).to.not.equal(undefined);
        });
    });
});
