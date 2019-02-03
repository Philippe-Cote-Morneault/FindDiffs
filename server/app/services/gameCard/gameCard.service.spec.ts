import Axios from "axios";
import { expect } from "chai";
import * as sinon from "sinon";
import { mockReq } from "sinon-express-mock";
import { POVType } from "../../../../common/model/gameCard";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { GameCard } from "../../model/schemas/gameCard";
import { GameCardSchemaMock } from "../../tests/gameCardSchemaMock";
import { MongooseMock } from "../../tests/mocks";
import { NoErrorThrownException } from "../../tests/noErrorThrownException";
import { GameCardService } from "./gameCard.service";

// We can disable this tslint max-line-count since it's only a test file and 
// therefore not a code smell
// tslint:disabl max-file-line-count
describe("GameCardService", () => {
    const service: GameCardService = new GameCardService();
    beforeEach(() => {
        sinon.stub(Axios, "get");
        sinon.stub(GameCard.prototype, "save");
        sinon.stub(GameCard.prototype, "remove");
        sinon.stub(GameCard, "find");
        sinon.stub(GameCard, "findById");
    });

    afterEach(() => {
        (Axios.get as sinon.SinonStub).restore();
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

        it("Should throw an error if the field image-pair-id is not present", async () => {
            const request: Object = {
                body: {
                    name: "bob",
                },
            };
            const errorMessage: string = "The field image-pair-id is not present.";
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
                    "image-pair-id": "an id",
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
                    "image-pair-id": "an id",
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

        it("Should throw an error if the image-pair-id is not in storage", async () => {
            const request: Object = {
                body: {
                    name: "bob",
                    "image-pair-id": "an id",
                    pov: "Free",
                },
            };
            (Axios.get as sinon.SinonStub).rejects();

            const errorMessage: string = "The image id could not be found.";
            try {
                await service.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(errorMessage);
            }
        });

        it("Should throw an error if the image-pair-id is not in storage", async () => {
            const request: Object = {
                body: {
                    name: "bob",
                    "image-pair-id": "an id",
                    pov: "Free",
                },
            };
            (Axios.get as sinon.SinonStub).rejects();

            const errorMessage: string = "The image id could not be found.";
            try {
                await service.post(mockReq(request));
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(errorMessage);
            }
        });

        it("Should return the correct response if all the fields are valid", async () => {
            const request: Object = {
                body: {
                    name: "bob",
                    "image-pair-id": "an id",
                    pov: "Free",
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
            const axiosResponse: Object = {
                data: imagepair,
            };

            (Axios.get as sinon.SinonStub).resolves(axiosResponse);

            const response: string = await service.post(mockReq(request));
            expect(JSON.stringify(JSON.parse(response).image_pair))
            .to.eql(
                JSON.stringify(imagepair),
                );
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
            const axiosResponse: Object = {
                data: imagepair,
            };
            (Axios.get as sinon.SinonStub).resolves(axiosResponse);

            (GameCard.find as sinon.SinonStub).returns(
            new MongooseMock.Query([{
                pov: POVType.Free,
                title: "title",
                imagePairId: "an id",
                creation_date: new Date(),
                best_time_online: [0],
                best_time_solo: [0],
            }],                    true));

            const response: string = await service.index();
            expect(JSON.parse(response).length).to.equal(1);
        });
        it("Should return an error if a pair is not available", async () => {
            (Axios.get as sinon.SinonStub).rejects();
            (GameCard.find as sinon.SinonStub).returns(
            new MongooseMock.Query([{
                pov: POVType.Free,
                title: "title",
                imagePairId: "an id",
                creation_date: new Date(),
                best_time_online: [0],
                best_time_solo: [0],
            }],                    true));

            try {
                await service.index();
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The image id could not be found.");
            }
        });
    });

    describe("single()", () => {
        it("Should return throw an error if the id is not in the database", async () => {
            (GameCard.findById as sinon.SinonStub).returns(new MongooseMock.Query({}, false));
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
            const axiosResponse: Object = {
                data: imagepair,
            };

            (Axios.get as sinon.SinonStub).resolves(axiosResponse);
            (GameCard.findById as sinon.SinonStub).returns(
            new MongooseMock.Query({
                pov: POVType.Free,
                title: "title",
                imagePairId: "an id",
                creation_date: new Date(),
                best_time_online: [0],
                best_time_solo: [0],
            },                     true));

            const response: string = await service.single("good id");
            expect(JSON.parse(response).image_pair.name).to.equal(imagepair.name);
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
            (GameCard.findById as sinon.SinonStub).resolves();

            const response: string = await service.update(mockReq(request));
            expect(JSON.parse(response).title).to.equal("success");
        });
    });
});
