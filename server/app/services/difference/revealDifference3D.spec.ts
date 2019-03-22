import { expect } from "chai";
import { DifferenceType, ICommonReveal3D } from "../../../../common/model/reveal";
// import { scene } from "../../../../client/src/app/tests/scene/sceneMock";
import { ICommonGeometricModifications } from "../../../../common/model/scene/modifications/geometricModifications";
import { /*ICommonScene,*/ ObjectType } from "../../../../common/model/scene/scene";
import { R } from "../../strings";
import { NoErrorThrownException } from "../../tests/noErrorThrownException";
import { sceneModifications } from "../../tests/sceneGeometric/geometricSceneModificationsMock";
import { RevealDifference3D } from "./revealDifference3D";

describe("RevealDifference3D", () => {
    describe("reveal()", () => {
        // tslint:disable:max-line-length
        it("Should throw an error if there is no difference to be found", () => {
            const mockSceneModifications: ICommonGeometricModifications = sceneModifications;
            const originalObjectId: string = "randomNotExistingId";
            const modifiedObjectId: string = "randomNotExistingId";

            try {
                new RevealDifference3D(mockSceneModifications, originalObjectId, modifiedObjectId, ObjectType.Geometric).reveal();
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(R.ERROR_NO_DIFFERENCE_FOUND);
            }
        });

        describe("geometricScene", () => {
            it("Should have a ICommonReveal3D with a hit and colorChanged if the originalId sent is in the sceneModification", () => {
                const mockSceneModifications: ICommonGeometricModifications = sceneModifications;
                const originalObjectId: string = "sf34fsdfs";
                const modifiedObjectId: string = "sf34fsdfs";

                const expectedReveal: ICommonReveal3D =
                    new RevealDifference3D(mockSceneModifications, originalObjectId, modifiedObjectId, ObjectType.Geometric).reveal();

                expect(expectedReveal.hit).to.equal(true);
                expect(expectedReveal.differenceType).to.equal(DifferenceType.colorChanged);
            });
        });
    });
});
