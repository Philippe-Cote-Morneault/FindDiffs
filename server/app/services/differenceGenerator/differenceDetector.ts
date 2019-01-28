import { Bitmap } from "../../model/bitmap/bitmap";
import { COLOR, Pixel, Position } from "../../model/bitmap/pixel";

export class DifferenceDetector {

    private image: Bitmap;
    private pixels: VisitedPixels[];
    private blackPixel: Pixel;

    public constructor(image: Bitmap) {
        this.image = image;
        this.pixels = new Array<VisitedPixels>();

        image.pixelData.forEach((pixel: Pixel) => {
            this.pixels.push({
                pixel: pixel,
                visited: false,
            });
        });
        this.blackPixel = Pixel.fromColor(COLOR.BLACK);
    }
    private canVisit(index: number): boolean {

        return this.pixels[index].pixel.equals(this.blackPixel) && !this.pixels[index].visited;
    }
    private visitNextTo(index: number): void {
        const toCheck: number[] = new Array<number>();
        toCheck.push(index);

        // Check all the pixels arround the pixel
        while (toCheck.length !== 0) {
            const indexToCheck: number = toCheck.pop() as number;

            const pos: Position = Position.fromIndex(indexToCheck, this.image.width);
            const newPos: Position = pos.clone();

            for (let x: number = -1; x <= 1; x++) {
                for (let y: number = -1; y <= 1; y++) {
                    newPos.x = pos.x + x;
                    newPos.y = pos.y + y;

                    if (newPos.isInBound(this.image.width, this.image.height)) {
                        const i: number = newPos.getIndex(this.image.width);
                        if (this.canVisit(i)) {
                            this.pixels[i].visited = true;
                            toCheck.push(i);
                        }
                    }
                }
            }
        }
    }

    public countDifferences(): number {
        let differenceCount: number = 0;
        for (let i: number = 0; i < this.pixels.length; i++) {
            if (this.canVisit(i)) {
                this.visitNextTo(i);
                differenceCount++;
            }
        }

        return differenceCount;
    }
}

interface VisitedPixels {
    pixel: Pixel;
    visited: boolean;
}
