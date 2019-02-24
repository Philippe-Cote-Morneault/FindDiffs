import { Injectable } from "@angular/core";
import * as THREE from "three";

@Injectable({
    providedIn: "root",
})
export class SceneRendererService {

    public generateRenderer(containerWidth: number, containerHeight: number): THREE.WebGLRenderer {
        const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
        renderer.setSize(containerWidth, containerHeight);

        return renderer;
    }

    public renderScene(scene: THREE.Scene, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera): void {
        renderer.render(scene, camera);
    }
}
