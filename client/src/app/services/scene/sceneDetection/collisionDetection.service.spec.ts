import { expect } from "chai";
import * as THREE from "three";
import { scene } from "../../../tests/scene/sceneMock";
import { ICommonSceneAndObjects } from "../sceneParser/ICommonSceneAndObjects";
import { SceneParserService } from "../sceneParser/sceneParser.service";
import { CollisionDetectionService } from "./collisionDetection.service";

describe("CollisionDetectionService", () => {
    // tslint:disable:no-magic-numbers
    describe("verifyCollisions()", () => {
        const sceneObjects: THREE.Object3D[] = new Array<THREE.Object3D>();
        const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(45, (4 / 3), 0.1, 1000);
        const vector: THREE.Vector3 = new THREE.Vector3();

        beforeEach(async () => {
            const sceneAndObjects: ICommonSceneAndObjects = await new SceneParserService(scene).parseScene();

            sceneAndObjects.objects.forEach((element: THREE.Object3D) => {
                sceneObjects.push(element);
            });

            camera.getWorldDirection(vector);
        });
        it("Should detect a collision if there is an object within the minimum distance and in the correct direction", async () => {
            vector.set(0, -1, 0);
            camera.position.set(104, 2, -50);
            const isCollision: boolean = CollisionDetectionService.verifyCollisions(camera, sceneObjects, vector);
            expect(isCollision).to.equal(false);
        });

        it("Should not detect a collision if there is an object within the minimum distance, but in the wrong direction", async () => {
            vector.set(0, -1, 0);
            camera.position.set(104, 50, -50);
            const isCollision: boolean = CollisionDetectionService.verifyCollisions(camera, sceneObjects, vector);
            expect(isCollision).to.equal(false);
        });

        it("Should not detect a collision if there is an object out of the minimum distance and in the right direction", async () => {
            vector.set(0, 0, -1);
            camera.position.set(104, 2, -50);
            const isCollision: boolean = CollisionDetectionService.verifyCollisions(camera, sceneObjects, vector);
            expect(isCollision).to.equal(false);
        });
    });
});
