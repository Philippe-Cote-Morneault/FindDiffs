import * as THREE from "three";

export class ControlsGenerator {
    public static isLocked: boolean = true;
    private static readonly DISTANCE_TO_MOVE: number = 1;

    public static generateGameControls(camera: THREE.PerspectiveCamera, canvas: HTMLElement): void {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            if (!ControlsGenerator.isLocked) {
                switch (event.key) {
                    case "w":
                        camera.translateZ(-ControlsGenerator.DISTANCE_TO_MOVE);
                        break;
                    case "a":
                        camera.translateX(-ControlsGenerator.DISTANCE_TO_MOVE);
                        break;
                    case "s":
                        camera.translateZ(ControlsGenerator.DISTANCE_TO_MOVE);
                        break;
                    case "d":
                        camera.translateX(ControlsGenerator.DISTANCE_TO_MOVE);
                        break;
                    default:
                        break;
                }
            }
        });
    }
}
