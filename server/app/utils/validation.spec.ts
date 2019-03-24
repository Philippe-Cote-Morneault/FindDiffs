/*
import { expect } from "chai";
import { Validation } from "./validation";
describe("Validation", () => {
    describe("isValidName()", () => {
        it("Should detect if the name length is under 3 and mark it as invalid", () => {
            const name: string = "ab";
            expect(Validation.isValidName(name)).to.equal(false);
        });
        it("Should detect if the name lenght is over 12 and mark it as invalid", () => {
            const name: string = "aaaaaaaaaaaaa";
            expect(Validation.isValidName(name)).to.equal(false);
        });
        it("Should detect if the name is not alpha numeric and mark it as invalid", () => {
            const name: string = "-+-=";
            expect(Validation.isValidName(name)).to.equal(false);
        });
        it("Should detect if the name length is between 3 and 12 and mark it as valid", () => {
            const name: string = "michel6";
            expect(Validation.isValidName(name)).to.equal(true);
        });
        it("Should detect if the name is alpha and mark it as valid", () => {
            const name: string = "MonNomCGab";
            expect(Validation.isValidName(name)).to.equal(true);
        });
        it("Should detect if the name is numeric and mark it as valid", async () => {
            const name: string = "123456789";
            expect(Validation.isValidName(name)).to.equal(true);
        });
    });
});
*/