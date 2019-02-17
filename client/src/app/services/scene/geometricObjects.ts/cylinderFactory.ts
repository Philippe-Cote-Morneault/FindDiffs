import * as THREE from "three";
import { GeometricObjectFactory } from "./geometricObjectFactory";

export class CylinderFactory extends GeometricObjectFactory {
    public createShape(color: THREE.MeshBasicMaterial, dimensions: number[]): THREE.Object3D {
        const cylinderShape: THREE.CylinderGeometry = new THREE.CylinderGeometry(...dimensions);

        return new THREE.Mesh(cylinderShape, color);
    }
}
