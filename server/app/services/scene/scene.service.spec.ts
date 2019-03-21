import { expect } from "chai";
import * as sinon from "sinon";
import { mockReq } from "sinon-express-mock";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import { ObjectType } from "../../../../common/model/scene/scene";
import { Scene } from "../../model/schemas/scene";
import { NoErrorThrownException } from "../../tests/noErrorThrownException";
import { SceneDifferenceGenerator } from "./differenceGeneration/sceneDifferenceGenerator";
import { SceneService } from "./scene.service";

describe("SceneService", () => {
    const service: SceneService = new SceneService();

    beforeEach(() => {
        sinon.stub(Scene.prototype, "save");
        sinon.stub(Scene, "findById");
    });

    afterEach(() => {
        (Scene.prototype.save as sinon.SinonStub).restore();
        (Scene.findById as sinon.SinonStub).restore();
    });

    describe("post()", () => {
        it("Should throw an error if the object type is not specified", async () => {
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

        it("Should throw an error if the object type is not a known type", async () => {
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

        it("Should throw an error if the object qty is not a number", async () => {
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

        it("Should throw an error if the object qty is higher than 200", async () => {
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

        it("Should throw an error if the object qty is lower than 10", async () => {
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

        it("Should create a generated scene geometric with the specified amount of object requested", async () => {
            const objectQty: number = 20;
            const request: object = {
                body: {
                    object_type: "Geometric",
                    object_qty: objectQty,
                },
            };

            (Scene.prototype.save as sinon.SinonStub).resolves();
            const response: string = await service.post(mockReq(request));
            expect(JSON.parse(response).sceneObjects.length).to.equal(objectQty);
        });

        it("Should create a generated scene (Thematic) with the specified amount of object requested", async () => {
            const objectQty: number = 20;
            const request: object = {
                body: {
                    object_type: "Thematic",
                    object_qty: objectQty,
                },
            };

            (Scene.prototype.save as sinon.SinonStub).resolves();
            const response: string = await service.post(mockReq(request));
            expect(JSON.parse(response).sceneObjects.length).to.equal(objectQty);
        });
    });

    describe("postModified()", () => {
        beforeEach(() => {
            sinon.stub(SceneDifferenceGenerator.prototype, "generateModifiedScene");
        });

        afterEach(() => {
            (SceneDifferenceGenerator.prototype.generateModifiedScene as sinon.SinonStub).restore();
        });

        it("Should throw an error if no modification is detected", async () => {
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

        it("Should throw an error if the scene id is not found in the database", async () => {
            const request: object = {
                body: {
                    add: true,
                },
                params: {
                    id: "an id",
                },
            };
            (Scene.findById as sinon.SinonStub).rejects({});
            try {
                await service.postModified(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The id could not be found.");
            }
        });

        // tslint:disable-next-line:max-func-body-length
        it("Should create a modified scene with the modifications requested", async () => {
            const request: object = {
                body: {
                    add: true,
                },
                params: {
                    id: "an id",
                },
            };
            const scene: Object = {
                id: "an id",
                scene: {
                    id: "",
                    dimensions: {
                        x: 0,
                        y: 0,
                        z: 0,
                    },
                    sceneObjects: [],
                    type: ObjectType.Geometric,
                },
                save: () => {
                    return "";
                },
            };
            const modifiedScene: ICommonSceneModifications = {
                id: "an id",
                addedObjects: [],
                deletedObjects: [],
                type: ObjectType.Geometric,
            };

            (Scene.findById as sinon.SinonStub).resolves(scene);
            (SceneDifferenceGenerator.prototype.generateModifiedScene as sinon.SinonStub).returns(modifiedScene);

            const response: string = await service.postModified(mockReq(request));
            expect(response).to.equal(JSON.stringify(modifiedScene));

        });
    });

    describe("single()", () => {
        it("Should throw an error if the id is not in the db", async () => {
            (Scene.findById as sinon.SinonStub).rejects({});
            try {
                await service.single("an id");
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The id could not be found.");
            }
        });
        it("Should throw an error if the id is not in the db but db returns invalid data", async () => {
            (Scene.findById as sinon.SinonStub).resolves(undefined);
            try {
                await service.single("an id");
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The id could not be found.");
            }
        });

        it("Should list a scene if the id is in the database", async () => {
            const realSceneId: string = "the real id";
            (Scene.findById as sinon.SinonStub).resolves({
                scene: {
                    id: "",
                },
                id: realSceneId,
            });
            const response: string = await service.single("an id");
            expect(JSON.parse(response).id).to.equal(realSceneId);
        });
    });

    describe("singleModified()", () => {
        it("Should throw an error if the id is not in the db", async () => {
            (Scene.findById as sinon.SinonStub).rejects({});
            try {
                await service.singleModified("an id");
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The id could not be found.");
            }
        });
        it("Should throw an error if the id is not in the db but the db returns invalid data", async () => {
            (Scene.findById as sinon.SinonStub).resolves(undefined);
            try {
                await service.singleModified("an id");
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The id could not be found.");
            }
        });

        it("Should create a modified scene if the id is valid.", async () => {
            const realSceneId: string = "the real id";
            (Scene.findById as sinon.SinonStub).resolves({
                modifications: {
                    id: realSceneId,
                },
            });
            const response: string = await service.singleModified("an id");
            expect(JSON.parse(response).id).to.equal(realSceneId);
        });
    });
});
