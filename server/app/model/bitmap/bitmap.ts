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

    public constructor(header: Header, infoHeader: InfoHeader, pixels: Pixel[]) {
        this.header = header;
        this.infoHeader = infoHeader;
        this.pixelData = pixels;
        this.height = infoHeader.height[0];
        this.width = infoHeader.width[0];
    }
}
