import {expect} from "chai";
import * as fs from "fs";
import { Bitmap } from "../../model/bitmap/bitmap";
import { COLOR, Pixel } from "../../model/bitmap/pixel";
import { BitmapDecoder } from "./bitmapDecoder";
import { DifferenceImageGenerator } from "./differenceImageGenerator";

/*tslint:disable no-magic-numbers*/

const isColor: Function = (pixels: Pixel[], color: COLOR) => {

    const whitePixel: Pixel = Pixel.fromColor(color);
    const whitePixels: Pixel[] = pixels.filter((x: Pixel) => x.equals(whitePixel));

    return whitePixels.length === pixels.length;
};

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

            expect(isColor(newBitmap.pixelData, COLOR.WHITE)).to.equal(true);
        });

        it("Diffrent images of one pixel should produce 37 black pixels", () => {
            const newBitmap: Bitmap = new DifferenceImageGenerator(bitmapA, bitmapB).generateImage();
            const blackCount: number = newBitmap.pixelData.filter(
                (x: Pixel) => x.equals(
                    Pixel.fromColor(COLOR.BLACK),
                    ),
                ).length;
            expect(blackCount).to.equal(37);
        });

    });
});
