import {expect} from "chai";
import { mockReq } from "sinon-express-mock";
import { ImagePairService } from "./imagePair.service";

describe("ImagePairService", () => {
    const imagePairService: ImagePairService = new ImagePairService();
    it("If body is empty, should return an error", async () => {
        // tslint:disable:typedef
        const request = {
            body: {
            },
        };
        const response: string = await imagePairService.post(mockReq(request));
        const errorMessage: string = "The field name is missing.";
        expect(response).to.equal(imagePairService.printError(errorMessage));
    });

    it("If body does not contain an original image return an error", async () => {
        const request = {
            body: {
                name: "bob",
            },
        };
        const response: string = await imagePairService.post(mockReq(request));
        const errorMessage: string = "Files needs to be uploaded, no files were uploaded.";
        expect(response).to.equal(imagePairService.printError(errorMessage));
    });

    it("If body does not contain a modified image return an error", async () => {
        const request = {
            body: {
                name: "bob",
            },
            files: {
                originalImage: "image",
            },
        };
        const response: string = await imagePairService.post(mockReq(request));
        const errorMessage: string = "Modified image is missing.";
        expect(response).to.equal(imagePairService.printError(errorMessage));
    });

    it("If body contains images but invalid return an error", async () => {
        const request = {
            body: {
                name: "bob",
            },
            files: {
                originalImage: "image",
                modifiedImage: "image",
            },
        };
        const response: string = await imagePairService.post(mockReq(request));
        const errorMessage: string = "Original image is not a file.";
        expect(response).to.equal(imagePairService.printError(errorMessage));
    });
});
