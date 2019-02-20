import { expect } from "chai";
import * as sinon from "sinon";
import { FileNotFoundException } from "../../../common/errors/fileNotFoundException";
import { NoErrorThrownException } from "../tests/noErrorThrownException";
import { s3, Storage } from "./storage";

describe("Storage", () => {
    describe("getPath()", () => {
        it("Should return a path with an id", () => {
            const guid: string = "an id";
            expect(`${Storage.STORAGE_PATH}/${guid}`).to.equal(Storage.getPath(guid));
        });
    });
    describe("generateGUID()", () => {
        it("Should return an id without an hyphen", () => {
            expect(Storage.generateGUID().split("-").length).to.equal(1);
        });
    });
    describe("openBuffer()", () => {

        beforeEach(() => {
            sinon.stub(s3, "getObject");
        });

        afterEach(() => {
            (s3.getObject as sinon.SinonStub).restore();
        });

        it("Should return an error if the id does not exists", async() => {
            (s3.getObject as sinon.SinonStub).returns({
                promise: async () => {
                    throw new Error();
                },
            });

            const unknownId: string = "unknown id";

            try {
                await Storage.openBuffer(unknownId, true);
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(new FileNotFoundException(unknownId).message);
            }
        });

        it("Should return an error if the id does not exists with complete path", async() => {
            (s3.getObject as sinon.SinonStub).returns({
                promise: async () => {
                    throw new Error();
                },
            });

            const unknownId: string = "unknown id";

            try {
                await Storage.openBuffer(unknownId, false);
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(new FileNotFoundException(`${Storage.STORAGE_PATH}/${unknownId}`).message);
            }
        });

        it("Should return a buffer if the id exists", async() => {
            const BUFF_SIZE: number = 4;
            (s3.getObject as sinon.SinonStub).returns({
                promise: async () => {
                    return { Body: Buffer.alloc(BUFF_SIZE)};
                },
            });

            const unknownId: string = "unknown id";

            const response: ArrayBuffer = await Storage.openBuffer(unknownId, false);
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

        it("Should return an error if there is an error with S3", async () => {
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

        it("Should return a buffer if everything went smoothly", async () => {

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
