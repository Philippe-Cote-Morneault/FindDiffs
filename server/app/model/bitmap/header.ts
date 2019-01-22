import { Bitmap } from "./bitmap";

export class Header {
    public static BYTES_OFFSET: number = 0;
    public static BYTES_LENGTH: number = 14;
    public static SIGNATURE_DECIMAL_CODE: number = 16973;
    public static RESERVED_DECIMAL_CODE: number = 0;

    public fileSize: Uint32Array;
    public dataOffset: Uint32Array;

    public constructor(fileSize: Uint32Array, dataOffset: Uint32Array) {
        this.fileSize = fileSize;
        this.dataOffset = dataOffset;
    }

    public static fromDataView(dataView: DataView): Header {
        if (dataView.getInt16(0) !== Header.SIGNATURE_DECIMAL_CODE) {
            // throw exception
        }
        const fileSize: Uint32Array = new Uint32Array([dataView.getUint32(2, true)]);
        const dataOffset: Uint32Array = new Uint32Array([dataView.getUint32(10, true)]);

        return new Header(fileSize, dataOffset);
    }
}

export class InfoHeader {
    public static BYTES_OFFSET: number = 14;
    public static BYTES_LENGTH: number = 40;

    public width: Int32Array;
    public height: Int32Array;
    public imageSize: Uint32Array;
    public xPixelsPerM: Uint32Array;
    public yPixelsPerM: Uint32Array;

    public constructor(width: Int32Array, height: Int32Array, xPixelsPerM: Uint32Array, yPixelsPerM: Uint32Array) {
        this.width = width;
        this.height = height;
        const bytesFromPadding: number = (width[0] * Bitmap.BYTES_PER_PIXEL) % Bitmap.ROW_BYTE_MULTIPLE * Bitmap.BYTES_PER_PIXEL;
        const bytesFromPixels: number = height[0] * width[0] * Bitmap.BYTES_PER_PIXEL;
        this.imageSize = new Uint32Array([bytesFromPadding + bytesFromPixels]);
        this.xPixelsPerM = xPixelsPerM;
        this.yPixelsPerM = yPixelsPerM;
    }

    public static fromDataView(dataView: DataView): InfoHeader {
        const width: Int32Array = new Int32Array([dataView.getInt32(4, true)]);
        const height: Int32Array = new Int32Array([dataView.getInt32(8, true)]);
        const xPixelsPerM: Uint32Array = new Uint32Array([dataView.getUint32(24, true)]);
        const yPixelsPerM: Uint32Array = new Uint32Array([dataView.getUint32(28, true)]);

        return new InfoHeader(width, height, xPixelsPerM, yPixelsPerM);
    }
}