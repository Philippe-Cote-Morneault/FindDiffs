import { throws } from "assert";
import { timingSafeEqual } from "crypto";

/**
 * Class that represents a BMP bitmap. Provides various methods to create files from a bitmap, create bitmaps from files, and more.
 */
export class Bitmap {
    private header: Header;
    private infoHeader: InfoHeader;
    private pixelData: Pixel[];

    public constructor(data: ArrayBuffer) {
        this.decodeData(data);
    }

    private decodeData(data: ArrayBuffer) {
        this.header = new Header(new DataView(data, Header.BYTES_ARRAY_OFFSET, Header.BYTES_ARRAY_LENGTH));
        this.infoHeader = new InfoHeader(new DataView(data, InfoHeader.BYTES_ARRAY_OFFSET, InfoHeader.BYTES_ARRAY_LENGTH));

        let rawPixelsArray = new DataView(data, Pixel.BYTES_ARRAY_OFFSET);
        for(let y = this.infoHeader.height[0]; y >= 0; --y) {
            for(let x = 0; x < this.infoHeader.width[0]; ++x) {
                let index = y * this.infoHeader.height[0] * 4 + x * 3;
                this.pixelData.push(new Pixel(rawPixelsArray[index + 2], rawPixelsArray[index + 1], rawPixelsArray[index]));
            }
        }
    }
}

class Header {
    public static BYTES_ARRAY_OFFSET = 0;
    public static BYTES_ARRAY_LENGTH = 14;

    private signature: Int16Array;
    private fileSize: Uint32Array;
    private reserved: Int32Array;
    private dataOffset: Uint32Array;

    public constructor(data: DataView) {
        this.signature = new Int16Array(data.getUint16(0));
        this.fileSize = new Uint32Array(data.getUint32(2));
        this.reserved = new Int32Array(data.getInt32(6));
        this.dataOffset = new Uint32Array(data.getUint32(10));
    }
}

class InfoHeader {
    public static BYTES_ARRAY_OFFSET = 13;
    public static BYTES_ARRAY_LENGTH = 40;

    private size: Uint32Array;
    public width: Uint32Array;
    public height: Uint32Array;
    private planes: Uint16Array;
    private bitsPerPixel: Uint16Array;
    private compression: Uint32Array;
    private imageSize: Uint32Array;
    private xPixelsPerM: Uint32Array;
    private yPixelsPerM: Uint32Array;
    private colorsUsed: Uint32Array;
    private importantColors: Uint32Array;

    public constructor(data: DataView) {
        this.size = new Uint32Array(data.getUint32(0));
        this.width = new Uint32Array(data.getUint32(4));
        this.height = new Uint32Array(data.getUint32(8));
        this.planes = new Uint16Array(data.getUint16(12));
        this.bitsPerPixel = new Uint16Array(data.getUint16(14));
        this.compression = new Uint32Array(data.getUint32(16));
        this.imageSize = new Uint32Array(data.getUint32(20));
        this.xPixelsPerM = new Uint32Array(data.getUint32(24));
        this.yPixelsPerM = new Uint32Array(data.getUint32(28));
        this.colorsUsed = new Uint32Array(data.getUint32(32));
        this.importantColors = new Uint32Array(data.getUint32(36));
    }
}

class Pixel {
    public static BYTES_ARRAY_OFFSET = 53;
    private red: Uint8Array;
    private green: Uint8Array;
    private blue: Uint8Array;

    public constructor(red: Uint8Array, green: Uint8Array, blue: Uint8Array) {
        this.red = red;
        this.blue = blue;
        this.green = green;
    }

    public equals(pixel: Pixel): boolean {
        return this.red == pixel.red && this.blue == pixel.blue && this.green == pixel.green;
    }
}