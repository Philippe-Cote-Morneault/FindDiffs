import { expect } from "chai";
import { SceneGenerator} from "./sceneGenerator";

describe("SceneGenerator", () => {
    describe("getGrid()", () => {
        it("Should return an undefined grid", () => {
            // tslint:disable-next-line:no-magic-numbers
            const generator: SceneGenerator = new SceneGenerator(100);
            expect(generator.getGrid()).to.equal(undefined);
        });
    });
});
