import {expect} from "chai";
import * as fs from "fs";
import { Bitmap } from "../../model/bitmap/bitmap";
import { COLOR, Pixel } from "../../model/bitmap/pixel";
import { BitmapDecoder } from "./bitmapDecoder";
import { DifferenceImageGenerator } from "./differenceImageGenerator";

/*tslint:disable no-magic-numbers*/

describe("DifferenceImageGenerator - Generator", () => {
    let bitmapA: Bitmap;
    let bitmapB: Bitmap;

    before("Preparing test images" , () => {
        const dataA: ArrayBuffer = fs.readFileSync("test/testBitmaps/checker.bmp").buffer;
        const dataB: ArrayBuffer = fs.readFileSync("test/testBitmaps/checker-b.bmp").buffer;
        bitmapA = BitmapDecoder.FromArrayBuffer(dataA);
        bitmapB = BitmapDecoder.FromArrayBuffer(dataB);
    });

    describe("generateImage()", () => {

        it("Same images should produce a white image", () => {
            const newBitmap: Bitmap = new DifferenceImageGenerator(bitmapA, bitmapA).generateImage();
            const whitePixel: Pixel = Pixel.fromColor(COLOR.WHITE);
            const whiteCount: number = newBitmap.pixelData.filter(
                    (x: Pixel) => x.equals(whitePixel),
                ).length;
            expect(whiteCount).to.equal(newBitmap.height * newBitmap.width);
        });

        it("Diffrent images of one pixel should produce 37 black pixels", () => {
            const newBitmap: Bitmap = new DifferenceImageGenerator(bitmapA, bitmapB).generateImage();
            const blackPixel: Pixel = Pixel.fromColor(COLOR.BLACK);
            const blackCount: number = newBitmap.pixelData.filter(
                    (x: Pixel) => x.equals(blackPixel),
                ).length;
            expect(blackCount).to.equal(37);
        });

    });
});
