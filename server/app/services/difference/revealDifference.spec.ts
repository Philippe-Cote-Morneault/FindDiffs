import { expect } from "chai";
import sinon = require("sinon");
import { ICommonReveal } from "../../../../common/model/reveal";
import { Bitmap } from "../../model/bitmap/bitmap";
import { Pixel, Position } from "../../model/bitmap/pixel";
import { R } from "../../strings";
import { NoErrorThrownException } from "../../tests/noErrorThrownException";
import { DifferenceDetector } from "../imagePair/differenceDetector";
import { RevealDifference } from "./revealDifference";

describe("RevealDifference", () => {
    describe("reveal()", () => {

        beforeEach(() => {
            sinon.stub(DifferenceDetector.prototype, "getPixelIndexes");
        });

        afterEach(() => {
            (DifferenceDetector.prototype.getPixelIndexes as sinon.SinonStub).restore();
        });

        it("Should throw an error if the selected pixel is not black", () => {
            const IMAGE_WIDTH: number = 480;
            const MAX_VALUE: number = 255;

            const posClicked: Position = new Position(0, 0);
            const pixelData: Pixel[]  = [
                new Pixel(
                    new Uint8Array([MAX_VALUE]),
                    new Uint8Array([MAX_VALUE]),
                    new Uint8Array([MAX_VALUE]),
                ),
            ];
            const bitmap: Bitmap = Bitmap.prototype;
            bitmap.width = IMAGE_WIDTH;
            bitmap.pixelData = pixelData;

            try {
                new RevealDifference(bitmap, posClicked).reveal();
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(R.ERROR_NO_DIFFERENCE_FOUND);
            }
        });

        it("Should return an ICommonReveal if the selected pixel is black", () => {
            const IMAGE_WIDTH: number = 480;

            const posClicked: Position = new Position(0, 0);
            const pixelData: Pixel[]  = [
                new Pixel(new Uint8Array([0]), new Uint8Array([0]), new Uint8Array([0])),
            ];
            const bitmap: Bitmap = Bitmap.prototype;
            bitmap.width = IMAGE_WIDTH;
            bitmap.pixelData = pixelData;

            (DifferenceDetector.prototype.getPixelIndexes as sinon.SinonStub).returns([0]);
            const reveal: ICommonReveal = {
                hit: true,
                pixels_affected: [
                    {
                        x: 0,
                        y: 0,
                    },
                ],
            };

            const revealDifference: RevealDifference = new RevealDifference(bitmap, posClicked);
            expect(revealDifference.reveal()).to.eql(reveal);
        });
    });
});
