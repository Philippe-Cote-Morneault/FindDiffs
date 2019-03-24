import { expect } from "chai";
import * as sinon from "sinon";
import { FileNotFoundException } from "../../../../common/errors/fileNotFoundException";
import { NoErrorThrownException } from "../../tests/noErrorThrownException";
import { S3Cache } from "./cache";
import { s3, Storage } from "./storage";

describe("Storage", () => {
    beforeEach(() => {
        sinon.stub(S3Cache, "updateCache");
        (S3Cache.updateCache as sinon.SinonStub).returns(undefined);
    });

    afterEach(() => {
        (S3Cache.updateCache as sinon.SinonStub).restore();
    });

    describe("getPath()", () => {
        it("Should create a path string with an id at the end", () => {
            const guid: string = "an id";
            expect(`${Storage.STORAGE_PATH}/${guid}`).to.equal(Storage.getPath(guid));
        });
    });
    describe("generateGUID()", () => {
        it("Should create a unique id without an hyphen from the uuid package", () => {
            expect(Storage.generateGUID().split("-").length).to.equal(1);
        });
    });
    describe("openBuffer()", () => {

        beforeEach(() => {
            sinon.stub(s3, "getObject");
            sinon.stub(S3Cache, "isInCache");
            sinon.stub(S3Cache, "getCache");
        });

        afterEach(() => {
            (s3.getObject as sinon.SinonStub).restore();
            (S3Cache.isInCache as sinon.SinonStub).restore();
            (S3Cache.getCache as sinon.SinonStub).restore();
        });

        it("Should throw an error if the id does not exists in S3 Object Storage", async() => {
            (S3Cache.isInCache as sinon.SinonStub).returns(false);
            (s3.getObject as sinon.SinonStub).returns({
                promise: async () => {
                    throw new Error();
                },
            });

            const unknownId: string = "unknown id";

            try {
                await Storage.openBuffer(unknownId);
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(new FileNotFoundException(`${Storage.STORAGE_PATH}/${unknownId}`).message);
            }
        });

        it("Should create a buffer of the file if the id exists in the storage", async() => {
            const BUFF_SIZE: number = 4;
            (S3Cache.isInCache as sinon.SinonStub).returns(false);
            (s3.getObject as sinon.SinonStub).returns({
                promise: async () => {
                    return { Body: Buffer.alloc(BUFF_SIZE)};
                },
            });

            const unknownId: string = "unknown id";

            const response: ArrayBuffer = await Storage.openBuffer(unknownId);
            expect(response.byteLength).to.equal(BUFF_SIZE);
        });

        it("Should create a buffer if the id exists in the storage and in cache", async() => {
            const BUFF_SIZE: number = 4;
            (S3Cache.isInCache as sinon.SinonStub).returns(true);
            (S3Cache.getCache as sinon.SinonStub).returns(Buffer.alloc(BUFF_SIZE));

            const unknownId: string = "unknown id";

            const response: ArrayBuffer = await Storage.openBuffer(unknownId);
            expect(response.byteLength).to.equal(BUFF_SIZE);
        });
    });
    describe("saveBuffer()", () => {

        beforeEach(() => {
            sinon.stub(s3, "upload");
            sinon.stub(Storage, "generateGUID");
        });

        afterEach(() => {
            (s3.upload as sinon.SinonStub).restore();
            (Storage.generateGUID as sinon.SinonStub).restore();
        });

        it("Should throw an error if there is an error with S3", async () => {
            const s3ErrorMessage: string = "An error occured with S3.";

            (s3.upload as sinon.SinonStub).returns({
                promise: async () => {
                   throw new Error("");
                },
            });

            try {
                await Storage.saveBuffer(Buffer.alloc(1).buffer);
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(s3ErrorMessage);
            }
        });

        it("Should create a guid if the file was stored successfully", async () => {

            const guid: string = "a simple guid";
            (s3.upload as sinon.SinonStub).returns({
                promise: async () => {
                    return "";
                },
            });

            (Storage.generateGUID as sinon.SinonStub).returns(guid);
            const response: string = await Storage.saveBuffer(Buffer.alloc(1).buffer);
            expect(response).to.equal(guid);
        });
    });
});
