import * as THREE from "three";

export class RendererGenerator {
    public static generateRenderer(containerWidth: number, containerHeight: number): THREE.WebGLRenderer {
        const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
        renderer.setSize(containerWidth, containerHeight);

        return renderer;
    }
}
