import { InvalidFormatException } from "../../../../common/errors/invalidFormatException";
import { Bitmap } from "../../model/bitmap/bitmap";
import { Header, InfoHeader} from "../../model/bitmap/header";
import { Pixel } from "../../model/bitmap/pixel";

export class BitmapDecoder {
    public static FromArrayBuffer(arrayBuffer: ArrayBuffer): Bitmap {
        const header: Header = this.decodeHeader(new DataView(arrayBuffer, Header.BYTES_OFFSET, Header.BYTES_LENGTH));
        const infoHeader: InfoHeader = this.decodeInfoHeader(new DataView(arrayBuffer, InfoHeader.BYTES_OFFSET, InfoHeader.BYTES_LENGTH));
        const pixelData: Pixel[] = this.decodePixels(new DataView(arrayBuffer, header.dataOffset[0]), infoHeader);

        return new Bitmap(header, infoHeader, pixelData);

    }

    // TODO: Find a better name for this class or this method
    public static fromPixels(pixels: Pixel[], sampleImage: Bitmap): Bitmap {
        const fileSize: number = sampleImage.header.fileSize[0];
        const offSet: number = Header.BYTES_LENGTH + InfoHeader.BYTES_LENGTH;

        const header: Header = new Header(new Uint32Array([fileSize]), new Uint32Array([offSet]));

        const infoHeader: InfoHeader = new InfoHeader(sampleImage.infoHeader.width,
                                                      sampleImage.infoHeader.height,
                                                      sampleImage.infoHeader.xPixelsPerM,
                                                      sampleImage.infoHeader.yPixelsPerM);

        return new Bitmap(header, infoHeader, pixels);
    }

    // TODO: Find out if offsets magic numbers are fine, find out if filesize and data offset should be checked
    private static decodeHeader(dataView: DataView): Header {
        if (dataView.getUint16(0) !== Header.SIGNATURE_DECIMAL_CODE) {
            throw new InvalidFormatException("Not a bmp file");
        }
        const fileSize: Uint32Array = new Uint32Array([dataView.getUint32(2, true)]);
        const offset: Uint32Array = new Uint32Array([dataView.getUint32(10, true)]);

        return new Header(fileSize, offset);
    }

    private static decodeInfoHeader(dataView: DataView): InfoHeader {
        const width: Int32Array = new Int32Array([dataView.getInt32(4, true)]);
        if (width[0] !== InfoHeader.EXPECTED_WIDTH) {
            throw new InvalidFormatException("Width is " + width[0] + " pixels, should be " + InfoHeader.EXPECTED_WIDTH + " pixels");
        }

        const height: Int32Array = new Int32Array([dataView.getInt32(8, true)]);
        if (height[0] !== InfoHeader.EXPECTED_HEIGHT) {
            throw new InvalidFormatException("Height is " + height[0] + " pixels, should be " + InfoHeader.EXPECTED_HEIGHT + " pixels");
        }

        const xPixelsPerM: Uint32Array = new Uint32Array([dataView.getUint32(24, true)]);
        const yPixelsPerM: Uint32Array = new Uint32Array([dataView.getUint32(28, true)]);

        return new InfoHeader(width, height, xPixelsPerM, yPixelsPerM);
    }

    // TODO: Find out if requires verification of data size to avoid out of bound access.
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
