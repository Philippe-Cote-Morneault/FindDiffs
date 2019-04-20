import { Injectable } from "@angular/core";
import * as THREE from "three";

@Injectable({
    providedIn: "root",
})
export class CollisionDetectionService {
    private static readonly MAX_DISTANCE: number = 255;
    private static readonly MIN_DISTANCE_TO_MOVE: number = 2;

    public static verifyCollisions(camera: THREE.PerspectiveCamera, sceneObjects: THREE.Object3D[], vector: THREE.Vector3): boolean {
        const raycaster: THREE.Raycaster = new THREE.Raycaster();
        raycaster.set(camera.position, vector);
        const intersectedObj: THREE.Intersection[] = raycaster.intersectObjects(sceneObjects, true);
        const distance: number = CollisionDetectionService.verifyDistance(intersectedObj);
        if (distance > CollisionDetectionService.MIN_DISTANCE_TO_MOVE) {
            return false;
        }

        return true;
    }

    private static verifyDistance(intersectedObj: THREE.Intersection[]): number {
        return intersectedObj.length === 0 ? CollisionDetectionService.MAX_DISTANCE : intersectedObj[0].distance;

    }
}
