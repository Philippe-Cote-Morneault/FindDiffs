import { Bitmap } from "../../model/bitmap/bitmap";
import { COLOR, Pixel } from "../../model/bitmap/pixel";
import { BitmapDecoder } from "./bitmapDecoder";
import { Canvas } from "./canvas";

export class DifferenceImageGenerator {

    private originalImage: Bitmap;
    private modifiedImage: Bitmap;

    public constructor(originalImage: Bitmap, modifiedImage: Bitmap) {
        this.originalImage = originalImage;
        this.modifiedImage = modifiedImage;
    }

    public generateImage(): Bitmap {
        return BitmapDecoder.fromPixels(this.findDifferentPixels(), this.originalImage);
    }

    private findDifferentPixels(): Pixel[] {
        const differencePixelArray: Pixel[] = new Array<Pixel>(this.originalImage.height * this.originalImage.width);
        const painter: Canvas = new Canvas(this.originalImage.width, this.originalImage.height);

        differencePixelArray.fill(Pixel.fromColor(COLOR.WHITE));

        this.originalImage.pixelData.forEach((pixel: Pixel, i: number) => {
            if (!pixel.equals(this.modifiedImage.pixelData[i])) {
                painter.enlargePixel(differencePixelArray, i);
            }
        });

        return differencePixelArray;
    }

}
