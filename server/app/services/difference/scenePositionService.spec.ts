import * as axios from "axios";
import { expect } from "chai";
import * as sinon from "sinon";
import { DifferenceType, ICommonReveal3D } from "../../../../common/model/reveal";
import { ObjectType } from "../../../../common/model/scene/scene";
import { ScenePositionService } from "./scenePositionService";

    // tslint:disable: no-floating-promises

describe("ScenePositionService", () => {
    describe("getInstance()", () => {
        it("Should return a ScenePositionService instance", () => {
            const instance: ScenePositionService = ScenePositionService.getInstance();
            expect(instance).to.be.an.instanceOf(ScenePositionService);
        });

        it("Should return the same GameService instance", () => {
            const instance1: ScenePositionService = ScenePositionService.getInstance();
            const instance2: ScenePositionService = ScenePositionService.getInstance();
            expect(instance1).to.equal(instance2);
        });
    });

    describe("post3DClick", () => {
        it("Should return the ICommonReveal3D returned by the axios post call", () => {
            const _3DReveal: ICommonReveal3D = {
                hit: true,
                differenceType: DifferenceType.addedObject,
                difference_id: "123",
            };
            const stubResponse: Object = {status: 200, statusText: "OK", data: _3DReveal };
            // tslint:disable-next-line:typedef
            const axiosStub = sinon.stub(axios.default, "post");
            axiosStub.returns(Promise.resolve(stubResponse) as axios.AxiosPromise);

            ScenePositionService.getInstance().post3DClick("123", "123", "1234", ObjectType.Geometric)
                .then((value: ICommonReveal3D | null) => {
                    axiosStub.restore();
                    expect(value).to.equal(_3DReveal);
                });
        });
        it("Should return null if the axios post call fails", () => {
            // tslint:disable-next-line:typedef
            const axiosStub = sinon.stub(axios.default, "post");
            axiosStub.rejects();
            ScenePositionService.getInstance().post3DClick("123", "123", "123", ObjectType.Geometric)
                .then((value: ICommonReveal3D | null) => {
                    expect(value).to.equal(null);
                });
        });
    });
});
