import { Bitmap } from "../../model/bitmap/bitmap";
import { Storage } from "../../utils/storage/storage";
import { BitmapEncoder } from "./bitmapEncoder";
import { DifferenceDetector } from "./differenceDetector";
import { DifferenceImageGenerator } from "./differenceImageGenerator";

export class Difference {
    public originalImage: Bitmap;
    public modifiedImage: Bitmap;
    public difference: Bitmap;

    public constructor(originalImage: Bitmap, modifiedImage: Bitmap) {
        this.originalImage = originalImage;
        this.modifiedImage = modifiedImage;
    }

    public async saveStorage(): Promise<string> {
        const differenceImageGenerator: DifferenceImageGenerator = new DifferenceImageGenerator(
            this.originalImage,
            this.modifiedImage,
        );

        this.difference = differenceImageGenerator.generateImage();

        return Storage.saveBuffer(BitmapEncoder.encodeBitmap(this.difference));
    }

    public countDifferences(): number {
        return new DifferenceDetector(this.difference).countDifferences();
    }
}
