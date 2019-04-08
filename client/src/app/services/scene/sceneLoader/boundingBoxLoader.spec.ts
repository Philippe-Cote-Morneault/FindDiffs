import { expect } from "chai";
import { scene } from "src/app/tests/scene/sceneMock";
import * as THREE from "three";
import { BoundingBoxLoader } from "./boundingBoxLoader";

describe("BoundingBoxLoader", () => {
    describe("loadLamp()", () => {

        it("Should add a lamp to boundingBoxes array, which is 2 objects", async () => {
            const boundingBoxes: THREE.Box3[] = new Array<THREE.Box3>();
            const lampObj: THREE.Object3D = new THREE.Object3D();
            // tslint:disable:no-magic-numbers
            await BoundingBoxLoader.loadLamp(boundingBoxes, scene.sceneObjects[4], lampObj);

            expect(boundingBoxes.length).to.equal(2);
        });
    });

    describe("loadObject()", () => {
        it("Should add an object to boundingBoxes array", async () => {
            const boundingBoxes: THREE.Box3[] = new Array<THREE.Box3>();
            const randomObj: THREE.Object3D = new THREE.Object3D();
            await BoundingBoxLoader.loadObject(boundingBoxes, randomObj);

            expect(boundingBoxes.length).to.equal(1);
        });
    });

});
