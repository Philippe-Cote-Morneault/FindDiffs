import { expect } from "chai";
import { ICommonScene, ICommonThematicScene, ObjectType } from "../../../../common/model/scene/scene";
import { Grid } from "./grid/grid";
import { SceneGeneratorShape} from "./sceneGeneratorShape";
import { SceneGeneratorTheme } from "./sceneGeneratorTheme";

describe("SceneGeneratorTheme", () => {
    const OBJECT_TO_GENERATE: number = 100;
    describe("generateScene()", () => {
        it("Should generate a scene with a background theme", () => {
            const generator: SceneGeneratorTheme = new SceneGeneratorTheme(OBJECT_TO_GENERATE);
            const texture: string = (generator.generateScene() as ICommonThematicScene).texture;
            expect(texture).to.equal("default");
        });
        it("Should create the number of objects specified in the constructor", () => {
            const generator: SceneGeneratorTheme = new SceneGeneratorTheme(OBJECT_TO_GENERATE);
            const scene: ICommonScene = generator.generateScene();
            expect(scene.sceneObjects.length).to.equal(OBJECT_TO_GENERATE);
        });
        it("Should create a scene with the type Thematic", () => {
            const generator: SceneGeneratorTheme = new SceneGeneratorTheme(OBJECT_TO_GENERATE);
            const scene: ICommonScene = generator.generateScene();
            expect(scene.type).to.equal(ObjectType.Thematic);
        });
        it("Should create a scene with the dimensions specified", () => {
            const generator: SceneGeneratorTheme = new SceneGeneratorTheme(OBJECT_TO_GENERATE);
            const scene: ICommonScene = generator.generateScene();
            expect(scene.dimensions.x).to.equal(SceneGeneratorShape.SCENE_SIZE);
            expect(scene.dimensions.y).to.equal(SceneGeneratorShape.SCENE_HEIGHT);
            expect(scene.dimensions.z).to.equal(SceneGeneratorShape.SCENE_SIZE);
        });
    });
    describe("getGrid()", () => {
        it("Should return an undefined grid if the scene was not generated before", () => {
            // tslint:disable-next-line:no-magic-numbers
            const generator: SceneGeneratorTheme = new SceneGeneratorTheme(OBJECT_TO_GENERATE);
            expect(generator.getGrid()).to.equal(undefined);
        });
        it("Should return the grid if the scene was generated before", () => {
            const generator: SceneGeneratorTheme = new SceneGeneratorTheme(OBJECT_TO_GENERATE);
            generator.generateScene();
            expect((generator.getGrid() as Grid).getPositions().length).to.be.greaterThan(0);
        });
    });
});
