import { expect } from "chai";
import { ScenePositionService } from "./scenePositionService";

describe("ScenePositionService", () => {
    describe("getInstance()", () => {
        it("Should return a ScenePositionService instance", () => {
            const instance: ScenePositionService = ScenePositionService.getInstance();
            expect(instance).to.be.an.instanceOf(ScenePositionService);
        });

        it("Should return the same GameService instance", () => {
            const instance1: ScenePositionService = ScenePositionService.getInstance();
            const instance2: ScenePositionService = ScenePositionService.getInstance();
            expect(instance1).to.equal(instance2);
        });
    });
});
