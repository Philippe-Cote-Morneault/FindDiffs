import * as fs from "fs";
import * as uuid from "uuid";
import { FileNotFoundException } from "../../../common/errors/fileNotFoundException";

export class Storage {
    public static STORAGE_PATH: string = "uploads/storage";

    private static createStorageDirectory(): void {
        fs.mkdirSync(this.STORAGE_PATH, {recursive: true});
    }

    private static makePath(guid: string): string {
        return this.STORAGE_PATH + "/" + guid;
    }

    private static generateGUID(): string {
        return uuid.v4();
    }

    public static saveBuffer(buffer: ArrayBuffer): string {
        this.createStorageDirectory();

        const guid: string = this.generateGUID();
        fs.writeFileSync(this.makePath(guid), Buffer.from(buffer));

        return guid;
    }

    public static openBuffer(guid: string): ArrayBuffer {
        this.createStorageDirectory();

        if (this.exists(guid)) {
            return fs.readFileSync(this.makePath(guid)).buffer;
        } else {
            throw new FileNotFoundException(guid);
        }
    }

    public static exists(guid: string): boolean {
        const path: string = this.STORAGE_PATH + "/" + guid;

        return fs.existsSync(path);
    }

}
