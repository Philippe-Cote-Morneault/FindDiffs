import { expect } from "chai";
import { DifferenceType, ICommonReveal3D } from "../../../../common/model/reveal";
import { ICommonGeometricModifications } from "../../../../common/model/scene/modifications/geometricModifications";
import { ICommonThematicModifications } from "../../../../common/model/scene/modifications/thematicModifications";
import { ObjectType } from "../../../../common/model/scene/scene";
import { R } from "../../strings";
import { NoErrorThrownException } from "../../tests/noErrorThrownException";
import { sceneGeometricModifications } from "../../tests/sceneGeometric/geometricSceneModificationsMocks";
import { sceneThematicModifications } from "../../tests/sceneThematic/thematicSceneModificationsMocks";

import { RevealDifference3D } from "./revealDifference3D";

describe("RevealDifference3D", () => {
    describe("reveal()", () => {
        // tslint:disable:max-line-length
        describe("geometricScene", () => {
            it("Should throw an error if there is no difference to be found", () => {
                const mockSceneModifications: ICommonGeometricModifications = sceneGeometricModifications;
                const originalObjectId: string = "randomNotExistingId";
                const modifiedObjectId: string = "randomNotExistingId";

                try {
                    new RevealDifference3D(mockSceneModifications, originalObjectId, modifiedObjectId, ObjectType.Geometric).reveal();
                    throw new NoErrorThrownException();
                } catch (err) {
                    expect(err.message).to.equal(R.ERROR_NO_DIFFERENCE_FOUND);
                }
            });

            it("Should have a ICommonReveal3D with a hit and colorChanged if the originalId sent is in the sceneModification", () => {
                const mockSceneModifications: ICommonGeometricModifications = sceneGeometricModifications;
                const originalObjectId: string = "sf34fsdfs";
                const modifiedObjectId: string = "sf34fsdfs";

                const expectedReveal: ICommonReveal3D =
                    new RevealDifference3D(mockSceneModifications, originalObjectId, modifiedObjectId, ObjectType.Geometric).reveal();

                expect(expectedReveal.hit).to.equal(true);
                expect(expectedReveal.differenceType).to.equal(DifferenceType.colorChanged);
            });

            it("Should have a ICommonReveal3D with a hit and addedObject if the modifiedId sent is in the sceneModification", () => {
                const mockSceneModifications: ICommonGeometricModifications = sceneGeometricModifications;
                const originalObjectId: string = "kjhdhgfdsfdsf";
                const modifiedObjectId: string = "kjhdhgfdsfdsf";

                const expectedReveal: ICommonReveal3D =
                    new RevealDifference3D(mockSceneModifications, originalObjectId, modifiedObjectId, ObjectType.Geometric).reveal();

                expect(expectedReveal.hit).to.equal(true);
                expect(expectedReveal.differenceType).to.equal(DifferenceType.addedObject);
            });

            it("Should have a ICommonReveal3D with a hit and removedObject if the originalId sent is in the sceneModification", () => {
                const mockSceneModifications: ICommonGeometricModifications = sceneGeometricModifications;
                const originalObjectId: string = "kjhdhgf";
                const modifiedObjectId: string = "kjhdhgf";

                const expectedReveal: ICommonReveal3D =
                    new RevealDifference3D(mockSceneModifications, originalObjectId, modifiedObjectId, ObjectType.Geometric).reveal();

                expect(expectedReveal.hit).to.equal(true);
                expect(expectedReveal.differenceType).to.equal(DifferenceType.removedObject);
            });
        });

        describe("thematicScene", () => {
            it("Should throw an error if there is no difference to be found", () => {
                const mockSceneModifications: ICommonThematicModifications = sceneThematicModifications;
                const originalObjectId: string = "randomNotExistingId";
                const modifiedObjectId: string = "randomNotExistingId";

                try {
                    new RevealDifference3D(mockSceneModifications, originalObjectId, modifiedObjectId, ObjectType.Thematic).reveal();
                    throw new NoErrorThrownException();
                } catch (err) {
                    expect(err.message).to.equal(R.ERROR_NO_DIFFERENCE_FOUND);
                }
            });

            it("Should have a ICommonReveal3D with a hit and textureObjectChanged if the originalId sent is in the sceneModification", () => {
                const mockSceneModifications: ICommonThematicModifications = sceneThematicModifications;
                const originalObjectId: string = "213123";
                const modifiedObjectId: string = "213123";

                const expectedReveal: ICommonReveal3D =
                    new RevealDifference3D(mockSceneModifications, originalObjectId, modifiedObjectId, ObjectType.Thematic).reveal();

                expect(expectedReveal.hit).to.equal(true);
                expect(expectedReveal.differenceType).to.equal(DifferenceType.textureObjectChanged);
            });

            it("Should have a ICommonReveal3D with a hit and removedObject if the originalId sent is in the sceneModification", () => {
                const mockSceneModifications: ICommonThematicModifications = sceneThematicModifications;
                const originalObjectId: string = "kjhdhgf";
                const modifiedObjectId: string = "kjhdhgf";

                const expectedReveal: ICommonReveal3D =
                    new RevealDifference3D(mockSceneModifications, originalObjectId, modifiedObjectId, ObjectType.Thematic).reveal();

                expect(expectedReveal.hit).to.equal(true);
                expect(expectedReveal.differenceType).to.equal(DifferenceType.removedObject);
            });
        });
    });
});
