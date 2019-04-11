import { Injectable } from "@angular/core";
import * as THREE from "three";

@Injectable({
    providedIn: "root",
})
export class CollisionDetectionService {
    private static readonly MAX_DISTANCE: number = 255;
    private static readonly MIN_DISTANCE_TO_MOVE: number = 2;

    public static verifyCollisions(camera: THREE.PerspectiveCamera, scene: THREE.Scene, vector: THREE.Vector3): boolean {
        const raycaster: THREE.Raycaster = new THREE.Raycaster();
        raycaster.set(camera.position, vector);
        const intersectedObj: THREE.Intersection[] = raycaster.intersectObjects(scene.children, true);
        const distance: number = intersectedObj.length === 0 ? CollisionDetectionService.MAX_DISTANCE : intersectedObj[0].distance;
        console.log(distance);
        if (distance > CollisionDetectionService.MIN_DISTANCE_TO_MOVE) {
            return false;
        }

        return true;
    }
}
