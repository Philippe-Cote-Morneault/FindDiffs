import { Bitmap } from "../model/Bitmap/Bitmap";
import { Pixel, COLOR } from "../model/Pixel";

export class DifferenceImageGenerator {

    public static generateImage(originalImage: Bitmap, modifiedImage: Bitmap): Bitmap {
        let differentPixelsArray: Pixel[] = this.findDifferentPixels(originalImage, modifiedImage);

        return new Bitmap(new ArrayBuffer(0));
    }

    private static findDifferentPixels(originalImage: Bitmap, modifiedImage: Bitmap): Pixel[] {
        let differencePixelArray: Pixel[] = new Array<Pixel>(originalImage.height * originalImage.width);
        differencePixelArray.fill(Pixel.fromColor(COLOR.WHITE));
        for (let i: number = 0; i < differencePixelArray.length; ++i) {
            if (originalImage.pixelData[i].equals(modifiedImage.pixelData[i])) {
                this.enlargeOnePixel(differencePixelArray, i);
            }
        }

        return differencePixelArray;
    }

    // TODO: Find an algorithm for this
    private static enlargeOnePixel(pixels: Pixel[], index: number) {
        for(let y = 0; y < 7; ++y) {
            for(let x = 0; x < 7; ++x) {
                
            }
        }
    }
}