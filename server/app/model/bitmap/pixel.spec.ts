import {expect} from "chai";
import { Position } from "./pixel";

/*tslint:disable no-magic-numbers */

describe("Pixel - Position", () => {
    describe("getIndex()", () => {
        it("Should return 0 if position is 0 0", () => {
            const position: Position = new Position(0, 0);
            expect(position.getIndex(5)).to.equals(0);
        });
        it("Should return 5 if the position is 4 0", () => {
            const position: Position = new Position(4, 0);
            expect(position.getIndex(5)).to.equals(4);
        });
        it("Should return 19 if the position is 4, 3 and a width of 5", () => {
            const position: Position = new Position(4, 3);
            expect(position.getIndex(5)).to.equal(19);
        });
    });
});
