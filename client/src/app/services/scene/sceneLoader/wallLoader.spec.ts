import { expect } from "chai";
import * as THREE from "three";
import { WallLoader } from "./WallLoader";

describe("WallLoader", () => {
    // tslint:disable:no-magic-numbers
    describe("loadGeometric()", () => {
        it("Should add 6 walls to the boundingBoxes array, for a geometric scene", async () => {
            const boundingBoxes: THREE.Box3[] = new Array<THREE.Box3>();
            await WallLoader.loadGeometric(boundingBoxes);

            expect(boundingBoxes.length).to.equal(6);
        });
    });

    describe("loadThematic()", () => {
        it("Should add 6 walls to the boundingBoxes array, for a thematic scene", async () => {
            const boundingBoxes: THREE.Box3[] = new Array<THREE.Box3>();
            await WallLoader.loadThematic(boundingBoxes);

            expect(boundingBoxes.length).to.equal(6);
        });
    });
});
