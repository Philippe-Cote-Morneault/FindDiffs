import {expect} from "chai";
import {readFileSync, writeFileSync} from "fs";
import { Bitmap } from "../../model/bitmap/bitmap";
import { BitmapDecoder } from "./bitmapDecoder";
import { BitmapEncoder } from "./bitmapEncoder";
import { DifferenceImageGenerator } from "./differenceImageGenerator";

/* tslint:disable:no-magic-numbers */

describe("Bitmap", () => {

    it("read bmp", () => {
        let path = require("path");
        // Original image
        const bitmap: Bitmap = BitmapDecoder.FromArrayBuffer(readFileSync(
            path.resolve(__dirname, "../../../test/testBitmaps/FLAG_B24.BMP")).buffer);
        // Edited image
        const bitmapEdited: Bitmap = BitmapDecoder.FromArrayBuffer(readFileSync(
            path.resolve(__dirname, "../../../test/testBitmaps/FLAG_B24_EDITED.BMP")).buffer);

        // Create generator
        const generator: DifferenceImageGenerator = new DifferenceImageGenerator(bitmap, bitmapEdited);
        // The bitmap created by the algorithm
        const finalMap: Bitmap = generator.generateImage();

        // Write the new map made by algorithm
        writeFileSync("testing123.bmp", new Buffer(BitmapEncoder.encodeBitmap(finalMap)));

        expect(bitmap.header.fileSize).to.equal("");
    });

});
