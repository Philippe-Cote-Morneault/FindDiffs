import { Bitmap } from "./Bitmap";

export class Header {
    public static BYTES_OFFSET: number = 0;
    public static BYTES_LENGTH: number = 14;
    private static SIGNATURE_DECIMAL_CODE: number = 16973;
    private static RESERVED_DECIMAL_CODE: number = 0;

    private signature: Int16Array;
    public fileSize: Uint32Array;
    private reserved: Int32Array;
    public dataOffset: Uint32Array;

    public constructor(fileSize: Uint32Array, dataOffset: Uint32Array) {
        this.signature = new Int16Array([Header.SIGNATURE_DECIMAL_CODE]);
        this.fileSize = fileSize;
        this.reserved = new Int32Array([Header.RESERVED_DECIMAL_CODE]);
        this.dataOffset = dataOffset;
    }

    public static fromDataView(dataView: DataView): Header {
        if (dataView.getInt16(0) !== Header.SIGNATURE_DECIMAL_CODE) {
            // throw exception
        }
        console.log("File size is " + dataView.getUint32(2, true));
        const fileSize: Uint32Array = new Uint32Array([dataView.getUint32(2, true)]);
        const dataOffset: Uint32Array = new Uint32Array([dataView.getUint32(10, true)]);

        return new Header(fileSize, dataOffset);
    }

    public encodeData(dataView: DataView): void {
        let offset: number = 0;
        dataView.setInt16(offset, this.signature[0]);
        offset += 2;
        dataView.setUint32(offset, this.fileSize[0], true);
        offset += 4;
        dataView.setInt32(offset, this.reserved[0]);
        offset += 4;
        dataView.setUint32(offset, this.dataOffset[0], true);
    }
}

export class InfoHeader {
    public static BYTES_OFFSET: number = 14;
    public static BYTES_LENGTH: number = 40;

    private static PLANES_NUMBER: number = 1;
    private static BITS_PER_PIXEL: number = 24;
    private static COMPRESSION: number = 0;
    private static COLORS_USED: number = 0;
    private static IMPORTANT_COLORS: number = 0;

    private size: Uint32Array;
    public width: Int32Array;
    public height: Int32Array;
    private planes: Uint16Array;
    private bitsPerPixel: Uint16Array;
    private compression: Uint32Array;
    private imageSize: Uint32Array;
    private xPixelsPerM: Uint32Array;
    private yPixelsPerM: Uint32Array;
    private colorsUsed: Uint32Array;
    private importantColors: Uint32Array;

    public constructor(size: Uint32Array, width: Int32Array, height: Int32Array, xPixelsPerM: Uint32Array, yPixelsPerM: Uint32Array) {
        this.size = size;
        this.width = width;
        this.height = height;
        this.planes = new Uint16Array([InfoHeader.PLANES_NUMBER]);
        this.bitsPerPixel = new Uint16Array([InfoHeader.BITS_PER_PIXEL]);
        this.compression = new Uint32Array([InfoHeader.COMPRESSION]);
        const bytesFromPadding: number = (width[0] * Bitmap.BYTES_PER_PIXEL) % Bitmap.ROW_BYTE_MULTIPLE * Bitmap.BYTES_PER_PIXEL;
        const bytesFromPixels: number = height[0] * width[0] * Bitmap.BYTES_PER_PIXEL;
        this.imageSize = new Uint32Array([bytesFromPadding + bytesFromPixels]);
        this.xPixelsPerM = xPixelsPerM;
        this.yPixelsPerM = yPixelsPerM;
        this.colorsUsed = new Uint32Array([InfoHeader.COLORS_USED]);
        this.importantColors = new Uint32Array([InfoHeader.IMPORTANT_COLORS]);
    }

    public static fromDataView(dataView: DataView): InfoHeader {
        const size: Uint32Array = new Uint32Array([dataView.getUint32(0, true)]);
        const width: Int32Array = new Int32Array([dataView.getInt32(4, true)]);
        const height: Int32Array = new Int32Array([dataView.getInt32(8, true)]);
        const xPixelsPerM: Uint32Array = new Uint32Array([dataView.getUint32(24, true)]);
        const yPixelsPerM: Uint32Array = new Uint32Array([dataView.getUint32(28, true)]);


        /*
        this.planes = new Uint16Array([data.getUint16(12, true)]);
        this.bitsPerPixel = new Uint16Array([data.getUint16(14, true)]);
        this.compression = new Uint32Array([data.getUint32(16, true)]);
        this.imageSize = new Uint32Array([data.getUint32(20, true)]);
        this.xPixelsPerM = new Uint32Array([data.getUint32(24, true)]);
        this.yPixelsPerM = new Uint32Array([data.getUint32(28, true)]);
        this.colorsUsed = new Uint32Array([data.getUint32(32, true)]);
        this.importantColors = new Uint32Array([data.getUint32(36, true)]);
        */

        return new InfoHeader(size, width, height, xPixelsPerM, yPixelsPerM);
    }

    public encodeData(dataView: DataView) {
        dataView.setUint32(0, this.size[0], true);
        dataView.setUint32(4, this.width[0], true);
        dataView.setUint32(8, this.height[0], true);
        dataView.setUint16(12, this.planes[0], true);
        dataView.setUint16(14, this.bitsPerPixel[0], true);
        dataView.setUint32(16, this.compression[0], true);
        dataView.setUint32(20, this.imageSize[0], true);
        dataView.setUint32(24, this.xPixelsPerM[0], true);
        dataView.setUint32(28, this.yPixelsPerM[0], true);
        dataView.setUint32(32, this.colorsUsed[0], true);
        dataView.setUint32(36, this.importantColors[0], true);
    }
}