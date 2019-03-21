import { Bitmap } from "../../model/bitmap/bitmap";
import { Header, InfoHeader } from "../../model/bitmap/header";
import { Pixel } from "../../model/bitmap/pixel";

export class BitmapEncoder {
    private static readonly SIGNATURE_DECIMAL_CODE: number = 16973;
    private static readonly RESERVED_DECIMAL_CODE: number = 0;
    private static readonly INFO_HEADER_SIZE: number = 40;
    private static readonly PLANES_NUMBER: number = 1;
    private static readonly BITS_PER_PIXEL: number = 24;
    private static readonly COMPRESSION: number = 0;
    private static readonly IMAGE_SIZE: number = 0;
    private static readonly COLORS_USED: number = 0;
    private static readonly IMPORTANT_COLORS: number = 0;

    public static encodeBitmap(bitmap: Bitmap): ArrayBuffer {
        const buffer: ArrayBuffer = new ArrayBuffer(bitmap.header.fileSize[0]);
        BitmapEncoder.encodeHeader(bitmap.header, new DataView(
            buffer,
            Header.BYTES_OFFSET,
            Header.BYTES_LENGTH,
        ));
        BitmapEncoder.encodeInfoHeader(
            bitmap.infoHeader,
            new DataView(
                buffer,
                InfoHeader.BYTES_OFFSET,
                InfoHeader.BYTES_LENGTH,
            ),
        );

        BitmapEncoder.encodePixels(
            bitmap.pixelData,
            new DataView(
                buffer,
                bitmap.header.dataOffset[0],
            ),
            bitmap.infoHeader,
        );

        return buffer;
    }

    private static encodeHeader(header: Header, dataView: DataView): void {
        dataView.setInt16(Header.SIGNATURE_OFFSET, this.SIGNATURE_DECIMAL_CODE);
        dataView.setUint32(Header.FILE_SIZE_OFFSET, header.fileSize[0], true);
        dataView.setInt32(Header.RESERVED_OFFSET, this.RESERVED_DECIMAL_CODE, true);
        dataView.setUint32(Header.PIXEL_OFFSET, header.dataOffset[0], true);
    }

    private static encodeInfoHeader(infoHeader: InfoHeader, dataView: DataView): void {
        dataView.setUint32(InfoHeader.INFO_HEADER_OFFSET, this.INFO_HEADER_SIZE, true);
        dataView.setUint32(InfoHeader.WIDTH_OFFSET, infoHeader.width[0], true);
        dataView.setUint32(InfoHeader.HEIGHT_OFFSET, infoHeader.height[0], true);
        dataView.setUint16(InfoHeader.PLANES_OFFSET, this.PLANES_NUMBER, true);
        dataView.setUint16(InfoHeader.BITS_PER_PIXEL_OFFSET, this.BITS_PER_PIXEL, true);
        dataView.setUint32(InfoHeader.COMPRESSION_OFFSET, this.COMPRESSION, true);
        dataView.setUint32(InfoHeader.IMAGE_SIZE_OFFSET, this.IMAGE_SIZE, true);
        dataView.setUint32(InfoHeader.X_PIXELS_PER_M_OFFSET, infoHeader.xPixelsPerM[0], true);
        dataView.setUint32(InfoHeader.Y_PIXELS_PER_M_OFFSET, infoHeader.yPixelsPerM[0], true);
        dataView.setUint32(InfoHeader.COLORS_USED_OFFSET, this.COLORS_USED, true);
        dataView.setUint32(InfoHeader.IMPORTANT_COLORS_OFFSET, this.IMPORTANT_COLORS, true);
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
