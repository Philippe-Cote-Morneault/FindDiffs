import {expect} from "chai";
import * as fs from "fs";
import { Bitmap } from "../../model/bitmap/bitmap";
import { Position } from "../../model/bitmap/pixel";
import { DIFF_COUNT_PIXELS_INDEX } from "../../tests/testData";
import { BitmapDecoder } from "../../utils/bitmap/bitmapDecoder";
import { DifferenceDetector } from "./differenceDetector";

interface BmpTests {
    bitmap?: Bitmap;
    path: string;
    differenceCount: number;
}

describe("DiffenceDetector", () => {
    const bitmapTests: BmpTests[] = [
        {
            bitmap: undefined,
            path: "test/testBitmaps/differenceCount/blank.bmp",
            differenceCount: 0,
        },
        {
            bitmap: undefined,
            path: "test/testBitmaps/differenceCount/3.bmp",
            differenceCount: 3,
        },
        {
            bitmap: undefined,
            path: "test/testBitmaps/differenceCount/7.bmp",
            differenceCount: 7,
        },
    ];

    before(async () => {
        await Promise.all(bitmapTests.map(async(bmp: BmpTests) => {
            await new Promise((resolve: Function) => fs.readFile(bmp.path, (err: Error, data: Buffer) => {
                bmp.bitmap = BitmapDecoder.FromArrayBuffer(data.buffer);
                resolve();
            }));
        }));
    });

    describe("countDifferences()", () => {

        bitmapTests.forEach((bmp: BmpTests) => {
            it("Should return " + bmp.differenceCount + " for " + bmp.path, () => {
                const detector: DifferenceDetector = new DifferenceDetector(bmp.bitmap as Bitmap);
                expect(detector.countDifferences()).to.equal(bmp.differenceCount);
            });
        });
    });

    describe("getPixelIndexes()", () => {
        it("Should return expected values for the blacked pixels", () => {
            const BITMAP_CHOICE: number = 1;
            const bitmap: Bitmap = bitmapTests[BITMAP_CHOICE].bitmap as Bitmap;
            const X_POS: number = 228;
            const Y_POS: number = 302;

            const detector: DifferenceDetector = new DifferenceDetector(bitmap as Bitmap);
            const numbers: number[] = detector.getPixelIndexes(
                    new Position(X_POS, Y_POS).getIndex(bitmap.width),
                );
            expect(numbers).to.eql(DIFF_COUNT_PIXELS_INDEX);
        });
    });
});
