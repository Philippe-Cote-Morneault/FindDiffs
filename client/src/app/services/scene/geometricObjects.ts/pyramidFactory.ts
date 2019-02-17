import * as THREE from "three";
import { GeometricObjectFactory } from "./geometricObjectFactory";

export class PyramidFactory extends GeometricObjectFactory {
    public createShape(color: THREE.MeshBasicMaterial, dimensions: number[]): THREE.Object3D {
        const pyramidShape: THREE.CylinderGeometry = new THREE.CylinderGeometry(...dimensions);

        return new THREE.Mesh(pyramidShape, color);
    }
}
