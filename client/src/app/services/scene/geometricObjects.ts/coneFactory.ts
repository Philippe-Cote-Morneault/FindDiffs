import * as THREE from "three";
import { ICommonCone } from "../../../../../../common/model/scene/objects/geometricObjects/cone";
import { GeometricObjectFactory } from "./geometricObjectFactory";

export class ConeFactory extends GeometricObjectFactory {
    private static readonly RADIAL_SEGMENTS: number = 8;
    public createShape(color: THREE.MeshBasicMaterial, geometricObject: ICommonCone): THREE.Object3D {
        const coneShape: THREE.ConeGeometry = new THREE.ConeGeometry(geometricObject.radius,
                                                                     geometricObject.height,
                                                                     ConeFactory.RADIAL_SEGMENTS);

        return new THREE.Mesh(coneShape, color);
    }
}