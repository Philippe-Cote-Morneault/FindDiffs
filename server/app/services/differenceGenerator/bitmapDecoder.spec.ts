import {expect} from "chai";
import {readFileSync} from "fs";
import { Bitmap } from "../../model/bitmap/bitmap";
import { BitmapDecoder } from "./bitmapDecoder";
//import { BitmapEncoder } from "./bitmapEncoder";
//import { DifferenceImageGenerator } from "./differenceImageGenerator";

/* tslint:disable:no-magic-numbers */

describe("BitmapDecoder", () => {
    const path = require("path");
    const flagBuffer: ArrayBuffer = readFileSync(
        path.resolve(__dirname, "../../../test/testBitmaps/FLAG_B24.bmp")).buffer;
    
    const flame1Buffer: ArrayBuffer = readFileSync(
        path.resolve(__dirname, "../../../test/testBitmaps/flame1.bmp")).buffer;

    const flame2Buffer: ArrayBuffer = readFileSync(
        path.resolve(__dirname, "../../../test/testBitmaps/flame2.bmp")).buffer;

    const bootsBuffer: ArrayBuffer = readFileSync(
        path.resolve(__dirname, "../../../test/testBitmaps/boots.jpg")).buffer;

    describe("fromArrayBuffer()", () => {
        it("Should create a bitmap with a height of 480 pixels", () => {
            const bitmap: Bitmap = BitmapDecoder.FromArrayBuffer(flagBuffer);
            expect(bitmap.height).to.equal(480);
        });
    
        it("Should create a bitmap with a width of 640 pixels", () => {
            const bitmap: Bitmap = BitmapDecoder.FromArrayBuffer(flagBuffer);
            expect(bitmap.width).to.equal(640);
        });

        describe("decodeHeader()", () => {
            it("Should create a bitmap with a file size of 921 738 bytes", () => {
                const bitmap: Bitmap = BitmapDecoder.FromArrayBuffer(flagBuffer);
                expect(bitmap.header.fileSize[0]).to.equal(921738);
            });

            it("should create a bitmap with an offset of 138 bytes", () => {
                const bitmap: Bitmap = BitmapDecoder.FromArrayBuffer(flagBuffer);
                expect(bitmap.header.dataOffset[0]).to.equal(138);
            });

            it("Should throw an exception if the image is not a bmp file", () => {
                expect(() => BitmapDecoder.FromArrayBuffer(bootsBuffer)).to.throw("Not a bmp file");
            });
        });

        describe("decodeInfoHeader()", () => {
            it("Should create a bitmap with a height of 480 pixels", () => {
                const bitmap: Bitmap = BitmapDecoder.FromArrayBuffer(flagBuffer);
                expect(bitmap.infoHeader.height[0]).to.equal(480);
            });

            it("Should create a bitmap with a width of 640 pixels", () => {
                const bitmap: Bitmap = BitmapDecoder.FromArrayBuffer(flagBuffer);
                expect(bitmap.infoHeader.width[0]).to.equal(640);
            });

            it("Should create a bitmap with 0 xPixelsPerM", () => {
                const bitmap: Bitmap = BitmapDecoder.FromArrayBuffer(flagBuffer);
                expect(bitmap.infoHeader.xPixelsPerM[0]).to.equal(0);
            });

            it("Should create a bitmap with 0 yPixelsPerM", () => {
                const bitmap: Bitmap = BitmapDecoder.FromArrayBuffer(flagBuffer);
                expect(bitmap.infoHeader.yPixelsPerM[0]).to.equal(0);
            });

            it("Should throw an exception if the height is bigger than 480 pixels", () => {
                expect(() => BitmapDecoder.FromArrayBuffer(flame1Buffer)).to.throw(
                    "Height is 481 pixels, should be 480 pixels");
            });

            it("Should throw an exception if the width is bigger than 640 pixels", () => {
                expect(() => BitmapDecoder.FromArrayBuffer(flame2Buffer)).to.throw(
                    "Width is 641 pixels, should be 640 pixels");
            });
        });

        describe("decodePixels()", () => {
            it("Should create a bitmap with pixels 307 200 pixels", () => {
                const bitmap: Bitmap = BitmapDecoder.FromArrayBuffer(flagBuffer);
                expect(bitmap.pixelData.length).to.equal(640 * 480);
            });
        });
            // Create generator
           // const generator: DifferenceImageGenerator = new DifferenceImageGenerator(bitmap, bitmapEdited);
            // The bitmap created by the algorithm
            //const finalMap: Bitmap = generator.generateImage();
    
            // Write the new map made by algorithm
            //writeFileSync("testing123.bmp", new Buffer(BitmapEncoder.encodeBitmap(finalMap)));
    });

    
});
