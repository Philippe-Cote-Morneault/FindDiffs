import * as THREE from "three";
import { GeometricObjectFactory } from "./geometricObjectFactory";

export class ConeFactory extends GeometricObjectFactory {
    public createShape(color: THREE.MeshBasicMaterial, dimensions: number[]): THREE.Object3D {
        const coneShape: THREE.ConeGeometry = new THREE.ConeGeometry(...dimensions);

        return new THREE.Mesh(coneShape, color);
    }
}
