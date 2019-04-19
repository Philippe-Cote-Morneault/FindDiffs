import * as THREE from "three";
import { CollisionDetectionService } from "../sceneDetection/collisionDetection.service";

export class ControlsGenerator {
    public static isLocked: boolean = true;
    public static distance: number = 0;
    public static isCollision: boolean;
    private static readonly DISTANCE_TO_MOVE: number = 1;

    // tslint:disable:max-func-body-length
    public static generateGameControls(camera: THREE.PerspectiveCamera, sceneObjects: THREE.Object3D[]): void {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            const vector: THREE.Vector3 = new THREE.Vector3();
            camera.getWorldDirection(vector);

            if (!ControlsGenerator.isLocked) {
                switch (event.key) {
                    case "w":
                        this.isCollision = CollisionDetectionService.verifyCollisions(camera, sceneObjects, vector);

                        if (!this.isCollision) {
                            camera.translateZ(-ControlsGenerator.DISTANCE_TO_MOVE);
                        }

                        break;
                    case "a":
                        // tslint:disable-next-line:no-magic-numbers
                        camera.rotation.y += Math.PI / 2;
                        camera.getWorldDirection(vector);

                        this.isCollision = CollisionDetectionService.verifyCollisions(camera, sceneObjects, vector);

                        // tslint:disable-next-line:no-magic-numbers
                        camera.rotation.y -= Math.PI / 2;
                        if (!this.isCollision) {
                            camera.translateX(-ControlsGenerator.DISTANCE_TO_MOVE);
                        }

                        break;
                    case "s":
                        this.isCollision = CollisionDetectionService.verifyCollisions(
                            camera, sceneObjects, new THREE.Vector3(-vector.x, -vector.y, -vector.z));

                        if (!this.isCollision) {
                            camera.translateZ(ControlsGenerator.DISTANCE_TO_MOVE);
                        }

                        break;
                    case "d":
                        // tslint:disable-next-line:no-magic-numbers
                        camera.rotation.y -= Math.PI / 2;
                        camera.getWorldDirection(vector);

                        this.isCollision = CollisionDetectionService.verifyCollisions(camera, sceneObjects, vector);

                        // tslint:disable-next-line:no-magic-numbers
                        camera.rotation.y += Math.PI / 2;
                        if (!this.isCollision) {
                            camera.translateX(ControlsGenerator.DISTANCE_TO_MOVE);
                        }

                        break;
                    default:
                        break;
                }
            }
        });
    }
}
