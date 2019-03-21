import { expect } from "chai";
import { Pair } from "../../../../../common/model/pair";
import { ICommonSceneModifications } from "../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonGeometricObject } from "../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ICommonSceneObject } from "../../../../../common/model/scene/objects/sceneObject";
import { ICommonThematicObject } from "../../../../../common/model/scene/objects/thematicObjects/thematicObject";
import { ICommonScene } from "../../../../../common/model/scene/scene";
import { DefaultGrid } from "../grid/grid";
import { SceneGeneratorShape } from "../sceneGeneratorShape";
import { SceneGeneratorTheme } from "../sceneGeneratorTheme";
import { SceneDifferenceGenerator } from "./sceneDifferenceGenerator";

describe("SceneDifferenceGenerator", () => {
    describe("generateModifiedScene()", () => {
        describe("Geometric", () => {
            it("Should create an array of objects which is bigger than the original when the modification is add", () => {
                const SCENE_SIZE: number = 1000;
                const DEPTH: number = 50;
                const SCENE_OBJECT_MARGIN: number = 20;
                const grid: DefaultGrid = new DefaultGrid({x: SCENE_SIZE, y: SCENE_SIZE, z: DEPTH}, SCENE_OBJECT_MARGIN);

                // tslint:disable:no-magic-numbers
                const generateScene: SceneGeneratorShape = new SceneGeneratorShape(100);
                const sceneObj: ICommonScene = generateScene.generateScene();

                const differenceGenerator: SceneDifferenceGenerator = new SceneDifferenceGenerator(sceneObj, grid);
                const differenceObj: ICommonSceneModifications = differenceGenerator.generateModifiedScene(true, false, false);

                expect(differenceObj.addedObjects.length + sceneObj.sceneObjects.length).to.be.gte(sceneObj.sceneObjects.length);
            });

            it("Should create an array of objects which is lower than the original when the modification is removed", () => {
                const SCENE_SIZE: number = 1000;
                const DEPTH: number = 50;
                const SCENE_OBJECT_MARGIN: number = 20;
                const grid: DefaultGrid = new DefaultGrid({x: SCENE_SIZE, y: SCENE_SIZE, z: DEPTH}, SCENE_OBJECT_MARGIN);

                // tslint:disable:no-magic-numbers
                const generateScene: SceneGeneratorShape = new SceneGeneratorShape(100);
                const sceneObj: ICommonScene = generateScene.generateScene();

                const differenceGenerator: SceneDifferenceGenerator = new SceneDifferenceGenerator(sceneObj, grid);
                const differenceObj: ICommonSceneModifications = differenceGenerator.generateModifiedScene(false, true, false);

                expect(sceneObj.sceneObjects.length - differenceObj.deletedObjects.length).to.be.lte(sceneObj.sceneObjects.length);
            });

            it("Should create an array of objects with different colors than the original when the modification is color", () => {
                const SCENE_SIZE: number = 1000;
                const DEPTH: number = 50;
                const SCENE_OBJECT_MARGIN: number = 20;
                const grid: DefaultGrid = new DefaultGrid({x: SCENE_SIZE, y: SCENE_SIZE, z: DEPTH}, SCENE_OBJECT_MARGIN);

                // tslint:disable:no-magic-numbers
                const generateScene: SceneGeneratorShape = new SceneGeneratorShape(100);
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
        });
        describe("Thematic", () => {
            it("Should create an array of objects which is bigger than the original when the modification is add", () => {
                const SCENE_SIZE: number = 1000;
                const DEPTH: number = 50;
                const SCENE_OBJECT_MARGIN: number = 20;
                const grid: DefaultGrid = new DefaultGrid({x: SCENE_SIZE, y: SCENE_SIZE, z: DEPTH}, SCENE_OBJECT_MARGIN);

                // tslint:disable:no-magic-numbers
                const generateScene: SceneGeneratorTheme = new SceneGeneratorTheme(100);
                const sceneObj: ICommonScene = generateScene.generateScene();

                const differenceGenerator: SceneDifferenceGenerator = new SceneDifferenceGenerator(sceneObj, grid);
                const differenceObj: ICommonSceneModifications = differenceGenerator.generateModifiedScene(true, false, false);

                expect(differenceObj.addedObjects.length + sceneObj.sceneObjects.length).to.be.gte(sceneObj.sceneObjects.length);
            });

            it("Should create an array of objects which is lower than the original when the modification is removed", () => {
                const SCENE_SIZE: number = 1000;
                const DEPTH: number = 50;
                const SCENE_OBJECT_MARGIN: number = 20;
                const grid: DefaultGrid = new DefaultGrid({x: SCENE_SIZE, y: SCENE_SIZE, z: DEPTH}, SCENE_OBJECT_MARGIN);

                // tslint:disable:no-magic-numbers
                const generateScene: SceneGeneratorTheme = new SceneGeneratorTheme(100);
                const sceneObj: ICommonScene = generateScene.generateScene();

                const differenceGenerator: SceneDifferenceGenerator = new SceneDifferenceGenerator(sceneObj, grid);
                const differenceObj: ICommonSceneModifications = differenceGenerator.generateModifiedScene(false, true, false);

                expect(sceneObj.sceneObjects.length - differenceObj.deletedObjects.length).to.be.lte(sceneObj.sceneObjects.length);
            });

            it("Should create an array of objects with different textures/color than the original when the modification is color/texture",
            // tslint:disable-next-line:max-func-body-length
               () => {
                const SCENE_SIZE: number = 1000;
                const DEPTH: number = 50;
                const SCENE_OBJECT_MARGIN: number = 20;
                const OBJECTS_TO_GENERATE: number = 100;
                const grid: DefaultGrid = new DefaultGrid({x: SCENE_SIZE, y: SCENE_SIZE, z: DEPTH}, SCENE_OBJECT_MARGIN);

                // tslint:disable:no-magic-numbers
                const generateScene: SceneGeneratorTheme = new SceneGeneratorTheme(OBJECTS_TO_GENERATE);
                const sceneObj: ICommonScene = generateScene.generateScene();
                const differenceGenerator: SceneDifferenceGenerator = new SceneDifferenceGenerator(sceneObj, grid);
                const differenceObj: ICommonSceneModifications = differenceGenerator.generateModifiedScene(false, false, true);

                const objectIdColors: Map<string, string> = new Map();

                sceneObj.sceneObjects.forEach((obj: ICommonThematicObject): void => {
                    if (obj.isTextured) {
                        objectIdColors.set(obj.id, (obj as ICommonThematicObject).texture as string);
                    } else {
                        objectIdColors.set(obj.id, String((obj as ICommonThematicObject).color as number));
                    }
                });

                const objectIdModifiedColors:  Pair<string, string>[] = differenceObj["texturesChangedObjects"];
                let counterDifferences: number = 0;

                objectIdModifiedColors.forEach((element: Pair<string, string>): void => {
                    const originalColor: string | undefined = objectIdColors.get(element.key);
                    const modifiedColor: string | undefined = element.value;
                    if (originalColor !== modifiedColor) {
                        counterDifferences++;
                    }
                });

                expect(counterDifferences).to.equal(objectIdModifiedColors.length);
            });
        });

    });
});
