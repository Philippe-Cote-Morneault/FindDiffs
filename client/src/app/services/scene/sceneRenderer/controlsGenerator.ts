import "src/js/three";
// tslint:disable-next-line:ordered-imports
import "node_modules/three/examples/js/controls/OrbitControls";
import * as THREE from "three";

export class ControlsGenerator {
    public static generateGameCardControls(camera: THREE.PerspectiveCamera, canvas: HTMLCanvasElement): THREE.OrbitControls {
        const controls: THREE.OrbitControls = new THREE.OrbitControls(camera, canvas);
        controls.enableKeys = false;
        controls.autoRotate = true;
        controls.target.set(0, 10, 0);

        return controls;
    }

    public static generateGameControls(camera: THREE.PerspectiveCamera, canvas: HTMLElement): THREE.OrbitControls {
        const controls: THREE.OrbitControls = new THREE.OrbitControls(camera, canvas);
        controls.enableKeys = true;
        controls.target.set(0, 10, 0);

        return controls;
    }
}