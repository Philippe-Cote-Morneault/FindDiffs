import { expect } from "chai";
import { AuthentificationService } from "./authentificationService";

describe("AuthentificationService", () => {

    describe("getInstance()", () => {
        it("Should return a GameService instance", () => {
            const instance: AuthentificationService = AuthentificationService.getInstance();
            expect(instance).to.be.an.instanceOf(AuthentificationService);
        });

        it("Should return the same GameService instance", () => {
            const instance1: AuthentificationService = AuthentificationService.getInstance();
            const instance2: AuthentificationService = AuthentificationService.getInstance();
            expect(instance1).to.equal(instance2);
        });
    });


});