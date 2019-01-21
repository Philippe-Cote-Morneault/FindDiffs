import {readFileSync} from 'fs';

/**
 * Class that represents a BMP bitmap. Provides various methods to create files from a bitmap, create bitmaps from files, and more.
 */
export class Bitmap {
    public height: number;
    public width: number;
    public header: Header;
    public infoHeader: InfoHeader;
    public pixelData: Pixel[] = [];

    public constructor(data: ArrayBuffer) {
        this.decodeData(data);
    }

     /**
     * Will be removed, please ignore.
     */
    public static readBMP(): ArrayBuffer {
        let path = require('path');
        let data = readFileSync(path.resolve(__dirname,"../../test/testBitmaps/FLAG_B24_B64.txt"), "utf8");
        var binary_string = Buffer.from(data, 'base64').toString();
        var len = binary_string.length;
        var bytes = new Uint8Array( len );
        for (var i = 0; i < len; i++)        {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    private decodeData(data: ArrayBuffer) {
        console.log(this.pixelData);
        this.header = new Header(new DataView(data, Header.BYTES_ARRAY_OFFSET, Header.BYTES_ARRAY_LENGTH));
        this.infoHeader = new InfoHeader(new DataView(data, InfoHeader.BYTES_ARRAY_OFFSET, InfoHeader.BYTES_ARRAY_LENGTH));

        let rawPixelsArray = new DataView(data, this.header.dataOffset[0]);
        this.pixelData = new Array<Pixel>(this.infoHeader.width[0] * this.infoHeader.height[0]);

        let pos = 0;
        for(let y = this.infoHeader.height[0] - 1; y >= 0; --y) {
           for(let x = 0; x < this.infoHeader.width[0]; ++x) {
               let index = y * this.infoHeader.width[0] + x;
               this.pixelData[index] = new Pixel(new Uint8Array([rawPixelsArray.getUint8(pos + 2)]), 
                new Uint8Array([rawPixelsArray.getUint8(pos + 1)]), 
                new Uint8Array([rawPixelsArray.getUint8(pos)]));
                pos += 3;
           }
           pos += (this.infoHeader.width[0] % 4);
       }        
    }

    public toFile(name: string): File {
        return new File([this.encodeData()], name + ".bmp", {
            type: "image/bmp",
        });
    }

    public asBuffer(): ArrayBuffer {
        return this.encodeData();
    }

    private encodeData(): ArrayBuffer {
        let buffer = new ArrayBuffer(this.header.fileSize[0]);
        this.header.encodeData(new DataView(buffer, Header.BYTES_ARRAY_OFFSET, Header.BYTES_ARRAY_LENGTH));
        this.infoHeader.encodeData(new DataView(buffer, InfoHeader.BYTES_ARRAY_OFFSET, InfoHeader.BYTES_ARRAY_LENGTH));

        let pixelsDataView = new DataView(buffer, this.header.dataOffset[0]);

        let pos = 0;
        for(let y = this.infoHeader.height[0] - 1; y >= 0; --y) {
            for(let x = 0; x < this.infoHeader.width[0]; ++x) {
                //let index = y * this.infoHeader.width[0] * 4 + x * 4;
                let index = y * this.infoHeader.width[0] + x;
                //console.log("Y = " + y + ", X = " + x + ", pos = " + pos + ", Index = " + index);
                 pixelsDataView.setUint8(pos++, this.pixelData[index].blue[0]);
                 pixelsDataView.setUint8(pos++, this.pixelData[index].green[0]);
                 pixelsDataView.setUint8(pos++, this.pixelData[index].red[0]);
            }
            pos += (this.infoHeader.width[0] % 4);
        }
 

        console.log(buffer.byteLength);
        return buffer;
    }
}

class Header {
    public static BYTES_ARRAY_OFFSET = 0;
    public static BYTES_ARRAY_LENGTH = 14;

    private signature: Int16Array;
    public fileSize: Uint32Array;
    private reserved: Int32Array;
    public dataOffset: Uint32Array;

    public constructor(data: DataView) {
        this.signature = new Int16Array([data.getUint16(0)]);
        this.fileSize = new Uint32Array([data.getUint32(2, true)]);
        this.reserved = new Int32Array([data.getInt32(6)]);
        this.dataOffset = new Uint32Array([data.getUint32(10, true)]);
    }

    public encodeData(dataView: DataView) {
        dataView.setInt16(0, this.signature[0]);
        dataView.setUint32(2, this.fileSize[0], true);
        dataView.setInt32(6, this.reserved[0]);
        dataView.setUint32(10, this.dataOffset[0], true);
    } 
}

class InfoHeader {
    public static BYTES_ARRAY_OFFSET = 14;
    public static BYTES_ARRAY_LENGTH = 40;

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

    public constructor(data: DataView) {
        this.size = new Uint32Array([data.getUint32(0, true)]);
        this.width = new Int32Array([data.getInt32(4, true)]);
        this.height = new Int32Array([data.getInt32(8, true)]);
        this.planes = new Uint16Array([data.getUint16(12, true)]);
        this.bitsPerPixel = new Uint16Array([data.getUint16(14, true)]);
        this.compression = new Uint32Array([data.getUint32(16, true)]);
        this.imageSize = new Uint32Array([data.getUint32(20, true)]);
        this.xPixelsPerM = new Uint32Array([data.getUint32(24, true)]);
        this.yPixelsPerM = new Uint32Array([data.getUint32(28, true)]);
        this.colorsUsed = new Uint32Array([data.getUint32(32, true)]);
        this.importantColors = new Uint32Array([data.getUint32(36, true)]);
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

export class Pixel {
    public static PADDING_BYTE_VALUE = new Uint8Array([0]);
    public static BYTES_PER_PIXEL = 3;

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
        switch(color) {
            case COLOR.WHITE: {
                return new Pixel(new Uint8Array([255]), new Uint8Array([255]), new Uint8Array([255]));
            }
            case COLOR.BLACK: {
                return new Pixel(new Uint8Array([0]), new Uint8Array([0]), new Uint8Array([0]));
            }
            default: {
                return new Pixel(new Uint8Array([255]), new Uint8Array([255]), new Uint8Array([255]));
            }

        }
    }

    public equals(pixel: Pixel): boolean {
        return (this.red[0] == pixel.red[0] && this.blue[0] == pixel.blue[0] && this.green[0] == pixel.green[0]);
    }
}

export enum COLOR {
    WHITE, BLACK
}