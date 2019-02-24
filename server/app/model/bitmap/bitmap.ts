import { Header, InfoHeader } from "./header";
import { Pixel } from "./pixel";

/**
 * Class that represents a BMP bitmap. Provides various methods to create files from a bitmap and create bitmaps from files.
 */

 // RFC:7854
export class Bitmap {
    public static readonly ROW_BYTE_MULTIPLE: number = 4;
    public static readonly BYTES_PER_PIXEL: number = 3;

    public height: number;
    public width: number;
    public header: Header;
    public infoHeader: InfoHeader;
    public pixelData: Pixel[];

    public constructor(header: Header, infoHeader: InfoHeader, pixels: Pixel[]) {
        this.header = header;
        this.infoHeader = infoHeader;
        this.pixelData = pixels;
        this.height = infoHeader.height[0];
        this.width = infoHeader.width[0];
    }
}
