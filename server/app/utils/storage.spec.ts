import {expect} from "chai";
import * as del from "del";
import * as fs from "fs";
import { FileNotFoundException } from "../../../common/errors/fileNotFoundException";
import {Storage} from "./storage";

/*tslint:disable no-magic-numbers */

describe("utils/Storage", () => {
    describe("exists()", () => {
        it("Should return true if a file exists", () => {
            const fileName: string = "file";
            fs.writeFileSync(Storage.STORAGE_PATH + "/" + fileName, "data");

            expect(Storage.exists(fileName)).to.equal(true);
        });
        it("Should return false if a file does not exist", () => {
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
    describe("getPath()", () => {
        it("Should return the same path as the static variable plus a slash.", () => {
            expect(Storage.getPath("")).to.equal(Storage.STORAGE_PATH + "/");
        });

        it("Should return the same path as the static variable plus a slash and the id.", () => {
            expect(Storage.getPath("abc")).to.equal(Storage.STORAGE_PATH + "/abc");
        });
    });
    describe("getFullPath", () => {
        it("Should be diffrent than the storage path", () => {
            expect(Storage.getFullPath("")).to.not.equal(Storage.STORAGE_PATH);
        });
    });
    afterEach(() => {
        del.sync([Storage.STORAGE_PATH  + "/**"]);
    });

    beforeEach(() => {
        fs.mkdirSync(Storage.STORAGE_PATH,  {recursive: true});
    });
});
