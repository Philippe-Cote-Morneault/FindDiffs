import * as THREE from "three";
import { GeometricObject } from "./geometricObject";

export class Sphere extends GeometricObject {
    public createShape(color: THREE.MeshBasicMaterial, dimensions: number[]): THREE.Object3D {
        const sphereShape: THREE.SphereGeometry = new THREE.SphereGeometry(...dimensions);

        return new THREE.Mesh(sphereShape, color);
    }
}
