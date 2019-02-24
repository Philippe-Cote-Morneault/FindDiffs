import { expect } from "chai";
import * as del from "del";
import * as fs from "fs";
import * as sinon from "sinon";
import { S3Cache } from "./cache";

const TEST_PATH: string = "s3_cache_test/";

describe("S3Cache", () => {
    beforeEach(() => {
        const propertyToChange: string = "CACHE_PATH";
        S3Cache[propertyToChange] = TEST_PATH;
        fs.mkdirSync(TEST_PATH);
    });
    afterEach(() => {
        del.sync([TEST_PATH  + "**"]);
    });
    describe("isInCache()", () => {
        it("Should return false if the file does not exist", () => {
            del.sync([TEST_PATH  + "**"]);
            const guid: string = "myguid";
            expect(S3Cache.isInCache(guid)).to.equal(false);
        });

        it("Should return true if a file already exists in the folder and not expired", () => {
            const guid: string = "myguid";
            fs.writeFileSync(TEST_PATH + guid, "data");
            expect(S3Cache.isInCache(guid)).to.equal(true);
        });

        it("Should return false if a file already exists in the folder and expired", () => {
            sinon.stub(fs, "statSync");
            (fs.statSync as sinon.SinonStub).returns({
                // tslint:disable-next-line:no-magic-numbers
                ctime: new Date(Date.now() - (S3Cache.CACHE_EXPIRES * 1000 + 5)),
            });
            const guid: string = "myguid";
            fs.writeFileSync(TEST_PATH + guid, "data");
            const response: boolean = S3Cache.isInCache(guid);

            (fs.statSync as sinon.SinonStub).restore();

            expect(response).to.equal(false);
        });
    });

    describe("updateCache()", () => {
        it("Should update the cache and write to disk", () => {
            const data: ArrayBuffer = Buffer.from("data to write").buffer;
            const guid: string = "testGuid";
            S3Cache.updateCache(guid, data);

            expect(fs.readFileSync(`${TEST_PATH}/${guid}`).buffer).to.eql(data);
        });
    });

    describe("getCache()", () => {
        it("Should return the file from the cache", () => {
            const guid: string = "myoriginalguidname";
            const data: ArrayBuffer = Buffer.from("data to write").buffer;

            fs.writeFileSync(`${TEST_PATH}/${guid}`, Buffer.from(data));
            expect(S3Cache.getCache(guid)).to.eql(data);
        });
    });
});
