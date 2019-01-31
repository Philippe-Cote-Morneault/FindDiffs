import { COLOR, Pixel, Position } from "../../model/bitmap/pixel";

export class Painter {
    private static BRUSH_CIRCLE: number[][] = [
        [0, 0, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 0],
    ];

    private width: number;
    private height: number;
    private blackPixel: Pixel;

    public constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.blackPixel = Pixel.fromColor(COLOR.BLACK);
    }

    public enlargePixel(pixels: Pixel[], index: number): void {

        const pos: Position = Position.fromIndex(index, this.width);

        // tslint:disable-next-line:no-magic-numbers
        const brushRadius: number = Math.floor(Painter.BRUSH_CIRCLE.length / 2);
        pos.x -= brushRadius;
        pos.y -= brushRadius;

        // DRAW the circle around the position
        for (let y: number = 0; y < Painter.BRUSH_CIRCLE.length; y++) {
            for (let x: number = 0; x < Painter.BRUSH_CIRCLE.length; x++) {
                if (Painter.BRUSH_CIRCLE[y][x] === 1) {
                    this.drawPixel(pixels, new Position(pos.x + x, pos.y + y));
                }
            }
        }
    }

    public drawPixel(pixels: Pixel[], pos: Position): void {
        if (pos.isInBound(this.width, this.height)) {
            pixels[pos.getIndex(this.width)] = this.blackPixel;
        }
    }

}
