import { NotFoundException } from "../../../../common/errors/notFoundException";
import { ICommon2DPosition } from "../../../../common/model/positions";
import { ICommonReveal } from "../../../../common/model/reveal";
import * as BitmapHeader from "../../model/bitmap/header";
import { Position } from "../../model/bitmap/pixel";
import { R } from "../../strings";
import { DifferenceDetector } from "../imagePair/differenceDetector";

export class RevealDifference {
    private posClicked: Position;
    private differencePixels: number[];

    public constructor(differencePixels: number[], posClicked: Position) {
        this.posClicked = posClicked;
        this.differencePixels = differencePixels;
    }

    public reveal(): ICommonReveal {
        const index: number = this.posClicked.getIndex(BitmapHeader.InfoHeader.EXPECTED_WIDTH);

        if (this.differencePixels[index] !== DifferenceDetector.WHITE) {
            const differenceId: number = this.differencePixels[index];
            const pixelsPosition: Position[] = new Array<Position>();

            this.differencePixels.forEach((x: number, i: number) => {
                if (x === differenceId) {
                    pixelsPosition.push(Position.fromIndex(i, BitmapHeader.InfoHeader.EXPECTED_WIDTH));
                }
            });

            return {
                    hit: true,
                    pixels_affected: pixelsPosition as ICommon2DPosition[],
                    difference_id: differenceId,
                };
        } else {
            throw new NotFoundException(R.ERROR_NO_DIFFERENCE_FOUND);
        }
    }
}
