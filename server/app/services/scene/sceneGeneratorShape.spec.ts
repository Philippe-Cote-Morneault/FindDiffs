import { expect } from "chai";
import { SceneGeneratorShape} from "./sceneGeneratorShape";

describe("SceneGenerator", () => {
    describe("getGrid()", () => {
        it("Should return an undefined grid", () => {
            // tslint:disable-next-line:no-magic-numbers
            const generator: SceneGeneratorShape = new SceneGeneratorShape(100);
            expect(generator.getGrid()).to.equal(undefined);
        });
    });
});
