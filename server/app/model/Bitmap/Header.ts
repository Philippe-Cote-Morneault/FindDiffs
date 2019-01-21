class Header {
    public static BYTES_ARRAY_OFFSET: number = 0;
    public static BYTES_ARRAY_LENGTH: number = 14;

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

    public encodeData(dataView: DataView): void {
        let offset: number = 0;
        dataView.setInt16(offset, this.signature[0]);
        offset += 2;
        dataView.setUint32(offset, this.fileSize[0], true);
        offset += 4;
        dataView.setInt32(offset, this.reserved[0]);
        offset += 4;
        dataView.setUint32(offset, this.dataOffset[0], true);
    }
}

class InfoHeader {
    public static BYTES_ARRAY_OFFSET: number = 14;
    public static BYTES_ARRAY_LENGTH: number = 40;

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