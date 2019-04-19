import { expect } from "chai";
import * as THREE from "three";
import { WallLoader } from "./wallLoader";

describe("WallLoader", () => {
    // tslint:disable:no-magic-numbers
    describe("loadGeometric()", () => {
        it("Should add 6 walls to the scene and the sceneObjects array, for a geometric scene", async () => {
            const scene: THREE.Scene = new THREE.Scene;
            const sceneObjects: THREE.Object3D[] = new Array<THREE.Object3D>();
            const initialSizeScene: number = scene.children.length;
            const initialSizeSceneObjects: number = sceneObjects.length;

            await WallLoader.loadGeometric(scene, sceneObjects);

            const finalSizeScene: number = scene.children.length;
            const finalSizeSceneObjects: number = sceneObjects.length;

            expect(initialSizeScene + 6).to.equal(finalSizeScene);
            expect(initialSizeSceneObjects + 6).to.equal(finalSizeSceneObjects);
        });
    });

    describe("loadThematic()", () => {
        it("Should add 6 walls to the scene and the sceneObjects array, for a thematic scene", async () => {
            const scene: THREE.Scene = new THREE.Scene;
            const sceneObjects: THREE.Object3D[] = new Array<THREE.Object3D>();
            const initialSizeScene: number = scene.children.length;
            const initialSizeSceneObjects: number = sceneObjects.length;

            await WallLoader.loadThematic(scene, sceneObjects);

            const finalSizeScene: number = scene.children.length;
            const finalSizeSceneObjects: number = sceneObjects.length;

            expect(initialSizeScene + 6).to.equal(finalSizeScene);
            expect(initialSizeSceneObjects + 6).to.equal(finalSizeSceneObjects);
        });
    });
});
