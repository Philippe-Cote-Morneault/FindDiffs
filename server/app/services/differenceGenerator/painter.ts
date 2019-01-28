import { COLOR, Pixel, Position } from "../../model/bitmap/pixel";

export class Painter {
    private static BRUSH: number[][] = [
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
        const brushSize: number = Math.floor(Painter.BRUSH.length / 2);
        pos.x -= brushSize;
        pos.y -= brushSize;

        // DRAW the circle around the position
        for (let i: number = 0; i < Painter.BRUSH.length; i++) {
            for (let j: number = 0; j < Painter.BRUSH.length; j++) {
                if (Painter.BRUSH[i][j] === 1) {
                    this.drawPixel(pixels, new Position(pos.x + j, pos.y + i));
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
