import Axios from "axios";
import { expect } from "chai";
import * as sinon from "sinon";
import { mockReq } from "sinon-express-mock";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import { GameCard } from "../../model/schemas/gameCard";
import { GameCardService } from "./gameCard.service";

describe("GameCardService", () => {
    const service: GameCardService = new GameCardService();
    beforeEach(() => {
        sinon.stub(Axios, "get");
        sinon.stub(GameCard.prototype, "save");
    });

    afterEach(() => {
        (Axios.get as sinon.SinonStub).restore();
        (GameCard.prototype.save as sinon.SinonStub).restore();
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
                throw new Error("No errror thrown by service");
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
                throw new Error("No errror thrown by service");
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
                throw new Error("No errror thrown by service");
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
                throw new Error("No errror thrown by service");
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
                throw new Error("No errror thrown by service");
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
                throw new Error("No errror thrown by service");
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
});
