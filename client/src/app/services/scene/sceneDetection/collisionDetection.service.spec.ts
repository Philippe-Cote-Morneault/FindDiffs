import { expect } from "chai";
import * as THREE from "three";
import { scene } from "../../../tests/scene/sceneMock";
import { ICommonSceneAndObjects } from "../sceneParser/ICommonSceneAndObjects";
import { SceneParserService } from "../sceneParser/sceneParser.service";
import { CollisionDetectionService } from "./collisionDetection.service";

describe("CollisionDetectionService", () => {
    // tslint:disable:no-magic-numbers
    describe("verifyCollisions()", () => {
        it("Should detect a collision if there is an object within the minimum distance and in the correct direction", async () => {
            const sceneObjects: THREE.Object3D[] = new Array<THREE.Object3D>();
            const sceneAndObjects: ICommonSceneAndObjects = await new SceneParserService(scene).parseScene();

            sceneAndObjects.objects.forEach((element: THREE.Object3D) => {
                sceneObjects.push(element);
            });

            const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
            camera.position.set(0, 0, 0);
            const vector: THREE.Vector3 = new THREE.Vector3();
            camera.getWorldDirection(vector);

            const isCollision: boolean = CollisionDetectionService.verifyCollisions(camera, sceneObjects, vector);
            expect(isCollision).to.equal(false);
        });

        it("Should not detect a collision if there is an object within the minimum distance, but in the wrong direction", async () => {
            const sceneObjects: THREE.Object3D[] = new Array<THREE.Object3D>();
            const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
            const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
            const cube: THREE.Mesh = new THREE.Mesh(geometry, material);
            cube.position.set(0, 0, 0);
            cube.translateX(1);
            sceneObjects.push(cube);

            const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera;
            camera.position.set(0, 0, 0);
            const vector: THREE.Vector3 = new THREE.Vector3();
            camera.getWorldDirection(vector);

            const isCollision: boolean = CollisionDetectionService.verifyCollisions(camera, sceneObjects, vector);
            expect(isCollision).to.equal(false);
        });

        it("Should not detect a collision if there is an object out of the minimum distance and in the right direction", async () => {
            const sceneObjects: THREE.Object3D[] = new Array<THREE.Object3D>();
            const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
            const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
            const cube: THREE.Mesh = new THREE.Mesh(geometry, material);
            cube.position.set(0, 0, 0);
            cube.translateZ(-5);
            sceneObjects.push(cube);

            const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera;
            camera.position.set(0, 0, 0);
            const vector: THREE.Vector3 = new THREE.Vector3();
            camera.getWorldDirection(vector);

            const isCollision: boolean = CollisionDetectionService.verifyCollisions(camera, sceneObjects, vector);
            expect(isCollision).to.equal(false);
        });
    });
});
