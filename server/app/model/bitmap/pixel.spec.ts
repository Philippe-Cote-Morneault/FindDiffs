import {expect} from "chai";
import { COLOR, Pixel, Position } from "./pixel";

/*tslint:disable no-magic-numbers */

describe("Position", () => {
    describe("getIndex()", () => {
        it("Should calculate the correct index value when the position is 0,0 ", () => {
            const position: Position = new Position(0, 0);
            expect(position.getIndex(5)).to.equals(0);
        });
        it("Should calculate the correct index value when the position is 4,0", () => {
            const position: Position = new Position(4, 0);
            expect(position.getIndex(5)).to.equals(4);
        });
        it("Should calculate the correct index value when the position is 4,3 and a width of 5", () => {
            const position: Position = new Position(4, 3);
            expect(position.getIndex(5)).to.equals(19);
        });
    });
    describe("fromIndex()", () => {
        it("Should create a positon of 0,0 if index is 0", () => {
            const position: Position = Position.fromIndex(0, 10);
            const positionRef: Position = new Position(0, 0);
            expect(position).to.eql(positionRef);
        });
        it("Should create a position of 1,1 if index is 3 and the width is 2", () => {
            const position: Position = Position.fromIndex(3, 2);
            const positionRef: Position = new Position(1, 1);
            expect(position).to.eql(positionRef);
        });
        it("Should create a position of 0,3 if index is 3 and width is 1", () => {
            const position: Position = Position.fromIndex(3, 1);
            const positionRef: Position = new Position(0, 3);
            expect(position).to.eql(positionRef);
        });
    });
    describe("clone()", () => {
        it("Should create an exact copy of the source object", () => {
            const source: Position = new Position(5, 5);
            const destination: Position = source.clone();

            expect(source).to.eql(destination);
        });
    });
});
describe("Pixel", () => {
    describe("constructor()", () => {
        it("Should create a pixel with RGB value of (12, 44, 0)", () => {
            const pixel: Pixel = new Pixel(new Uint8Array([12]), new Uint8Array([44]), new Uint8Array([0]));
            expect(pixel.red[0]).to.equal(new Uint8Array([12])[0]);
            expect(pixel.green[0]).to.equal(new Uint8Array([44])[0]);
            expect(pixel.blue[0]).to.equal(new Uint8Array([0])[0]);
        });
    });
    describe("equals()", () => {
        it("Should detect two different pixels with the same values and return true", () => {
            const pixel1: Pixel = new Pixel(new Uint8Array([10]), new Uint8Array([77]), new Uint8Array([22]));
            const pixel2: Pixel = new Pixel(new Uint8Array([10]), new Uint8Array([77]), new Uint8Array([22]));

            expect(pixel1.equals(pixel2)).to.equal(true);
        });

        it("Should detect two different pixels with different values and return false", () => {
            const pixel1: Pixel = new Pixel(new Uint8Array([10]), new Uint8Array([77]), new Uint8Array([72]));
            const pixel2: Pixel = new Pixel(new Uint8Array([17]), new Uint8Array([71]), new Uint8Array([22]));

            expect(pixel1.equals(pixel2)).to.equal(false);
        });
    });
    describe("fromColor()", () => {
        it("Should create a black pixel if color is black", () => {
            const pixelBlack: Pixel = new Pixel(new Uint8Array([0]) , new Uint8Array([0]), new Uint8Array([0]));
            expect(pixelBlack).to.eql(Pixel.fromColor(COLOR.BLACK));
        });
        it("Should create a white pixel if color is white", () => {
            const pixelWhite: Pixel = new Pixel(new Uint8Array([255]) , new Uint8Array([255]), new Uint8Array([255]));
            expect(pixelWhite).to.eql(Pixel.fromColor(COLOR.WHITE));
        });
        it("Should create a white pixel if color is red", () => {
            const pixelWhite: Pixel = new Pixel(new Uint8Array([255]) , new Uint8Array([255]), new Uint8Array([255]));
            expect(pixelWhite).to.eql(Pixel.fromColor(COLOR.RED));
        });
    });
    describe("isInBound()", () => {
        it("Should detect that the position is out of bound when the position is negative on x and y", () => {
            const position: Position = new Position(-1, -1);
            expect(position.isInBound(1, 1)).to.equal(false);
        });
        it("Should detect that the position is out of bound when the position is negative on x axis", () => {
            const position: Position = new Position(-1, 0);
            expect(position.isInBound(1, 1)).to.equal(false);
        });
        it("Should detect that the position is out of bound when the position is negative on the y axis", () => {
            const position: Position = new Position(0, -1);
            expect(position.isInBound(1, 1)).to.equal(false);
        });
        it("Should detect that the position is out of bound when the width is 2 and height is 1 and the position is 0,5", () => {
            const position: Position = new Position(5, 0);
            expect(position.isInBound(2, 1)).to.equal(false);
        });
        it("Should detect that the position is out of bound when the position is 0, 5, height is 2 and width is 1", () => {
            const position: Position = new Position(0, 5);
            expect(position.isInBound(1, 2)).to.equal(false);
        });
        it("Should detect that the position is inbound when the position is 1, 5 and height is 10 and width is 5", () => {
            const position: Position = new Position(1, 5);
            expect(position.isInBound(5, 10)).to.equal(true);
        });
        it("Should detect that the position is inbbound when the position is 0, 0 and height is 1 and width is 1", () => {
            const position: Position = new Position(0, 0);
            expect(position.isInBound(1, 1)).to.equal(true);
        });
    });
});
