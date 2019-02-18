import { Injectable } from "@angular/core";
import * as THREE from "three";

@Injectable({
    providedIn: "root",
})
export class SceneRendererService {
    public renderScene(scene: THREE.Scene, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera): void {
        renderer.render(scene, camera);
    }
}
