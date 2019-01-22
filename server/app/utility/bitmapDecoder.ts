import { InfoHeader, Header } from "../model/bitmap/header";
import { Bitmap } from "../model/bitmap/bitmap";
import { Pixel } from "../model/pixel";

export class BitmapDecoder {
    public static decodeFromArrayBuffer(arrayBuffer: ArrayBuffer): Bitmap {
        const header: Header = this.decodeHeader(new DataView(arrayBuffer, Header.BYTES_OFFSET, Header.BYTES_LENGTH));
        const infoHeader: InfoHeader = this.decodeInfoHeader(new DataView(arrayBuffer, InfoHeader.BYTES_OFFSET, InfoHeader.BYTES_LENGTH));
        const pixelData: Pixel[] = this.decodePixels(new DataView(arrayBuffer, header.dataOffset[0]), infoHeader);

        return new Bitmap(header, infoHeader, pixelData);

    }

    private static decodeHeader(dataView: DataView): Header {
        let fileSize: Uint32Array = new Uint32Array([dataView.getUint32(2, true)]);
        let offset: Uint32Array = new Uint32Array([dataView.getUint32(10, true)]);

        return new Header(fileSize, offset);
    }

    private static decodeInfoHeader(dataView: DataView): InfoHeader {
        //const size: Uint32Array = new Uint32Array([dataView.getUint32(0, true)]);
        const width: Int32Array = new Int32Array([dataView.getInt32(4, true)]);
        const height: Int32Array = new Int32Array([dataView.getInt32(8, true)]);
        const xPixelsPerM: Uint32Array = new Uint32Array([dataView.getUint32(24, true)]);
        const yPixelsPerM: Uint32Array = new Uint32Array([dataView.getUint32(28, true)]);


        console.log("Height = " + height + ", width = " + width);
        return new InfoHeader(width, height, xPixelsPerM, yPixelsPerM);
    }

    private static decodePixels(dataView: DataView, infoHeader: InfoHeader): Pixel[] {
        let pixelData: Pixel[] = new Array<Pixel>(infoHeader.width[0] * infoHeader.height[0]);
        let pos: number = 0;
        for (let y: number = infoHeader.height[0] - 1; y >= 0; --y) {
           for (let x: number = 0; x < infoHeader.width[0]; ++x) {
               const index: number = y * infoHeader.width[0] + x;
               pixelData[index] = new Pixel(new Uint8Array([dataView.getUint8(pos + 2)]),
                                            new Uint8Array([dataView.getUint8(pos + 1)]),
                                            new Uint8Array([dataView.getUint8(pos)]));
               pos += Bitmap.BYTES_PER_PIXEL;
           }
           pos += (infoHeader.width[0] % Bitmap.ROW_BYTE_MULTIPLE);
       }

        return pixelData;

    } 
}