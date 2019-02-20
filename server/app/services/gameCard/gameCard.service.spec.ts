import { expect } from "chai";
import * as sinon from "sinon";
import { mockReq } from "sinon-express-mock";
import { NotFoundException } from "../../../../common/errors/notFoundException";
import { ICommonGameCard, POVType } from "../../../../common/model/gameCard";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { ICommonScene, ObjectType } from "../../../../common/model/scene/scene";
import { GameCard } from "../../model/schemas/gameCard";
import { R } from "../../strings";
import { GameCardSchemaMock } from "../../tests/gameCardSchemaMock";
import { NoErrorThrownException } from "../../tests/noErrorThrownException";
import { ApiRequest } from "../../utils/apiRequest";
import { EnumUtils } from "../../utils/enumUtils";
import { GameCardService } from "./gameCard.service";

// We can disable this tslint max-line-count since it's only a test file and
// therefore not a code smell
// tslint:disable max-file-line-count
describe("GameCardService", () => {
    const service: GameCardService = new GameCardService();
    beforeEach(() => {
        sinon.stub(ApiRequest, "getImagePairId");
        sinon.stub(ApiRequest, "getSceneId");
        sinon.stub(GameCard.prototype, "save");
        sinon.stub(GameCard.prototype, "remove");
        sinon.stub(GameCard, "find");
        sinon.stub(GameCard, "findById");
    });

    afterEach(() => {
        (ApiRequest.getImagePairId as sinon.SinonStub).restore();
        (ApiRequest.getSceneId as sinon.SinonStub).restore();
        (GameCard.prototype.save as sinon.SinonStub).restore();
        (GameCard.prototype.remove as sinon.SinonStub).restore();
        (GameCard.find as sinon.SinonStub).restore();
        (GameCard.findById as sinon.SinonStub).restore();
    });

    describe("post()", () => {
        it("Should throw an error if the field name is not present", async () => {
            const request: Object = {
                body: {
                },
            };
            const errorMessage: string = "The field name is not present.";
            try {
                await service.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(errorMessage);
            }
        });

        it("Should throw an error if the field resource_id is not present", async () => {
            const request: Object = {
                body: {
                    name: "bob",
                },
            };
            const errorMessage: string = "The field resource_id is not present.";
            try {
                await service.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(errorMessage);
            }
        });

        it("Should throw an error if the field pov is not present", async () => {
            const request: Object = {
                body: {
                    name: "bob",
                    resource_id: "an id",
                },
            };
            const errorMessage: string = "The field pov is not present.";
            try {
                await service.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(errorMessage);
            }
        });

        it("Should throw an error if the field pov is not in enum POVTypes", async () => {
            const request: Object = {
                body: {
                    name: "bob",
                    resource_id: "an id",
                    pov: "bob",
                },
            };
            const errorMessage: string = "The pov type is not recognized.";
            try {
                await service.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(errorMessage);
            }
        });

        it("Should throw an error if the field pov is not in enum POVTypes, but enters switch case", async () => {
            const request: Object = {
                body: {
                    name: "bob",
                    resource_id: "an id",
                    pov: "bob",
                },
            };
            sinon.stub(EnumUtils, "isStringInEnum");
            (EnumUtils.isStringInEnum as sinon.SinonStub).returns(true);
            const errorMessage: string = "The pov type is not recognized.";

            try {
                await service.post(mockReq(request));
                (EnumUtils.isStringInEnum as sinon.SinonStub).restore();
                throw new NoErrorThrownException();
            } catch (err) {
                (EnumUtils.isStringInEnum as sinon.SinonStub).restore();
                expect(err.message).to.equal(errorMessage);
            }
        });

        it("Should throw an error if the resource_id is not in storage", async () => {
            const request: Object = {
                body: {
                    name: "bob",
                    resource_id: "an id",
                    pov: "Simple",
                },
            };
            (ApiRequest.getImagePairId as sinon.SinonStub).rejects(
                    new NotFoundException(R.ERROR_UNKNOWN_ID),
                );

            const errorMessage: string = "The id could not be found.";
            try {
                await service.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(errorMessage);
            }
        });

        it("Should throw an error if the resource_id is not in storage Simple", async () => {
            const request: Object = {
                body: {
                    name: "bob",
                    resource_id: "an id",
                    pov: "Simple",
                },
            };
            (ApiRequest.getImagePairId as sinon.SinonStub).rejects(
                new NotFoundException(R.ERROR_UNKNOWN_ID),
            );

            const errorMessage: string = "The id could not be found.";
            try {
                await service.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(errorMessage);
            }
        });

        it("Should throw an error if the resource_id is not in storage Free", async () => {
            const request: Object = {
                body: {
                    name: "bob",
                    resource_id: "an id",
                    pov: "Free",
                },
            };
            (ApiRequest.getSceneId as sinon.SinonStub).rejects(
                new NotFoundException(R.ERROR_UNKNOWN_ID),
            );

            const errorMessage: string = "The id could not be found.";
            try {
                await service.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(errorMessage);
            }
        });

        it("Should return an error since there is not 7 differences.", async () => {
            const request: Object = {
                body: {
                    name: "bob",
                    resource_id: "an id",
                    pov: "Simple",
                },
            };
            const imagepair: ICommonImagePair = {
                id: "an id",
                url_difference: "differences",
                url_modified: "modified",
                url_original: "original",
                name: "Slim Shady",
                creation_date: new Date(),
                differences_count: 0,
            };

            (ApiRequest.getImagePairId as sinon.SinonStub).resolves(imagepair);
            try {
                await service.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The game card should have 7 differences. It has 0 differences.");
            }
        });

        it("Should return the correct response if all the fields are valid simple", async () => {
            const request: Object = {
                body: {
                    name: "bob",
                    resource_id: "an id",
                    pov: "Simple",
                },
            };
            const imagepair: ICommonImagePair = {
                id: "an id",
                url_difference: "differences",
                url_modified: "modified",
                url_original: "original",
                name: "Slim Shady",
                creation_date: new Date(),
                differences_count: 7,
            };

            (ApiRequest.getImagePairId as sinon.SinonStub).resolves(imagepair);

            const response: ICommonGameCard = JSON.parse(await service.post(mockReq(request)));

            expect(response.resource_id).to.equal(request["body"]["resource_id"]);
            expect(response.title).to.equal(request["body"]["name"]);
            expect(response.pov).to.equal(request["body"]["pov"]);
        });

        it("Should return the correct response if all the fields are valid free", async () => {
            const request: Object = {
                body: {
                    name: "bob",
                    resource_id: "an id",
                    pov: "Free",
                },
            };

            const scene: ICommonScene = {
                id: "an id",
                dimensions: {
                    x: 100,
                    y: 100,
                    z: 100,
                },
                type: ObjectType.Geometric,
                sceneObjects: [],
            };

            (ApiRequest.getSceneId as sinon.SinonStub).resolves(scene);

            const response: ICommonGameCard = JSON.parse(await service.post(mockReq(request)));

            expect(response.resource_id).to.equal(request["body"]["resource_id"]);
            expect(response.title).to.equal(request["body"]["name"]);
            expect(response.pov).to.equal(request["body"]["pov"]);
        });

    });

    describe("index()", () => {
        it("Should return an array of game cards", async () => {
            const imagepair: ICommonImagePair = {
                id: "an id",
                url_difference: "differences",
                url_modified: "modified",
                url_original: "original",
                name: "Slim Shady",
                creation_date: new Date(),
                differences_count: 0,
            };

            (ApiRequest.getImagePairId as sinon.SinonStub).resolves(imagepair);

            (GameCard.find as sinon.SinonStub).resolves(
            [{
                pov: POVType.Simple,
                title: "title",
                resource_id: "an id",
                creation_date: new Date(),
                best_time_online: [0],
                best_time_solo: [0],
            }]);

            const response: string = await service.index();
            expect(JSON.parse(response).length).to.equal(1);
        });
    });

    describe("single()", () => {
        it("Should return throw an error if the id is not in the database", async () => {
            (GameCard.findById as sinon.SinonStub).rejects();
            try {
                await service.single("invalid id");
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The id could not be found.");
            }
        });

        it("Should throw an error if the id is not in the database and mongoose returns null", async () => {
            (GameCard.findById as sinon.SinonStub).resolves(undefined);
            try {
                await service.single("invalid id");
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The id could not be found.");
            }
        });

        it("Should return a game card", async () => {
            const imagepair: ICommonImagePair = {
                id: "an id",
                url_difference: "differences",
                url_modified: "modified",
                url_original: "original",
                name: "Slim Shady",
                creation_date: new Date(),
                differences_count: 0,
            };

            (ApiRequest.getImagePairId as sinon.SinonStub).resolves(imagepair);
            (GameCard.findById as sinon.SinonStub).resolves(
            {
                pov: POVType.Simple,
                title: "title",
                resource_id: "an id",
                creation_date: new Date(),
                best_time_online: [0],
                best_time_solo: [0],
            });

            const response: string = await service.single("good id");
            expect(JSON.parse(response).title).to.equal("title");
        });
    });
    describe("delete()", () => {
        it("Should delete the game card if the id is valid", async () => {
            (GameCard.findById as sinon.SinonStub).resolves(new GameCard());
            const response: string = await service.delete("id to delete");

            expect(JSON.parse(response).body).to.equal("The gamecard was deleted.");
        });

        it("Should throw an error if the id is invalid", async() => {
            (GameCard.findById as sinon.SinonStub).rejects();
            try {
                await service.delete("invalid id");
            } catch (err) {
                expect(err.message).to.equal("The id could not be found.");
            }
        });

        it("Should throw an error if the id is invalid and mongoose returns null", async() => {
            (GameCard.findById as sinon.SinonStub).resolves(undefined);
            try {
                await service.delete("invalid id");
            } catch (err) {
                expect(err.message).to.equal("The id could not be found.");
            }
        });
    });
    describe("update()" , () => {
        it("Should throw an error if the id is not in the db", async() => {
            const request: Object = {
                params: {
                    id: "invalid id",
                },
            };
            (GameCard.findById as sinon.SinonStub).rejects(new Error());
            try {
                await service.update(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The id could not be found.");
            }
        });

        it("Should throw an error if the id is not in the db and mongoose return null", async() => {
            const request: Object = {
                params: {
                    id: "invalid id",
                },
            };
            (GameCard.findById as sinon.SinonStub).resolves(undefined);
            try {
                await service.update(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The id could not be found.");
            }
        });

        it("Should throw an error if the request is empty", async() => {
            const request: Object = {
                params: {
                    id: "invalid id",
                },
                body: {},
            };
            (GameCard.findById as sinon.SinonStub).resolves({});
            try {
                await service.update(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("No changes were detected!");
            }
        });

        it("Should update the field best_time_solo", async() => {
            const request: Object = {
                params: {
                    id: "invalid id",
                },
                body: {
                    best_time_solo: "change",
                },
            };
            (GameCard.findById as sinon.SinonStub).resolves(new GameCardSchemaMock((doc: GameCardSchemaMock) => {
                expect(doc.best_time_solo.length).to.equal(service.DEFAULT_SCORE_NUMBER);
            }));
            await service.update(mockReq(request));
        });

        it("Should update the field best_time_online", async() => {
            const request: Object = {
                params: {
                    id: "invalid id",
                },
                body: {
                    best_time_online: "change",
                },
            };
            (GameCard.findById as sinon.SinonStub).resolves(new GameCardSchemaMock((doc: GameCardSchemaMock) => {
                expect(doc.best_time_online.length).to.equal(service.DEFAULT_SCORE_NUMBER);
            }));
            await service.update(mockReq(request));
        });

        it("Should update the two fields", async() => {
            const request: Object = {
                params: {
                    id: "invalid id",
                },
                body: {
                    best_time_online: "change",
                    best_time_solo: "change",

                },
            };
            (GameCard.findById as sinon.SinonStub).resolves(new GameCardSchemaMock((doc: GameCardSchemaMock) => {
                expect(doc.best_time_online.length).to.equal(service.DEFAULT_SCORE_NUMBER);
                expect(doc.best_time_solo.length).to.equal(service.DEFAULT_SCORE_NUMBER);
            }));
            await service.update(mockReq(request));
        });

        it("Should return a success message", async() => {
            const request: Object = {
                params: {
                    id: "invalid id",
                },
                body: {
                    best_time_online: "change",
                    best_time_solo: "change",

                },
            };
            (GameCard.findById as sinon.SinonStub).resolves(new GameCardSchemaMock(new Function));
            const response: string = await service.update(mockReq(request));
            expect(JSON.parse(response).title).to.equal("Success");
        });
    });
});
