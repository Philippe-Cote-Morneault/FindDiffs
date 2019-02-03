import {expect} from "chai";
import * as sinon from "sinon";
import { mockReq } from "sinon-express-mock";
import { ImagePair } from "../../model/schemas/imagePair";
import { NoErrorThrownException } from "../../tests/noErrorThrownException";
import { ImagePairService } from "./imagePair.service";

describe("ImagePairService", () => {
    const imagePairService: ImagePairService = new ImagePairService();

    beforeEach(() => {
        sinon.stub(ImagePair, "find");
    });

    afterEach(() => {
        (ImagePair.find as sinon.SinonStub).restore();
    });

    describe("post()", () => {
        it("If body is empty, should return an error", async () => {
            const request: Object = {
                body: {
                },
            };
            const errorMessage: string = "The field name is missing.";
            try {
                await imagePairService.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(errorMessage);
            }
        });

        it("If body does not contain an original image return an error", async () => {
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

        it("If body does not contain a modified image return an error", async () => {
            const request: Object = {
                body: {
                    name: "bob",
                },
                files: {
                    originalImage: "image",
                },
            };
            const errorMessage: string = "Modified image is missing.";
            try {
                await imagePairService.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(errorMessage);
            }
        });

        it("If body contains images but invalid return an error", async () => {
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
    });
});
