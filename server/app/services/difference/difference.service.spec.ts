import { expect } from "chai";
import sinon = require("sinon");
import { mockReq } from "sinon-express-mock";
import { ICommonReveal } from "../../../../common/model/reveal";
import { R } from "../../strings";
import { NoErrorThrownException } from "../../tests/noErrorThrownException";
import { ApiRequest } from "../../utils/apiRequest";
import { BitmapDecoder } from "../../utils/bitmap/bitmapDecoder";
import { DifferenceService } from "./difference.service";
import { RevealDifference } from "./revealDifference";

describe("DifferenceService", () => {
    const service: DifferenceService = new DifferenceService();
    describe("postSimple()", () => {

        beforeEach(() => {
            sinon.stub(BitmapDecoder, "FromArrayBuffer");
            sinon.stub(ApiRequest, "getImagePairDiffId");
            sinon.stub(RevealDifference.prototype, "reveal");
        });

        afterEach(() => {
            (BitmapDecoder.FromArrayBuffer as sinon.SinonStub).restore();
            (ApiRequest.getImagePairDiffId as sinon.SinonStub).restore();
            (RevealDifference.prototype.reveal as sinon.SinonStub).restore();
        });

        it("Should throw an error if the field y or x is not a number", async () => {
            const errorMessage: string = "The field x or y is not a number.";
            const requests: Object[] = [
                {
                    body: {
                        x: 0,
                        y: "nan value",
                    },
                },
                {
                    body: {
                        x: "nan value",
                        y: 0,
                    },
                },
            ];
            requests.forEach(async (request: Object) => {
                try {
                    await service.postSimple(mockReq(request));
                    throw new NoErrorThrownException();
                } catch (err) {
                    expect(err.message).to.equal(errorMessage);
                }
            });
        });
        it("Should throw an error if the the position is out of bound", async () => {

            const requests: Object[] = [
                {body: {x: 480, y: 480}},
                {body: {x: -1, y: 480}},
                {body: {x: 0, y: -1}},
                {body: {x: 479, y: 640}},
            ];

            requests.forEach(async (request: Object) => {
                try {
                    await service.postSimple(mockReq(request));
                    throw new NoErrorThrownException();
                } catch (err) {
                    expect(err.message).to.equal(R.ERROR_OUT_OF_BOUND);
                }
            });
        });
        it("Should throw an error if the image_pair_id is not set", async () => {
            const request: Object = {
                body: {
                    x: 400,
                    y: 400,
                },
            };

            try {
                await service.postSimple(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The field image pair is not present.");
            }
        });

        it("Should return an array of pixels", async () => {
            const request: Object = {
                body: {
                    x: 400,
                    y: 400,
                    image_pair_id: "3232",
                },
            };

            (BitmapDecoder.FromArrayBuffer as sinon.SinonStub).returns({});
            (ApiRequest.getImagePairDiffId as sinon.SinonStub).resolves();
            const reveal: ICommonReveal = {
                hit: true,
                pixels_affected: [],
            };

            (RevealDifference.prototype.reveal as sinon.SinonStub).returns(reveal);
            const response: string =  await service.postSimple(mockReq(request));
            expect(response).to.equal(JSON.stringify(reveal));

        });
    });

    describe("postFree()", () => {
        it("Should return a not implemented exception", async () => {
            try {
                await service.postFree(mockReq({}));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("Method not implemented.");
            }
        });
    });
});
