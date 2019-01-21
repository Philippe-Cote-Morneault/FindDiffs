import { Bitmap } from "../model/bitmap/bitmap";
import { COLOR, Pixel, Position } from "../model/pixel";

export class DifferenceImageGenerator {

    private static BRUSH: number[][] = [
        [0, 0, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 0],
    ];
    private originalImage: Bitmap;
    private modifiedImage: Bitmap;

    public constructor(originalImage: Bitmap, modifiedImage: Bitmap) {
        this.originalImage = originalImage;
        this.modifiedImage = modifiedImage;
    }

    public generateImage(): Bitmap {
        const differentPixelsArray: Pixel[] = this.findDifferentPixels();
        // TODO insert bitmap

    }

    private findDifferentPixels(): Pixel[] {
        const differencePixelArray: Pixel[] = new Array<Pixel>(this.originalImage.height * this.originalImage.width);

        differencePixelArray.fill(Pixel.fromColor(COLOR.WHITE));

        for (let i: number = 0; i < differencePixelArray.length; ++i) {
            if (this.originalImage.pixelData[i].equals(this.modifiedImage.pixelData[i])) {
                this.enlargeOnePixel(differencePixelArray, i);
            }
        }

        return differencePixelArray;
    }

    private enlargeOnePixel(pixels: Pixel[], index: number): void {
        const pos: Position =  new Position(index % this.originalImage.width, Math.floor(index / this.originalImage.width));

        // tslint:disable-next-line:no-magic-numbers
        const brushSize: number = Math.floor(DifferenceImageGenerator.BRUSH.length / 2);
        pos.x -= brushSize;
        pos.y -= brushSize;

        // DRAW the circle around the position
        DifferenceImageGenerator.BRUSH.forEach((line: number[]) => {
            line.forEach((pixelBrush: number) => {
                if (pixelBrush === 1) {
                    this.drawPixel(pixels, pos);
                }
            });
        });
    }

    private drawPixel(pixels: Pixel[], pos: Position): void {
        if ( pos.x >= 0 && pos.x <= this.originalImage.width && pos.y >= 0 && pos.y <= this.originalImage.height ) {
            // Calculate the position of the pixel
            const index: number = pos.x * pos.y + pos.x;
            pixels[index] = Pixel.fromColor(COLOR.BLACK);
        }
    }
}
