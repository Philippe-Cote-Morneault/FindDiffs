import { expect } from "chai";
import { GameService } from "./gameService";

describe("GameService", () => {
    describe("getInstance()", () => {
        it("Should return a GameService instance", () => {
            const instance: GameService = GameService.getInstance();
            expect(instance).to.be.an.instanceOf(GameService);
        });

        it("Should return the same GameService instance", () => {
            const instance1: GameService = GameService.getInstance();
            const instance2: GameService = GameService.getInstance();
            expect(instance1).to.equal(instance2);
        });
    });
});
