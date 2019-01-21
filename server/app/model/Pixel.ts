export class Pixel {
    public static BLACK_PIXEL_VALUE: Uint8Array = new Uint8Array([0]);
    public static WHITE_PIXEL_VALUE: Uint8Array = new Uint8Array([255])
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
                return new Pixel(this.WHITE_PIXEL_VALUE, this.WHITE_PIXEL_VALUE, this.WHITE_PIXEL_VALUE);
            }
            case COLOR.BLACK: {
                return new Pixel(this.BLACK_PIXEL_VALUE, this.BLACK_PIXEL_VALUE, this.BLACK_PIXEL_VALUE);
            }
            default: {
                return new Pixel(this.WHITE_PIXEL_VALUE, this.WHITE_PIXEL_VALUE, this.WHITE_PIXEL_VALUE);
            }

        }
    }

    public equals(pixel: Pixel): boolean {
        return (this.red[0] === pixel.red[0] && this.blue[0] === pixel.blue[0] && this.green[0] === pixel.green[0]);
    }
}

export enum COLOR {
    WHITE, BLACK,
}
