import * as THREE from "three";
import { GeometricObject } from "./geometricObject";

export class Pyramid extends GeometricObject {
    public createShape(color: THREE.MeshBasicMaterial, dimensions: number[]): THREE.Object3D {
        const pyramidShape: THREE.CylinderGeometry = new THREE.CylinderGeometry(...dimensions);

        return new THREE.Mesh(pyramidShape, color);
    }
}