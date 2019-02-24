import "src/js/three";
// tslint:disable-next-line:ordered-imports
import "node_modules/three/examples/js/controls/OrbitControls";
import * as THREE from "three";

export class ControlsGenerator {
    private static readonly TARGET_Y_POSITION: number = 10;
    public static generateGameCardControls(camera: THREE.PerspectiveCamera, canvas: HTMLCanvasElement): THREE.OrbitControls {
        const controls: THREE.OrbitControls = new THREE.OrbitControls(camera, canvas);
        controls.enableKeys = false;
        controls.autoRotate = true;
        controls.target.set(0, ControlsGenerator.TARGET_Y_POSITION, 0);

        return controls;
    }

    public static generateGameControls(camera: THREE.PerspectiveCamera, canvas: HTMLElement): THREE.OrbitControls {
        const controls: THREE.OrbitControls = new THREE.OrbitControls(camera, canvas);
        controls.enableKeys = true;
        controls.target.set(0, ControlsGenerator.TARGET_Y_POSITION, 0);

        return controls;
    }
}
