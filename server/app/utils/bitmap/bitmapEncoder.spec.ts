import {expect} from "chai";
import {readFileSync } from "fs";
import * as path from "path";
import { Bitmap } from "../../model/bitmap/bitmap";
import { BitmapDecoder } from "./bitmapDecoder";
import { BitmapEncoder } from "./bitmapEncoder";

describe("BitmapEncoder", () => {
    const flagBuffer: ArrayBuffer = readFileSync(
        path.resolve(__dirname, "../../../test/testBitmaps/FLAG_B24.bmp")).buffer;
    const bitmap1: Bitmap = BitmapDecoder.FromArrayBuffer(flagBuffer);

    describe("encodeBitmap()", () => {
        const encodedBitmap1: ArrayBuffer = BitmapEncoder.encodeBitmap(bitmap1);

        it("Should return an ArrayBuffer the same length as the original file", () => {
            expect(encodedBitmap1.byteLength).to.equal(flagBuffer.byteLength);
        });

        it("Should return an ArrayBuffer matching the ArrayBuffer from the original bmp file", () => {
            let isEquals: boolean = true;
            for (let i: number = 0; i < encodedBitmap1.byteLength; ++i) {
                if (encodedBitmap1[i] !== flagBuffer[i]) {
                    isEquals = false;
                    break;
                }
            }
            expect(isEquals).to.equal(true);
        });

    });
});
