

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
        for(let y = this.infoHeader.height[0] - 1; y >= 0; --y) {
            for(let x = 0; x < this.infoHeader.width[0]; ++x) {
                let index = y * this.infoHeader.height[0] * 4 + x * 3;
                this.pixelData.push(new Pixel(new Uint8Array(rawPixelsArray.getUint8(index + 2))
                , new Uint8Array(rawPixelsArray.getUint8(index + 1))
                , new Uint8Array(rawPixelsArray.getUint8(index))));
            }
        }
    }

    public toFile(name: string): File {

        return new File([this.encodeData()], name + ".bmp", {
            type: "image/bmp",
        });
    }

    private encodeData(): ArrayBuffer {
        let buffer = new ArrayBuffer(this.header.fileSize[0]);
        this.header.encodeData(new DataView(buffer, Header.BYTES_ARRAY_OFFSET, Header.BYTES_ARRAY_LENGTH));
        this.infoHeader.encodeData(new DataView(buffer, InfoHeader.BYTES_ARRAY_OFFSET, InfoHeader.BYTES_ARRAY_LENGTH));

        let pixelsDataView = new DataView(buffer, Pixel.BYTES_ARRAY_OFFSET);
        let index = 0;

        for(let y = this.infoHeader.height[0] - 1; y >= 0; --y) {
            for(let x = 0; x < this.infoHeader.width[0]; ++x) {
                let pos = y * this.infoHeader.height[0] + x;

                pixelsDataView.setUint8(index++, this.pixelData[pos].blue[0]);
                pixelsDataView.setUint8(index++, this.pixelData[pos].green[0]);
                pixelsDataView.setUint8(index++, this.pixelData[pos].red[0]);

                pixelsDataView.setUint8(index++, Pixel.PADDING_BYTE_VALUE[0])
                pixelsDataView.setUint8(index++, Pixel.PADDING_BYTE_VALUE[0])
            }
        }

        return buffer;
    }
}

class Header {
    public static BYTES_ARRAY_OFFSET = 0;
    public static BYTES_ARRAY_LENGTH = 14;

    private signature: Int16Array;
    public fileSize: Uint32Array;
    private reserved: Int32Array;
    private dataOffset: Uint32Array;

    public constructor(data: DataView) {
        this.signature = new Int16Array(data.getUint16(0));
        this.fileSize = new Uint32Array(data.getUint32(2));
        this.reserved = new Int32Array(data.getInt32(6));
        this.dataOffset = new Uint32Array(data.getUint32(10));
    }

    public encodeData(dataView: DataView) {
        dataView.setInt16(0, this.signature[0]);
        dataView.setUint32(2, this.fileSize[0]);
        dataView.setInt32(6, this.reserved[0]);
        dataView.setUint32(10, this.dataOffset[0]);
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

    public encodeData(dataView: DataView) {
        dataView.setUint32(0, this.size[0]);
        dataView.setUint32(4, this.width[0]);
        dataView.setUint32(8, this.height[0]);
        dataView.setUint16(12, this.planes[0]);
        dataView.setUint16(14, this.bitsPerPixel[0]);
        dataView.setUint32(16, this.compression[0]);
        dataView.setUint32(20, this.imageSize[0]);
        dataView.setUint32(24, this.xPixelsPerM[0]);
        dataView.setUint32(28, this.yPixelsPerM[0]);
        dataView.setUint32(32, this.colorsUsed[0]);
        dataView.setUint32(36, this.importantColors[0]);
    }
}

export class Pixel {
    public static PADDING_BYTE_VALUE = new Uint8Array(0);
    public static BYTES_ARRAY_OFFSET = 53;
    public red: Uint8Array;
    public green: Uint8Array;
    public blue: Uint8Array;

    public constructor(red: Uint8Array, green: Uint8Array, blue: Uint8Array) {
        this.red = red;
        this.blue = blue;
        this.green = green;
    }

    public equals(pixel: Pixel): boolean {
        return (this.red[0] == pixel.red[0] && this.blue[0] == pixel.blue[0] && this.green[0] == pixel.green[0]);
    }
}