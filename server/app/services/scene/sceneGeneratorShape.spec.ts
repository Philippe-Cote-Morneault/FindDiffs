import { expect } from "chai";
import { ICommonScene, ObjectType } from "../../../../common/model/scene/scene";
import { Grid } from "./grid/grid";
import { SceneGeneratorShape} from "./sceneGeneratorShape";

describe("SceneGenerator", () => {
    const OBJECT_TO_GENERATE: number = 100;
    describe("generateScene()", () => {
        it("Should generate a scene with a random background color, and should not be the same color", () => {
            const ITERATION_NUMBER: number = 10;
            const data: Set<number> = new Set<number>();
            for (let i: number = 0; i < ITERATION_NUMBER; i++) {
                const generator: SceneGeneratorShape = new SceneGeneratorShape(OBJECT_TO_GENERATE);
                data.add(generator.generateScene().bg_color);
            }
            // tslint:disable-next-line:no-magic-numbers
            expect(data.size).to.be.greaterThan(7).and.to.be.lte(ITERATION_NUMBER);
        });
        it("Should have the number of objects specified in the constructor", () => {
            const generator: SceneGeneratorShape = new SceneGeneratorShape(OBJECT_TO_GENERATE);
            const scene: ICommonScene = generator.generateScene();
            expect(scene.sceneObjects.length).to.equal(OBJECT_TO_GENERATE);
        });
        it("Should have the type Geometric", () => {
            const generator: SceneGeneratorShape = new SceneGeneratorShape(OBJECT_TO_GENERATE);
            const scene: ICommonScene = generator.generateScene();
            expect(scene.type).to.equal(ObjectType.Geometric);
        });
        it("Should have the dimensions specified", () => {
            const generator: SceneGeneratorShape = new SceneGeneratorShape(OBJECT_TO_GENERATE);
            const scene: ICommonScene = generator.generateScene();
            expect(scene.dimensions.x).to.equal(SceneGeneratorShape.SCENE_SIZE);
            expect(scene.dimensions.y).to.equal(SceneGeneratorShape.SCENE_HEIGHT);
            expect(scene.dimensions.z).to.equal(SceneGeneratorShape.SCENE_SIZE);
        });
    });
    describe("getGrid()", () => {
        it("Should return an undefined grid", () => {
            // tslint:disable-next-line:no-magic-numbers
            const generator: SceneGeneratorShape = new SceneGeneratorShape(OBJECT_TO_GENERATE);
            expect(generator.getGrid()).to.equal(undefined);
        });
        it("Should return the grid if the scene was generated before", () => {
            const generator: SceneGeneratorShape = new SceneGeneratorShape(OBJECT_TO_GENERATE);
            generator.generateScene();
            expect((generator.getGrid() as Grid).getPositions().length).to.be.greaterThan(0);
        });
    });
});
