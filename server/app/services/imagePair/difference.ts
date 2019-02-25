import { Bitmap } from "../../model/bitmap/bitmap";
import { BitmapEncoder } from "../../utils/bitmap/bitmapEncoder";
import { Storage } from "../../utils/storage/storage";
import { DifferenceDetector } from "./differenceDetector";
import { DifferenceImageGenerator } from "./differenceImageGenerator";

export class Difference {
    public differenceCount: number;

    private originalImg: Bitmap;
    private modifiedImg: Bitmap;
    private differenceImg: Bitmap;
    private diffDetector: DifferenceDetector;

    public constructor(originalImage: Bitmap, modifiedImage: Bitmap) {
        this.differenceCount = 0;
        this.originalImg = originalImage;
        this.modifiedImg = modifiedImage;
    }

    public compute(): void {
        const differenceImageGenerator: DifferenceImageGenerator = new DifferenceImageGenerator(
            this.originalImg,
            this.modifiedImg,
        );
        this.differenceImg = differenceImageGenerator.generateImage();

        this.diffDetector = new DifferenceDetector(this.differenceImg);
        this.differenceCount = this.diffDetector.countDifferences();
    }

    public async saveImg(): Promise<string> {
        return Storage.saveBuffer(
            BitmapEncoder.encodeBitmap(this.differenceImg),
        );
    }

    public async saveJson(): Promise<string> {
        return Storage.saveBuffer(
            Buffer.from(JSON.stringify(this.diffDetector.pixels)).buffer,
        );
    }
}
