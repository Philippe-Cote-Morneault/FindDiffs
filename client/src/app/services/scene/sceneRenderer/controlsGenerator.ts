import "src/js/three";
// tslint:disable-next-line:ordered-imports
import "node_modules/three/examples/js/controls/OrbitControls";
import * as THREE from "three";

export class ControlsGenerator {
    private static readonly W_CODE: number = 87;
    private static readonly A_CODE: number = 65;
    private static readonly S_CODE: number = 83;
    private static readonly D_CODE: number = 68;
    private static readonly DISTANCE_TO_MOVE: number = 1;

    public static generateGameControls(camera: THREE.PerspectiveCamera, canvas: HTMLElement): void {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            switch (event.keyCode) {
                case ControlsGenerator.W_CODE:
                    camera.translateZ(-ControlsGenerator.DISTANCE_TO_MOVE);
                    break;
                case ControlsGenerator.A_CODE:
                    camera.translateX(-ControlsGenerator.DISTANCE_TO_MOVE);
                    break;
                case ControlsGenerator.S_CODE:
                    camera.translateZ(ControlsGenerator.DISTANCE_TO_MOVE);
                    break;
                case ControlsGenerator.D_CODE:
                    camera.translateX(ControlsGenerator.DISTANCE_TO_MOVE);
                    break;
                default:
                    break;
            }
        });
    }
}
