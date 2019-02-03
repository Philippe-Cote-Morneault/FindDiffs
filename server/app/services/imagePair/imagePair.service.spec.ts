import {expect} from "chai";
import { mockReq } from "sinon-express-mock";
import { ImagePairService } from "./imagePair.service";

describe("ImagePairService", () => {
    const imagePairService: ImagePairService = new ImagePairService();
    it("If body is empty, should return an error", async () => {
        const request: Object = {
            body: {
            },
        };
        const errorMessage: string = "The field name is missing.";
        try {
            await imagePairService.post(mockReq(request));
            throw new Error("No error thrown by service");
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
            throw new Error("No error thrown by service");
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
            throw new Error("No error thrown by service");
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
            throw new Error("No error thrown by service");
        } catch (err) {
            expect(err.message).to.equal(errorMessage);
        }
    });
});
