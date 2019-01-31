import {expect} from "chai";
import {readFileSync } from "fs";
import { BitmapDecoder } from "./bitmapDecoder";
import { BitmapEncoder } from "./bitmapEncoder";
import { Bitmap } from "../../model/bitmap/bitmap";


describe("BitmapEncoder", () => {
    let path = require("path");
    const flagBuffer: ArrayBuffer = readFileSync(
        path.resolve(__dirname, "../../../test/testBitmaps/FLAG_B24.bmp")).buffer;
    const bitmap1: Bitmap = BitmapDecoder.FromArrayBuffer(flagBuffer);

    describe("encodeBitmap()", () => {
        const encodedBitmap1: ArrayBuffer = BitmapEncoder.encodeBitmap(bitmap1);

        it("Should return an ArrayBuffer equal to the original file", () => {
            expect(encodedBitmap1.byteLength).to.equal(flagBuffer.byteLength);
        });

    });
});
