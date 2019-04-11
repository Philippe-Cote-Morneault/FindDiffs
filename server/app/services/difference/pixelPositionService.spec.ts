import * as axios from "axios";
import { expect } from "chai";
import * as sinon from "sinon";
import { ICommonReveal } from "../../../../common/model/reveal";
import { PixelPositionService } from "./pixelPosition.service";

describe("PixelPositionService", () => {
    describe("getInstance()", () => {
        it("Should return a PixelPositionService instance", () => {
            const instance: PixelPositionService = PixelPositionService.getInstance();
            expect(instance).to.be.an.instanceOf(PixelPositionService);
        });

        it("Should return the same PixelPositionService instance", () => {
            const instance1: PixelPositionService = PixelPositionService.getInstance();
            const instance2: PixelPositionService = PixelPositionService.getInstance();
            expect(instance1).to.equal(instance2);
        });
    });

    describe("postPixelPosition", () => {
        it("Should return the ICommonReveal returned by the axios post call", () => {
            const reveal: ICommonReveal = {
                hit: true,
                pixels_affected: [{x: 1, y: 2}],
                difference_id: 1,
            };
            const stubResponse: Object = {status: 200, statusText: "OK", data: reveal };
            // tslint:disable-next-line:typedef
            const axiosStub = sinon.stub(axios.default, "post");
            axiosStub.returns(Promise.resolve(stubResponse) as axios.AxiosPromise);

            PixelPositionService.getInstance().postPixelPosition("123", 1, 1)
                .then((value: ICommonReveal | null) => {
                    axiosStub.restore();
                    expect(value).to.equal(reveal);
                });
        });
        it("Should return null if the axios post call fails", () => {
            // tslint:disable-next-line:typedef
            const axiosStub = sinon.stub(axios.default, "post");
            axiosStub.rejects();
            PixelPositionService.getInstance().postPixelPosition("123", 1, 1)
                .then((value: ICommonReveal | null) => {
                    axiosStub.restore();
                    expect(value).to.equal(null);
                });
        });
    });
});