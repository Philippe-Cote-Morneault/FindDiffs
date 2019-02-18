import { expect } from "chai";
import { mockReq } from "sinon-express-mock";
import { NoErrorThrownException } from "../../tests/noErrorThrownException";
import { SceneService } from "./scene.service";

describe("SceneService", () => {
    const service: SceneService = new SceneService();
    describe("post()", () => {
        it("Should return an error if the object type is not specified", async () => {
            const request: object = {
                body: {

                },
            };
            try {
                await service.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The field object_type is not present.");
            }

        });

        it("Should return an error if the object type is invalid", async () => {
            const request: object = {
                body: {
                    object_type: "unknown",
                },
            };
            try {
                await service.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The unknown type is not recognized.");
            }
        });

        it("Should return an error if the object qty is not a number", async () => {
            const request: object = {
                body: {
                    object_type: "Thematic",
                    object_qty: "nan",
                },
            };

            try {
                await service.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The field object_qty is not a number.");
            }
        });

        it("Should return an error if the object qty is higher than 200", async () => {
            const request: object = {
                body: {
                    object_type: "Thematic",
                    object_qty: 201,
                },
            };

            try {
                await service.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The number of objects must be between 10 and 200 objects.");
            }
        });

        it("Should return an error if the object qty is lower than 10", async () => {
            const request: object = {
                body: {
                    object_type: "Thematic",
                    object_qty: 9,
                },
            };

            try {
                await service.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The number of objects must be between 10 and 200 objects.");
            }
        });
    });

    describe("postModified()", () => {
        it("Should return an error if no modification is detected", async () => {
            const request: object = {
                body: {
                },
            };

            try {
                await service.postModified(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("No modification was selected.");
            }
        });
    });
});
