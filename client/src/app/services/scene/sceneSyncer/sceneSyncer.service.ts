import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class SceneSyncerService {
    private static readonly ROTATION_ORDER: string = "YXZ";
    private static readonly RIGHT_MOUSE_CODE: number = 2;
    private static readonly MOVEMENT_SCALE: number = 100;
    // tslint:disable-next-line:no-magic-numbers
    private static readonly CAMERA_MAX_X_ANGLE: number = Math.PI / 2;
    private isMousePressed: boolean;

    public constructor() {
        this.isMousePressed = false;
    }

    public syncScenesMovement(camera1: THREE.Camera, canvas1: HTMLCanvasElement, camera2: THREE.Camera, canvas2: HTMLCanvasElement): void {
        this.addListeners(camera1, canvas1, camera2, canvas2);
        this.addListeners(camera2, canvas2, camera1, canvas1);
    }

    private addListeners(changedCamera: THREE.Camera, changedCanvas: HTMLCanvasElement,
                         toChangeCamera: THREE.Camera, toChangeCanvas: HTMLCanvasElement): void {

        changedCamera.rotation.order = SceneSyncerService.ROTATION_ORDER;

        changedCanvas.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });

        changedCanvas.addEventListener("mousedown", (event: MouseEvent) => {
            if (event.button === SceneSyncerService.RIGHT_MOUSE_CODE) {
                this.isMousePressed = true;
            }
        });

        changedCanvas.addEventListener("mouseup", (event: MouseEvent) => {
            if (event.button === SceneSyncerService.RIGHT_MOUSE_CODE) {
                this.isMousePressed = false;
            }
        });

        changedCanvas.addEventListener("mousemove", (event: MouseEvent) => {
            if (this.isMousePressed) {
               this.moveCamera(changedCamera, event);
               this.moveCamera(toChangeCamera, event);
            }
        });
    }

    private moveCamera(camera: THREE.Camera, mouseEvent: MouseEvent): void {
        camera.rotation.y -= mouseEvent.movementX / SceneSyncerService.MOVEMENT_SCALE;

        if (camera.rotation.x - mouseEvent.movementY / SceneSyncerService.MOVEMENT_SCALE > -SceneSyncerService.CAMERA_MAX_X_ANGLE
            && camera.rotation.x - mouseEvent.movementY / SceneSyncerService.MOVEMENT_SCALE < SceneSyncerService.CAMERA_MAX_X_ANGLE) {

            camera.rotation.x -= mouseEvent.movementY / SceneSyncerService.MOVEMENT_SCALE;
        }
    }
}
