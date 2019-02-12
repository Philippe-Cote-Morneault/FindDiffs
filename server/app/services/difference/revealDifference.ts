import { NotFoundException } from "../../../../common/errors/notFoundException";
import { ICommonPosition, ICommonReveal } from "../../../../common/model/reveal";
import { Bitmap } from "../../model/bitmap/bitmap";
import { Position } from "../../model/bitmap/pixel";
import { R } from "../../strings";
import { BLACK_PIXEL } from "../imagePair/brush";
import { DifferenceDetector } from "../imagePair/differenceDetector";

export class RevealDifference {
    private posClicked: Position;
    private differenceImage: Bitmap;

    public constructor(differenceImage: Bitmap, posClicked: Position) {
        this.posClicked = posClicked;
        this.differenceImage = differenceImage;
    }

    public reveal(): ICommonReveal {
        const index: number = this.posClicked.getIndex(this.differenceImage.width);
        if (BLACK_PIXEL.equals(this.differenceImage.pixelData[index])) {
            const pixelsIndexes: number[] = new DifferenceDetector(this.differenceImage).getPixelIndexes(index);
            const pixelsPosition: Position[] = new Array<Position>();

            pixelsIndexes.forEach((x: number) => {
                pixelsPosition.push(Position.fromIndex(x, this.differenceImage.width));
            });

            return {
                    hit: true,
                    pixels_affected: pixelsPosition as ICommonPosition[],
                };
        } else {
            throw new NotFoundException(R.ERROR_NO_DIFFERENCE_FOUND);
        }
    }
}
