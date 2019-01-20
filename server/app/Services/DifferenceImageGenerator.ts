import { Bitmap, Pixel, COLOR } from "../model/Bitmap";


export class DifferenceImageGenerator {
    public constructor() {

    }

    public static generateImage(originalImage: Bitmap, modifiedImage: Bitmap):Bitmap {


        return new Bitmap(new ArrayBuffer(0));
    }

    private static findDifferentPixels(originalImage: Bitmap, modifiedImage: Bitmap): Pixel[] {
        let differencePixelArray = new Array<Pixel>(originalImage.height * originalImage.width);
        for(let i = 0; i < differencePixelArray.length; ++i) {
            differencePixelArray[i] = originalImage.pixelData[i].equals(modifiedImage.pixelData[i]) 
            ? Pixel.fromColor(COLOR.WHITE) 
            : Pixel.fromColor(COLOR.WHITE);
        }
        return differencePixelArray;
    }

    private static enlargeDifferentPixels(pixels: Pixel[]): Pixel[] {
        let enlargedPixelsArray = new Array<Pixel>(pixels.length);
        enlargedPixelsArray.fill(Pixel.fromColor(COLOR.WHITE));

        for(let i = 0; i < pixels.length; ++i) {
            if(pixels[i].equals(Pixel.fromColor(COLOR.BLACK))) {
                this.enlargeOnePixel(enlargedPixelsArray, i);
            }
        }
    }

    // TODO: Find an algorithm for this
    private static enlargeOnePixel(pixels: Pixel[], index: number) {
        for (let y = 0; y < )
    }
}