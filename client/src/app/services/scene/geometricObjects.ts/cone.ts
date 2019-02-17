import * as THREE from "three";

export class Cone {
    public createShape(color: THREE.MeshBasicMaterial, dimensions: number[]): THREE.Object3D {
        const coneShape: THREE.ConeGeometry = new THREE.ConeGeometry(...dimensions);

        return new THREE.Mesh(coneShape, color);
    }
}
