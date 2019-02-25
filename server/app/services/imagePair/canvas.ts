import { Pixel, Position } from "../../model/bitmap/pixel";
import { BLACK_PIXEL, BRUSH } from "./brush";

export class Canvas {

    private width: number;
    private height: number;

    public constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    private moveBrush(index: number): Position {
        const pos: Position = Position.fromIndex(index, this.width);

        // tslint:disable-next-line:no-magic-numbers
        const brushRadius: number = Math.floor(BRUSH.length / 2);
        pos.x -= brushRadius;
        pos.y -= brushRadius;

        return pos;
    }

    public enlargePixel(pixels: Pixel[], index: number): void {
        const pos: Position = this.moveBrush(index);

        for (let y: number = 0; y < BRUSH.length; y++) {
            for (let x: number = 0; x < BRUSH.length; x++) {
                if (BRUSH[y][x] === 1) {
                    this.drawPixel(pixels, new Position(pos.x + x, pos.y + y));
                }
            }
        }
    }

    public drawPixel(pixels: Pixel[], pos: Position): void {
        if (pos.isInBound(this.width, this.height)) {
            pixels[pos.getIndex(this.width)] = BLACK_PIXEL;
        }
    }

}
