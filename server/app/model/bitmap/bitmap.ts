import { Pixel } from "../pixel";
import { Header, InfoHeader } from "./header";

/**
 * Class that represents a BMP bitmap. Provides various methods to create files from a bitmap, create bitmaps from files, and more.
 */
export class Bitmap {
    public static ROW_BYTE_MULTIPLE: number = 4;
    public static BYTES_PER_PIXEL: number = 3;

    public height: number;
    public width: number;
    public header: Header;
    public infoHeader: InfoHeader;
    public pixelData: Pixel[] = [];

    /*
    public constructor(data: ArrayBuffer) {
        this.decodeData(data);
    }
    */

    public constructor(header: Header, infoHeader: InfoHeader, pixels: Pixel[]) {
        this.header = header;
        this.infoHeader = infoHeader;
        this.pixelData = pixels;
    }

    /*
    private decodeData(data: ArrayBuffer): void {
        this.header = Header.fromDataView(new DataView(data, Header.BYTES_OFFSET, Header.BYTES_LENGTH));
        this.infoHeader = InfoHeader.fromDataView(new DataView(data, InfoHeader.BYTES_OFFSET, InfoHeader.BYTES_LENGTH));

        const rawPixelsArray: DataView = new DataView(data, this.header.dataOffset[0]);
        this.pixelData = new Array<Pixel>(this.infoHeader.width[0] * this.infoHeader.height[0]);

        let pos: number = 0;
        for (let y: number = this.infoHeader.height[0] - 1; y >= 0; --y) {
           for (let x: number = 0; x < this.infoHeader.width[0]; ++x) {
               const index: number = y * this.infoHeader.width[0] + x;
               this.pixelData[index] = new Pixel(new Uint8Array([rawPixelsArray.getUint8(pos + 2)]),
                                                 new Uint8Array([rawPixelsArray.getUint8(pos + 1)]),
                                                 new Uint8Array([rawPixelsArray.getUint8(pos)]));
               pos += Bitmap.BYTES_PER_PIXEL;
           }
           pos += (this.infoHeader.width[0] % Bitmap.ROW_BYTE_MULTIPLE);
       }
    }
    */
}
