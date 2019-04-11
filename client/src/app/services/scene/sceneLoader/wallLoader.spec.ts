import { expect } from "chai";
import * as THREE from "three";
import { WallLoader } from "./WallLoader";

describe("WallLoader", () => {
    // tslint:disable:no-magic-numbers
    describe("loadGeometric()", () => {
        it("Should add 6 walls to the boundingBoxes array, for a geometric scene", async () => {
            const scene: THREE.Scene = new THREE.Scene;
            const initialSize: number = scene.children.length;
            await WallLoader.loadGeometric(scene);
            const finalSize: number = scene.children.length;

            expect(initialSize + 6).to.equal(finalSize);
        });
    });

    describe("loadThematic()", () => {
        it("Should add 6 walls to the boundingBoxes array, for a thematic scene", async () => {
            const scene: THREE.Scene = new THREE.Scene;
            const initialSize: number = scene.children.length;
            await WallLoader.loadThematic(scene);
            const finalSize: number = scene.children.length;

            expect(initialSize + 6).to.equal(finalSize);
        });
    });
});
