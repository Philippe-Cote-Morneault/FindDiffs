import * as fs from "fs";
import { v4 } from "uuid";
import { FileNotFoundException } from "../../../common/errors/fileNotFoundException";

export class Storage {
    private static STORAGE: string = "../../uploads/storage";

    private static createStorageDirectory(): void {
        fs.mkdirSync(this.STORAGE, {recursive: true});
    }

    private static makePath(guid: string): string {
        return this.STORAGE + "/" + guid;
    }

    private static generateGUID(): string {
        return v4.toString();
    }

    public static saveBuffer(buffer: ArrayBuffer): string {
        this.createStorageDirectory();

        const uuid: string = this.generateGUID();
        fs.writeFileSync(this.makePath(uuid), buffer);

        return uuid;
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
        const path: string = this.STORAGE + "/" + guid;

        return fs.existsSync(path);
    }

}
