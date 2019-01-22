import { Header, InfoHeader } from "../model/bitmap/Header";
import { Bitmap } from "../model/bitmap/Bitmap";
import { Pixel } from "../model/Pixel";

export class BitmapEncoder {
    private static SIGNATURE_DECIMAL_CODE: number = 16973;
    private static RESERVED_DECIMAL_CODE: number = 0;
    private static INFO_HEADER_SIZE: number = 40;
    private static PLANES_NUMBER: number = 1;
    private static BITS_PER_PIXEL: number = 24;
    private static COMPRESSION: number = 0;
    private static COLORS_USED: number = 0;
    private static IMPORTANT_COLORS: number = 0;

    public static encodeBitmap(bitmap: Bitmap): ArrayBuffer {
        let buffer = new ArrayBuffer(bitmap.header.fileSize[0]);
        BitmapEncoder.encodeHeader(bitmap.header, new DataView(buffer, Header.BYTES_OFFSET, Header.BYTES_LENGTH));
        BitmapEncoder.encodeInfoHeader(bitmap.infoHeader, new DataView(buffer, InfoHeader.BYTES_OFFSET, InfoHeader.BYTES_LENGTH));
        BitmapEncoder.encodePixels(bitmap.pixelData, new DataView(buffer, bitmap.header.dataOffset[0]), bitmap.infoHeader);

        return buffer;

    }

    private static encodeHeader(header: Header, dataView: DataView): void {
        dataView.setInt16(0, this.SIGNATURE_DECIMAL_CODE);
        dataView.setUint32(2, header.fileSize[0], true);
        dataView.setInt32(6, this.RESERVED_DECIMAL_CODE, true);
        dataView.setUint32(10, header.dataOffset[0], true);

    }

    private static encodeInfoHeader(infoHeader: InfoHeader, dataView: DataView): void {
        dataView.setUint32(0, this.INFO_HEADER_SIZE, true);
        dataView.setUint32(4, infoHeader.width[0], true);
        dataView.setUint32(8, infoHeader.height[0], true);
        dataView.setUint16(12, this.PLANES_NUMBER, true);
        dataView.setUint16(14, this.BITS_PER_PIXEL, true);
        dataView.setUint32(16, this.COMPRESSION, true);
        dataView.setUint32(20, infoHeader.imageSize[0], true);
        dataView.setUint32(24, infoHeader.xPixelsPerM[0], true);
        dataView.setUint32(28, infoHeader.yPixelsPerM[0], true);
        dataView.setUint32(32, this.COLORS_USED, true);
        dataView.setUint32(36, this.IMPORTANT_COLORS, true);

    }

    private static encodePixels(pixels: Pixel[], dataView: DataView, infoHeader: InfoHeader): void {
        let pos: number = 0;
        for (let y: number = infoHeader.height[0] - 1; y >= 0; --y) {
            for (let x: number = 0; x < infoHeader.width[0]; ++x) {
                const index: number = y * infoHeader.width[0] + x;

                dataView.setUint8(pos++, pixels[index].blue[0]);
                dataView.setUint8(pos++, pixels[index].green[0]);
                dataView.setUint8(pos++, pixels[index].red[0]);
            }
            pos += ((infoHeader.width[0] * Bitmap.BYTES_PER_PIXEL) % Bitmap.ROW_BYTE_MULTIPLE);
        }
    }
}