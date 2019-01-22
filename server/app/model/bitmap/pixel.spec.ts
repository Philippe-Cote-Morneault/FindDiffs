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
describe("Pixel", () => {
    describe("constructor()", () => {
        it("Should return a pixel with RGB value of (12, 44, 0)", () => {
            const pixel: Pixel = new Pixel(new Uint8Array([12]), new Uint8Array([44]), new Uint8Array([0]));
            expect(pixel.red[0]).to.equal(new Uint8Array([12])[0]);
            expect(pixel.green[0]).to.equal(new Uint8Array([44])[0]);
            expect(pixel.blue[0]).to.equal(new Uint8Array([0])[0]);
        });
    });
    describe("equals()", () => {
        it("Should return true when comparing two different pixels with the same values", () => {
            const pixel1: Pixel = new Pixel(new Uint8Array([10]), new Uint8Array([77]), new Uint8Array([22]));
            const pixel2: Pixel = new Pixel(new Uint8Array([10]), new Uint8Array([77]), new Uint8Array([22]));

            expect(pixel1.equals(pixel2)).to.equal(true);
        });

        it("Should return false when comparing two different pixels with different values", () => {
            const pixel1: Pixel = new Pixel(new Uint8Array([10]), new Uint8Array([77]), new Uint8Array([72]));
            const pixel2: Pixel = new Pixel(new Uint8Array([17]), new Uint8Array([71]), new Uint8Array([22]));

            expect(pixel1.equals(pixel2)).to.equal(false);
        });
    });
        });
    });
});
