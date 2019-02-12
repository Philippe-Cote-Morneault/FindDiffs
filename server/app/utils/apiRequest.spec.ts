import Axios from "axios";
import { expect } from "chai";
import * as sinon from "sinon";
import { ICommonImagePair } from "../../../common/model/imagePair";
import { R } from "../strings";
import { NoErrorThrownException } from "../tests/noErrorThrownException";
import { ApiRequest } from "./apiRequest";

describe("ApiRequest", () => {

    beforeEach(() => {
        sinon.stub(Axios, "get");
    });
    afterEach(() => {
        (Axios.get as sinon.SinonStub).restore();
    });

    describe("getImagePairId()", () => {
        it("Should return an image pair if the id is valid.", async () => {
            const imagePair: ICommonImagePair = {
                id: "an id",
                url_difference: "an url difference",
                url_modified: "an url modified",
                url_original: "an url original",
                name: "the name",
                creation_date: new Date(),
                differences_count: 0,
            };
            (Axios.get as sinon.SinonStub).resolves({data: imagePair});
            const response: ICommonImagePair = await ApiRequest.getImagePairId("a valid id");
            expect(JSON.stringify(response)).to.equal(JSON.stringify(imagePair));
        });

        it("Should return an error if the image pair is invalid", async () => {
            (Axios.get as sinon.SinonStub).rejects();
            try {
                await ApiRequest.getImagePairId("an invalid id");
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(R.ERROR_UNKNOWN_ID);
            }
        });
    });
});
