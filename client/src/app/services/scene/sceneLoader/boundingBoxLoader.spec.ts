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

    describe("loadCamera()", () => {
        it("Should create a cube boundingBox and a cube geometry for the camera", async () => {
            const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
            const sceneThree: THREE.Scene = new THREE.Scene();
            await BoundingBoxLoader.loadCamera(sceneThree, camera);

            const mockGeometry: THREE.BoxGeometry = new THREE.BoxGeometry( );
            const mockMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( {color: 0x00F00} );
            const mockCube: THREE.Mesh = new THREE.Mesh( mockGeometry, mockMaterial );
            mockCube.position.set(camera.position.x, camera.position.y, camera.position.z);

            const mockBboxCam: THREE.Box3 = new THREE.Box3().setFromObject(mockCube);
            const newObject: Object = {cube: mockBboxCam, bbox: mockBboxCam};

            expect(BoundingBoxLoader.loadCamera(sceneThree, camera)).to.equal(newObject);
        });
    });
});
