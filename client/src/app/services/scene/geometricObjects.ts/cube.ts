import * as THREE from "three";
import { GeometricObject } from "./geometricObject";

export class Cube extends GeometricObject {
    public createShape(color: THREE.MeshBasicMaterial, dimensions: number[]): THREE.Object3D {
        // TODO: See if I can use apply safely
        //const cubeShape: THREE.BoxGeometry = new THREE.BoxGeometry(dimensions[0], dimensions[1], dimensions[2]);
        const cubeShape: THREE.BoxGeometry = new THREE.BoxGeometry(...dimensions);

        return new THREE.Mesh(cubeShape, color);
    }
}
