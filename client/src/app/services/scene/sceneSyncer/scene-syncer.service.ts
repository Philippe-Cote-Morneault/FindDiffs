import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class SceneSyncerService {
    private static controls1: THREE.OrbitControls;
    private static controls2: THREE.OrbitControls;

    private static controlsChanged(event: Event| undefined): void {
        if (event != null && event.target != null) {
            (((event.target as Object) as THREE.OrbitControls).object.uuid === SceneSyncerService.controls1.object.uuid) ?
                SceneSyncerService.changeControls(SceneSyncerService.controls1, SceneSyncerService.controls2) :
                SceneSyncerService.changeControls(SceneSyncerService.controls2, SceneSyncerService.controls1);
        }
    }

    private static changeControls(changedControls: THREE.OrbitControls, toChangeControls: THREE.OrbitControls): void {

        toChangeControls.removeEventListener("change", SceneSyncerService.controlsChanged);

        toChangeControls.object.position.copy(changedControls.object.position);
        toChangeControls.object.rotation.copy(changedControls.object.rotation);
        toChangeControls.target.copy(changedControls.target);
        toChangeControls.update();

        toChangeControls.addEventListener("change", SceneSyncerService.controlsChanged);

    }

    public syncScenes(camera1: THREE.Camera, canvas1: HTMLCanvasElement, camera2: THREE.Camera): void {

        let isPressed: boolean = false;
        let mouseX: number = 0;
        let mouseY: number = 0;
        camera1.rotation.order = "YXZ"

        canvas1.addEventListener("mousedown", () => {
            isPressed = true;
        });

        canvas1.addEventListener("mouseup", () => {
            isPressed = false;
        });

        canvas1.addEventListener("mousemove", (event) => {
            if (isPressed) {
                //mouseX -= ( event.movementX / canvas1.clientWidth) * 2 + 1;
                //mouseY -= ( event.clientY / canvas1.clientHeight ) * 2 + 1;

                //mouse.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1;
		        //mouse.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1;
                console.log(camera1.rotation);
               
                camera1.rotation.y -= event.movementX / 80;
                if (camera1.rotation.x - event.movementY/80 > -(Math.PI/2) && camera1.rotation.x -  event.movementY/80 < (Math.PI/2) ) {
                camera1.rotation.x -= event.movementY / 80;
                }
            }
        })
       


    }
}
