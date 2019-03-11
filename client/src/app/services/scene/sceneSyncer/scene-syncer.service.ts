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

    private static changeControls(changedControls: THREE.OrbitControls, toChangeControls: THREE.OrbitControls,): void {

        toChangeControls.removeEventListener("change", SceneSyncerService.controlsChanged);

        toChangeControls.object.position.copy(changedControls.object.position);
        toChangeControls.object.rotation.copy(changedControls.object.rotation);
        toChangeControls.target.copy(changedControls.target);
        toChangeControls.update();

        toChangeControls.addEventListener("change", SceneSyncerService.controlsChanged);

    }

    public syncScenes(camera1: THREE.PerspectiveCamera, controls1: THREE.OrbitControls,
                      camera2: THREE.PerspectiveCamera, controls2: THREE.OrbitControls): void {

        SceneSyncerService.controls1 = controls1;
        SceneSyncerService.controls2 = controls2;

        controls1.addEventListener("change", SceneSyncerService.controlsChanged);

        controls2.addEventListener("change", SceneSyncerService.controlsChanged);
    }
}
