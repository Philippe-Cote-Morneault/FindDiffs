export class Header {
    public static BYTES_OFFSET: number = 0;
    public static BYTES_LENGTH: number = 14;

    public static SIGNATURE_OFFSET: number = 0;
    public static FILE_SIZE_OFFSET: number = 2;
    public static RESERVED_OFFSET: number = 6;
    public static PIXEL_OFFSET: number = 10;

    public static SIGNATURE_DECIMAL_CODE: number = 16973;
    public static RESERVED_DECIMAL_CODE: number = 0;

    public fileSize: Uint32Array;
    public dataOffset: Uint32Array;

    public constructor(fileSize: Uint32Array, dataOffset: Uint32Array) {
        this.fileSize = fileSize;
        this.dataOffset = dataOffset;
    }
}

export class InfoHeader {
    public static BYTES_OFFSET: number = 14;
    public static BYTES_LENGTH: number = 40;

    public static INFO_HEADER_OFFSET: number = 0;
    public static WIDTH_OFFSET: number = 4;
    public static HEIGHT_OFFSET: number = 8;
    public static PLANES_OFFSET: number = 12;
    public static BITS_PER_PIXEL_OFFSET: number = 14;
    public static COMPRESSION_OFFSET: number = 16;
    public static IMAGE_SIZE_OFFSET: number = 20;
    public static X_PIXELS_PER_M_OFFSET: number = 24;
    public static Y_PIXELS_PER_M_OFFSET: number = 28;
    public static COLORS_USED_OFFSET: number = 32;
    public static IMPORTANT_COLORS_OFFSET: number = 36;

    public static EXPECTED_WIDTH: number = 640;
    public static EXPECTED_HEIGHT: number = 480;

    public width: Int32Array;
    public height: Int32Array;
    public xPixelsPerM: Uint32Array;
    public yPixelsPerM: Uint32Array;

    public constructor(width: Int32Array, height: Int32Array, xPixelsPerM: Uint32Array, yPixelsPerM: Uint32Array) {
        this.width = width;
        this.height = height;
        this.xPixelsPerM = xPixelsPerM;
        this.yPixelsPerM = yPixelsPerM;
    }

}
