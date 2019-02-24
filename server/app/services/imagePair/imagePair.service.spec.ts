import {expect} from "chai";
import * as sinon from "sinon";
import { mockReq } from "sinon-express-mock";
import { FileNotFoundException } from "../../../../common/errors/fileNotFoundException";
import { ImagePair } from "../../model/schemas/imagePair";
import { MongooseMock } from "../../tests/mocks";
import { NoErrorThrownException } from "../../tests/noErrorThrownException";
import { BitmapDecoder } from "../../utils/bitmap/bitmapDecoder";
import { Storage } from "../../utils/storage/storage";
import { Difference } from "./difference";
import { ImagePairService } from "./imagePair.service";

// tslint:disable max-file-line-count

interface FilesFetchMock {
    name: string;
    fake_id: string;
    field: string;
}

describe("ImagePairService", () => {
    const imagePairService: ImagePairService = new ImagePairService();
    const STORAGE_PATH: string = Storage.STORAGE_PATH;

    beforeEach(() => {
        sinon.stub(ImagePair, "find");
        sinon.stub(ImagePair, "findById");
        sinon.stub(ImagePair.prototype, "save");
        sinon.stub(Storage, "openBuffer");
        sinon.stub(Storage, "STORAGE_PATH").value("test");
        sinon.stub(BitmapDecoder, "FromArrayBuffer");

        sinon.stub(Difference.prototype, "saveImg");
        sinon.stub(Difference.prototype, "saveJson");
        sinon.stub(Difference.prototype, "compute");
    });

    afterEach(() => {
        (ImagePair.find as sinon.SinonStub).restore();
        (ImagePair.findById as sinon.SinonStub).restore();
        (ImagePair.prototype.save as sinon.SinonStub).restore();
        (Storage.openBuffer as sinon.SinonStub).restore();
        (BitmapDecoder.FromArrayBuffer as sinon.SinonStub).restore();

        (Difference.prototype.saveImg as sinon.SinonStub).restore();
        (Difference.prototype.saveJson as sinon.SinonStub).restore();
        (Difference.prototype.compute as sinon.SinonStub).restore();
        sinon.stub(Storage, "STORAGE_PATH").value(STORAGE_PATH);
    });

    describe("post()", () => {
        it("Should return an error if body is empty", async () => {
            const request: Object = {
                body: {
                },
            };
            const errorMessage: string = "The field name is not present.";
            try {
                await imagePairService.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(errorMessage);
            }
        });

        it("Should return an error if body does not contain an original image", async () => {
            const request: Object = {
                body: {
                    name: "bob",
                },
            };

            const errorMessage: string = "Files needs to be uploaded, no files were uploaded.";
            try {
                await imagePairService.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(errorMessage);
            }
        });

        it("Should return an error if body does not contain a modified image", async () => {
            const request: Object = {
                body: {
                    name: "bob",
                },
                files: {
                    originalImage: "image",
                },
            };
            const errorMessage: string = "The field modified image is not present.";
            try {
                await imagePairService.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(errorMessage);
            }
        });

        it("Should return an error if body contains images but invalid ", async () => {
            const request: Object = {
                body: {
                    name: "bob",
                },
                files: {
                    originalImage: "image",
                    modifiedImage: "image",
                },
            };
            const errorMessage: string = "Original image is not a file.";
            try {
                await imagePairService.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(errorMessage);
            }
        });

        it("Should return an error if body contains images but still invalid ", async () => {
            const request: Object = {
                body: {
                    name: "bob",
                },
                files: {
                    originalImage: [],
                    modifiedImage: [],
                },
            };
            const errorMessage: string = "The field original image is not present.";
            try {
                await imagePairService.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(errorMessage);
            }
        });

        it("Should return an error if body contains a valid original image but an invalid modified image", async () => {
            const request: Object = {
                body: {
                    name: "bob",
                },
                files: {
                    originalImage: [{
                        originalname: "random name",
                    }],
                    modifiedImage: "image",
                },
            };
            const errorMessage: string = "Modified image is not a file.";
            try {
                await imagePairService.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(errorMessage);
            }
        });

        it("Should return an objet with the image pair if the request is valid.", async () => {
            const request: Object = {
                body: {
                    name: "bob",
                },
                files: {
                    originalImage: [{
                        originalname: "checker.bmp",
                        buffer: Buffer.alloc(1),
                    }],
                    modifiedImage: [{
                        originalname: "checker-b.bmp",
                        buffer: Buffer.alloc(1),
                    }],
                },
            };
            (ImagePair.prototype.save as sinon.SinonStub).resolves();
            (BitmapDecoder.FromArrayBuffer as sinon.SinonStub).resolves();
            (Difference.prototype.compute as sinon.SinonStub).returns(undefined);

            (Difference.prototype.saveImg as sinon.SinonStub).resolves("an id");
            (Difference.prototype.saveJson as sinon.SinonStub).resolves("an id 2");

            const response: string = await imagePairService.post(mockReq(request));
            expect(JSON.parse(response).differences_count).to.equal(0);
        });
    });
    describe("index()", () => {
        it("Should return an image pair array", async () => {
            const DIFFERENCES_COUNT: number = 4;
            (ImagePair.find as sinon.SinonStub).resolves([{
                file_difference_id: "a file id",
                file_original_id: "a file id",
                file_modified_id: "a file id",
                name: "naming an image pair",
                creation_date: new Date(),
                differences_count: DIFFERENCES_COUNT,
            }]);
            const result: string = await imagePairService.index();
            expect(JSON.parse(result)[0].differences_count).to.equal(DIFFERENCES_COUNT);
        });

        it("Should throw an error when returning an image pair", async() => {
            const ERROR_MESSAGE: string = "my error";
            (ImagePair.find as sinon.SinonStub).rejects(new Error(ERROR_MESSAGE));
            try {
                await imagePairService.index();
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(ERROR_MESSAGE);
            }
        });
    });
    describe("single()", () => {
        it("Should return a single image pair", async() => {
            const DIFFERENCES_COUNT: number = 4;
            (ImagePair.findById as sinon.SinonStub).resolves({
                file_difference_id: "a file id",
                file_original_id: "a file id",
                file_modified_id: "a file id",
                name: "naming an image pair",
                creation_date: new Date(),
                differences_count: DIFFERENCES_COUNT,
            });
            const result: string = await imagePairService.single("my id");
            expect(JSON.parse(result).differences_count).to.equal(DIFFERENCES_COUNT);
        });

        it("Should throw an error if the id is not in the db", async() => {
            (ImagePair.findById as sinon.SinonStub).rejects();
            try {
                await imagePairService.single("an unkonw id");
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The id could not be found.");
            }
        });

        it("Should throw an error if the id is not in the db but mongoose returns null", async() => {
            (ImagePair.findById as sinon.SinonStub).resolves(undefined);
            try {
                await imagePairService.single("an unkonw id");
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The id could not be found.");
            }
        });
    });

    // Tests for the files fetch methods
    const methodsToTest: FilesFetchMock[] = [
        {
            name: "getDifference",
            fake_id: "id_difference",
            field: "file_difference_id",
        },
        {
            name: "getOriginal",
            fake_id: "id_original",
            field: "file_original_id",
        },
        {
            name: "getModified",
            fake_id: "id_modified",
            field: "file_modified_id",
        },
    ];
    const queryResponse: Object[]  = new Array();
    methodsToTest.forEach((file: FilesFetchMock) => {
        queryResponse[file.field] = file.fake_id;
    });
    // tslint:disable-next-line:max-func-body-length
    methodsToTest.forEach((method: FilesFetchMock) => {
        describe(`${method.name}()`, () => {
            it("Should return an arraybuffer of the file", async () => {

                (ImagePair.findById as sinon.SinonStub).returns(new MongooseMock.Query(
                    new MongooseMock.Schema(queryResponse, false), true));
                const buffer: ArrayBuffer = Buffer.alloc(1).buffer;
                (Storage.openBuffer as sinon.SinonStub).resolves(buffer);

                expect(await imagePairService[method.name]("id")).to.equal(buffer);
            });

            it("Should throw an error if the id is not valid", async () => {
                (ImagePair.findById as sinon.SinonStub).returns(new MongooseMock.Query({}, false));
                try {
                    await imagePairService[method.name]("id");
                    throw new NoErrorThrownException();
                } catch (err) {
                    expect(err.message).to.equal("The id could not be found.");
                }
            });
            it("Should throw an error if the file is not present on the server", async () => {
                (ImagePair.findById as sinon.SinonStub).returns(new MongooseMock.Query(
                    new MongooseMock.Schema(queryResponse, false), true));
                (Storage.openBuffer as sinon.SinonStub).rejects(new FileNotFoundException(method.fake_id));

                try {
                    await imagePairService[method.name]("id");
                    throw new NoErrorThrownException();
                } catch (err) {
                    expect(err.message).to.equal(new FileNotFoundException(method.fake_id).message);
                }
            });
        });
    });
});
