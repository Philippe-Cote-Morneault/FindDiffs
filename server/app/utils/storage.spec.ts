import { expect } from "chai";
import { Storage } from "./storage";

describe("Storage", () => {
    describe("getPath()", () => {
        it("Should return a path with an id", () => {
            const guid: string = "an id";
            expect(`${Storage.STORAGE_PATH}/${guid}`).to.equal(Storage.getPath(guid));
        });
    });
    describe("generateGUID()", () => {
        it("Should return an id without an hyphen", () => {
            expect(Storage.generateGUID().split("-").length).to.equal(1);
        });
    });
});
