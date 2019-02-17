import * as THREE from "three";
import { GeometricObject } from "./geometricObject";

export class Cylinder extends GeometricObject {
    public createShape(color: THREE.MeshBasicMaterial, dimensions: number[]): THREE.Object3D {
        const cylinderShape: THREE.CylinderGeometry = new THREE.CylinderGeometry(...dimensions);

        return new THREE.Mesh(cylinderShape, color);
    }
}
