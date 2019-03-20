export class Header {
    public static readonly BYTES_OFFSET: number = 0;
    public static readonly BYTES_LENGTH: number = 14;

    public static readonly SIGNATURE_OFFSET: number = 0;
    public static readonly FILE_SIZE_OFFSET: number = 2;
    public static readonly RESERVED_OFFSET: number = 6;
    public static readonly PIXEL_OFFSET: number = 10;

    public static readonly SIGNATURE_DECIMAL_CODE: number = 16973;
    public static readonly RESERVED_DECIMAL_CODE: number = 0;

    public fileSize: Uint32Array;
    public dataOffset: Uint32Array;

    public constructor(fileSize: Uint32Array, dataOffset: Uint32Array) {
        this.fileSize = fileSize;
        this.dataOffset = dataOffset;
    }
}

export class InfoHeader {
    public static readonly BYTES_OFFSET: number = 14;
    public static readonly BYTES_LENGTH: number = 40;

    public static readonly INFO_HEADER_OFFSET: number = 0;
    public static readonly WIDTH_OFFSET: number = 4;
    public static readonly HEIGHT_OFFSET: number = 8;
    public static readonly PLANES_OFFSET: number = 12;
    public static readonly BITS_PER_PIXEL_OFFSET: number = 14;
    public static readonly COMPRESSION_OFFSET: number = 16;
    public static readonly IMAGE_SIZE_OFFSET: number = 20;
    public static readonly X_PIXELS_PER_M_OFFSET: number = 24;
    public static readonly Y_PIXELS_PER_M_OFFSET: number = 28;
    public static readonly COLORS_USED_OFFSET: number = 32;
    public static readonly IMPORTANT_COLORS_OFFSET: number = 36;

    public static readonly EXPECTED_WIDTH: number = 640;
    public static readonly EXPECTED_HEIGHT: number = 480;

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
