import * as fs from "fs";
import Config from "../../config";

export class S3Cache {
    public static readonly CACHE_PATH: string = Config.s3_cache.path;
    public static readonly CACHE_EXPIRES: number = Config.s3_cache.expires;
    private static readonly MS_SECOND: number = 1000;

    private static initCache(): void {
        if (!fs.existsSync(this.CACHE_PATH)) {
            fs.mkdirSync(this.CACHE_PATH);
        }
    }

    private static makePath(guid: string): string {
        return `${this.CACHE_PATH}/${guid}`;
    }

    public static isInCache(guid: string): boolean {
        this.initCache();
        const path: string = this.makePath(guid);

        if (fs.existsSync(path)) {
            const cTime: Date = fs.statSync(path).ctime;
            const timeInCache: number = Math.ceil(
                (new Date().getTime() - cTime.getTime()) / this.MS_SECOND,
            );

            return (timeInCache < this.CACHE_EXPIRES);
        }

        return false;
    }

    public static updateCache(guid: string, buffer: ArrayBuffer): void {
        this.initCache();
        const path: string = this.makePath(guid);

        fs.writeFileSync(path, Buffer.from(buffer));
    }

    public static getCache(guid: string): ArrayBuffer {
        this.initCache();
        const path: string = this.makePath(guid);

        const buf: Buffer =  fs.readFileSync(path);

        return buf.buffer.slice(buf.byteOffset, buf.byteLength + buf.byteOffset);
    }
}
