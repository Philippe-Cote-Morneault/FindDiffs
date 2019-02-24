import { expect } from "chai";
import * as fs from "fs";
import * as sinon from "sinon";
import { Bitmap } from "../../model/bitmap/bitmap";
import { BitmapDecoder } from "../../utils/bitmap/bitmapDecoder";
import { BitmapEncoder } from "../../utils/bitmap/bitmapEncoder";
import { Storage } from "../../utils/storage/storage";
import { Difference } from "./difference";
import { DifferenceImageGenerator } from "./differenceImageGenerator";

describe("Difference", () => {
    describe("saveStorage()", () => {

        beforeEach(() => {
            sinon.stub(DifferenceImageGenerator.prototype, "generateImage");
            sinon.stub(BitmapEncoder, "encodeBitmap");
            sinon.stub(Storage, "saveBuffer");
        });
        afterEach(() => {
            (DifferenceImageGenerator.prototype.generateImage as sinon.SinonStub).restore();
            (BitmapEncoder.encodeBitmap as sinon.SinonStub).restore();
            (Storage.saveBuffer as sinon.SinonStub).restore();
        });

        it("Should save the image to the storage and return an id", async () => {
            const responseId: string = "an id";
            (DifferenceImageGenerator.prototype.generateImage as sinon.SinonStub).returns(undefined);
            (Storage.saveBuffer as sinon.SinonStub).resolves(responseId);
            (BitmapEncoder.encodeBitmap as sinon.SinonStub).returns(undefined);
            const bitmap: Bitmap = Bitmap.prototype;
            const difference: Difference = new Difference(bitmap, bitmap);

            expect(await difference.saveStorage()).to.equal(responseId);
        });
    });
    describe("countDifferences()", () => {
        let bitmap: Bitmap;
        beforeEach(() => {
            bitmap = BitmapDecoder.FromArrayBuffer(
                fs.readFileSync("test/testBitmaps/differenceCount/blank.bmp").buffer,
            );
        });

        it("Should return the number of differences", () => {
            const difference: Difference = new Difference(bitmap, bitmap);
            difference.difference = bitmap;

            expect(difference.countDifferences()).to.equal(0);
        });
    });
});
