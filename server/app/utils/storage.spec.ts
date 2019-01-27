import {expect} from "chai";
import * as del from "del";
import * as fs from "fs";
import {Storage} from "./storage";
import { FileNotFoundException } from "../../../common/errors/fileNotFoundException";

/*tslint:disable no-magic-numbers */

describe("utils/Storage", () => {
    describe("exists()", () => {
        it("Return true if a file exists", () => {
            const fileName: string = "file";
            fs.writeFileSync(Storage.STORAGE_PATH + "/" + fileName, "data");

            expect(Storage.exists(fileName)).to.equal(true);
        });
        it("Return false if a file does not exist", () => {
            const fileName: string = "file";
            expect(Storage.exists(fileName)).to.equal(false);
        });
    });
    describe("saveBuffer()", () => {
        it("Should create a file", () => {
            const data: ArrayBuffer =  new ArrayBuffer(1);
            const guid: string = Storage.saveBuffer(data);
            expect(Storage.exists(guid)).to.equal(true);
        });
    });
    describe("openBuffer()", () => {
        it("Should return an ArrayBuffer if the file exists", () => {
            const data: ArrayBuffer = new ArrayBuffer(1);
            const guid: string = Storage.saveBuffer(data);
            expect(Storage.openBuffer(guid).byteLength).to.greaterThan(0);
        });
        it("Should return an exception if the file does not exists", () => {
            const fileName: string = "unkown_file";

            expect(() => Storage.openBuffer(fileName)).to.throw(new FileNotFoundException(fileName).message);
        });
    });
    afterEach(() => {
        del.sync([Storage.STORAGE_PATH  + "/**"]);
    });

    beforeEach(() => {
        fs.mkdirSync(Storage.STORAGE_PATH,  {recursive: true});
    });
});
