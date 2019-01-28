import {expect} from "chai";
import * as fs from "fs";
import { Bitmap } from "../../model/bitmap/bitmap";
import { BitmapDecoder } from "./bitmapDecoder";
import { DifferenceDector } from "./differenceDetector";

interface BmpTests {
    bitmap?: Bitmap;
    path: string;
    differenceCount: number;
}

describe("DiffenceDetector", () => {
    describe("countDifferences()", () => {
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

        bitmapTests.forEach((bmp: BmpTests) => {
            it("Should return " + bmp.differenceCount + " for " + bmp.path, () => {
                const detector: DifferenceDector = new DifferenceDector(bmp.bitmap as Bitmap);
                expect(detector.countDifferences()).to.equal(bmp.differenceCount);
            });
        });

    });
});
