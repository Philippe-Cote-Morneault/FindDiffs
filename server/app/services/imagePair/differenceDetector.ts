import { Bitmap } from "../../model/bitmap/bitmap";
import { Pixel, Position } from "../../model/bitmap/pixel";
import { BLACK_PIXEL } from "./brush";

export class DifferenceDetector {

    public static readonly BLACK_UNVISITED: number = -1;
    public static readonly WHITE: number = 0;

    public pixels: number[];
    private differenceImage: Bitmap;

    public constructor(differenceImage: Bitmap) {
        this.differenceImage = differenceImage;
        this.pixels = new Array<number>();

        differenceImage.pixelData.forEach((pixel: Pixel) => {
            this.pixels.push(
                pixel.equals(BLACK_PIXEL) ? DifferenceDetector.BLACK_UNVISITED : DifferenceDetector.WHITE,
            );
        });
    }

    private canVisit(index: number): boolean {
        return this.pixels[index] === DifferenceDetector.BLACK_UNVISITED;
    }

    private visitNextTo(index: number, visitedPixels: number[], differenceId: number): void {
        const toCheck: number[] = new Array<number>();
        toCheck.push(index);
        visitedPixels.push(index);

        // Check all the pixels around the pixel
        while (toCheck.length !== 0) {
            this.lookAround(toCheck, visitedPixels, differenceId);
        }
    }

    private lookAround(toCheck: number[], visitedPixels: number[], differenceId: number): void {
        const indexToCheck: number = toCheck.pop() as number;

        const pos: Position = Position.fromIndex(indexToCheck, this.differenceImage.width);
        const newPos: Position = pos.clone();

        for (let x: number = -1; x <= 1; x++) {
            for (let y: number = -1; y <= 1; y++) {
                newPos.x = pos.x + x;
                newPos.y = pos.y + y;

                if (newPos.isInBound(this.differenceImage.width, this.differenceImage.height)) {
                    const i: number = newPos.getIndex(this.differenceImage.width);
                    if (this.canVisit(i)) {
                        this.pixels[i] = differenceId;
                        toCheck.push(i);
                        visitedPixels.push(i);
                    }
                }
            }
        }
    }

    public countDifferences(): number {
        let differenceCount: number = 0;
        for (let i: number = 0; i < this.pixels.length; i++) {
            if (this.canVisit(i)) {
                this.visitNextTo(i, new Array<number>(), differenceCount + 1);
                differenceCount++;
            }
        }

        return differenceCount;
    }
}
