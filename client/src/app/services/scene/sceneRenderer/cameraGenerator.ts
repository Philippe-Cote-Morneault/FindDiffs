import * as THREE from "three";

export class CameraGenerator {
    private static readonly FOV: number = 90;
    private static readonly NEAR_CLIP: number = 0.1;
    private static readonly FAR_CLIP: number = 1000;

    public static createCamera(containerWidth: number, containerHeight: number): THREE.PerspectiveCamera {
        const camera: THREE.PerspectiveCamera =  new THREE.PerspectiveCamera(
            CameraGenerator.FOV,
            containerWidth / containerHeight,
            CameraGenerator.NEAR_CLIP,
            CameraGenerator.FAR_CLIP,
        );

        camera.position.z = 50;

        return camera;
    }
}
