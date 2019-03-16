import * as AWS from "aws-sdk";
import * as multer from "multer";
import * as uuid from "uuid";
import { FileNotFoundException } from "../../../../common/errors/fileNotFoundException";
import { S3Exception } from "../../../../common/errors/s3Exception";
import Config from "../../config";
import { S3Cache } from "./cache";

AWS.config.update({
    accessKeyId: Config.s3.key,
    secretAccessKey: Config.s3.secret,
});

export const s3: AWS.S3 = new AWS.S3();

export class Storage {
    public static readonly STORAGE_PATH: string = "storage";

    public static getPath(guid: string): string {
        return this.STORAGE_PATH + "/" + guid;
    }

    public static generateGUID(): string {
        return uuid.v4().replace(/-/g, "");
    }

    public static async saveBuffer(buffer: ArrayBuffer): Promise<string> {

        const guid: string = this.generateGUID();

        return s3.upload(
            {
                Bucket: Config.s3.bucket,
                Body: Buffer.from(buffer),
                Key: this.getPath(guid),
            },
        ).promise().then(() => {
            S3Cache.updateCache(guid, buffer);

            return guid;
        }).catch((err: Error) => {
            throw new S3Exception(err.message);
        });
    }

    public static async openBuffer(guid: string): Promise<ArrayBuffer> {
        const path: string = this.getPath(guid);

        if (S3Cache.isInCache(guid)) {
            return S3Cache.getCache(guid);
        }

        return s3.getObject(
            {
                Bucket: Config.s3.bucket,
                Key: path,
            },
        ).promise().then((object: AWS.S3.GetObjectOutput) => {
            const buffer: Buffer = (object.Body as Buffer);
            S3Cache.updateCache(guid, buffer);

            return buffer.buffer.slice(buffer.byteOffset, buffer.byteLength + buffer.byteOffset);
        }).catch(() => {
            throw new FileNotFoundException(path);
        });
    }

}

export const uploads: multer.Instance = multer({});
