import { expect } from "chai";
import sinon = require("sinon");
import { mockReq } from "sinon-express-mock";
import { ICommonReveal, ICommonReveal3D, DifferenceType } from "../../../../common/model/reveal";
import { ObjectType } from "../../../../common/model/scene/scene";
import { R } from "../../strings";
import { NoErrorThrownException } from "../../tests/noErrorThrownException";
import { ApiRequest } from "../../utils/apiRequest";
import { BitmapDecoder } from "../../utils/bitmap/bitmapDecoder";
import { DifferenceService } from "./difference.service";
import { RevealDifference } from "./revealDifference";
import { RevealDifference3D } from "./revealDifference3D";

describe("DifferenceService", () => {
    const service: DifferenceService = new DifferenceService();
    describe("postSimple()", () => {

        beforeEach(() => {
            sinon.stub(BitmapDecoder, "FromArrayBuffer");
            sinon.stub(ApiRequest, "getImagePairDiffJSONId");
            sinon.stub(RevealDifference.prototype, "reveal");
        });

        afterEach(() => {
            (BitmapDecoder.FromArrayBuffer as sinon.SinonStub).restore();
            (ApiRequest.getImagePairDiffJSONId as sinon.SinonStub).restore();
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
                { body: { x: 480, y: 480 } },
                { body: { x: -1, y: 480 } },
                { body: { x: 0, y: -1 } },
                { body: { x: 479, y: 640 } },
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

        it("Should create an array of pixels that represents the differences", async () => {
            const request: Object = {
                body: {
                    x: 400,
                    y: 400,
                    image_pair_id: "3232",
                },
            };

            (BitmapDecoder.FromArrayBuffer as sinon.SinonStub).returns({});
            (ApiRequest.getImagePairDiffJSONId as sinon.SinonStub).resolves();
            const reveal: ICommonReveal = {
                hit: true,
                pixels_affected: [],
                difference_id: 1,
            };

            (RevealDifference.prototype.reveal as sinon.SinonStub).returns(reveal);
            const response: string = await service.postSimple(mockReq(request));
            expect(response).to.equal(JSON.stringify(reveal));

        });
    });

    describe("postFree()", () => {
        beforeEach(() => {
            sinon.stub(RevealDifference3D.prototype, "reveal");
            sinon.stub(ApiRequest, "getModificationsById");
        });

        afterEach(() => {
            (RevealDifference3D.prototype.reveal as sinon.SinonStub).restore();
            (ApiRequest.getModificationsById as sinon.SinonStub).restore();
        });

        it("Should throw an error if the originalSceneId is not set", async () => {
            const request: Object = {
                body: {
                    modifiedObjectId: "asdasd",
                    originalObjectId: "asdasd",
                    gameType: ObjectType.Thematic,
                },
            };

            try {
                await service.postFree(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The field Scene_id is not present.");
            }
        });

        it("Should throw an error if the modifiedObjectId is not set", async () => {
            const request: Object = {
                body: {
                    originalSceneId: "qweqwe",
                    originalObjectId: "asdasd",
                    gameType: ObjectType.Thematic,
                },
            };

            try {
                await service.postFree(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The field modifiedObjectId is not present.");
            }
        });

        it("Should throw an error if the originalObjectId is not set", async () => {
            const request: Object = {
                body: {
                    originalSceneId: "qweqwe",
                    modifiedObjectId: "asdasd",
                    gameType: ObjectType.Thematic,
                },
            };

            try {
                await service.postFree(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The field originalObjectId is not present.");
            }
        });

        it("Should throw an error if the gameType is not set", async () => {
            const request: Object = {
                body: {
                    originalSceneId: "qweqwe",
                    modifiedObjectId: "asdasd",
                    originalObjectId: "asdasd",
                },
            };

            try {
                await service.postFree(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The field gameType is not present.");
            }
        });


    });
});
