import {expect} from "chai";
import { mockReq } from "sinon-express-mock";
import { DifferenceController } from "./differenceController";

describe("DifferenceController", () => {
    const differenceController: DifferenceController = new DifferenceController();
    it("If body is empty, should return an error", () => {
        // tslint:disable:typedef
        const request = {
            body: {
            },
        };
        const response: string = differenceController.genDifference(mockReq(request));
        const errorMessage: string = "Le nom est manquant (name)";
        expect(response).to.equal(differenceController.printError(errorMessage));
    });

    it("If body does not contain an original image return an error", () => {
        const request = {
            body: {
                name: "bob",
            },
        };
        const response: string = differenceController.genDifference(mockReq(request));
        const errorMessage: string = "L'image originale est manquante (originalImage)";
        expect(response).to.equal(differenceController.printError(errorMessage));
    });

    it("If body does not contain a modified image return an error", () => {
        const request = {
            body: {
                name: "bob",
                originalImage: "image",
            },
        };
        const response: string = differenceController.genDifference(mockReq(request));
        const errorMessage: string = "L'image modifié est manquante (modifiedImage)";
        expect(response).to.equal(differenceController.printError(errorMessage));
    });

});
