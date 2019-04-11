import { expect } from "chai";
import * as THREE from "three";
import { CollisionDetectionService } from "./collisionDetection.service";

describe("CollisionDetectionService", () => {
    // tslint:disable:no-magic-numbers
    describe("verifyCollisions()", () => {
        it("Should detect a collision if there is an object within the minimum distance and in the correct direction", async () => {
            const scene: THREE.Scene = new THREE.Scene;
            const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
            const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0});
            const cube: THREE.Mesh = new THREE.Mesh(geometry, material);
            cube.position.set(0, 0, 0);
            scene.add(cube);
            scene.getObjectById(cube.id).position.set(0, 0, -2);

            const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera;
            camera.position.set(0, 0, 0);
            const vector: THREE.Vector3 = new THREE.Vector3();
            camera.getWorldDirection(vector);

            const isCollision: boolean = CollisionDetectionService.verifyCollisions(camera, scene, vector);
            expect(isCollision).to.equal(true);
        });
    });
});
