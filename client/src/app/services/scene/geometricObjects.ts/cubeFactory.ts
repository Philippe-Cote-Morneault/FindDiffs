import * as THREE from "three";
import { ICommonCube } from "../../../../../../common/model/scene/objects/geometricObjects/cube";
import { GeometricObjectFactory } from "./geometricObjectFactory";

export class CubeFactory extends GeometricObjectFactory {
    public createShape(color: THREE.MeshStandardMaterial, geometricObject: ICommonCube): THREE.Object3D {
        const cubeShape: THREE.BoxGeometry = new THREE.BoxGeometry(geometricObject.width,
                                                                   geometricObject.width,
                                                                   geometricObject.width);

        return new THREE.Mesh(cubeShape, color);
    }
}
