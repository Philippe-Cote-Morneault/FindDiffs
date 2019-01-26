export class Pixel {
    public static BLACK_PIXEL_VALUE: number = 0;
    public static WHITE_PIXEL_VALUE: number = 255;
    public static BYTES_PER_PIXEL: number = 3;

    public red: Uint8Array;
    public green: Uint8Array;
    public blue: Uint8Array;

    public constructor(red: Uint8Array, green: Uint8Array, blue: Uint8Array) {
        this.red = red;
        this.blue = blue;
        this.green = green;
    }

    // TODO: Find a way to get multiple constructors
    public static fromColor(color: COLOR): Pixel {
        switch (color) {
            case COLOR.WHITE: {
                return new Pixel(new Uint8Array([this.WHITE_PIXEL_VALUE])
                ,                new Uint8Array([this.WHITE_PIXEL_VALUE])
                ,                new Uint8Array([this.WHITE_PIXEL_VALUE]));
            }
            case COLOR.BLACK: {
                return new Pixel(new Uint8Array([this.BLACK_PIXEL_VALUE])
                ,                new Uint8Array([this.BLACK_PIXEL_VALUE])
                ,                new Uint8Array([this.BLACK_PIXEL_VALUE]));
            }
            default: {
                return new Pixel(new Uint8Array([this.WHITE_PIXEL_VALUE])
                ,                new Uint8Array([this.WHITE_PIXEL_VALUE])
                ,                new Uint8Array([this.WHITE_PIXEL_VALUE]));
            }

        }
    }

    public equals(pixel: Pixel): boolean {
        return (this.red[0] === pixel.red[0] && this.blue[0] === pixel.blue[0] && this.green[0] === pixel.green[0]);
    }
}

export enum COLOR {
    WHITE, BLACK, RED,
}

export class Position {
    public x: number;
    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public getIndex(width: number): number {
        return width * this.y + this.x;
    }
}
