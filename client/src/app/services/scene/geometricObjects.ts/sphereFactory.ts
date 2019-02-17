import * as THREE from "three";
import { GeometricObjectFactory } from "./geometricObjectFactory";

export class SphereFactory extends GeometricObjectFactory {
    public createShape(color: THREE.MeshBasicMaterial, dimensions: number[]): THREE.Object3D {
        const sphereShape: THREE.SphereGeometry = new THREE.SphereGeometry(...dimensions);

        return new THREE.Mesh(sphereShape, color);
    }
}
