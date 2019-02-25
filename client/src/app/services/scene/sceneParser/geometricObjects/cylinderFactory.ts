import * as THREE from "three";
import { ICommonCylinder } from "../../../../../../../common/model/scene/objects/geometricObjects/cylinder";
import { GeometricObjectFactory } from "./geometricObjectFactory";

export class CylinderFactory extends GeometricObjectFactory {
    private static readonly RADIAL_SEGMENTS: number = 30;
    public createShape(material: THREE.MeshPhongMaterial, geometricObject: ICommonCylinder): THREE.Object3D {
        const cylinderShape: THREE.CylinderGeometry = new THREE.CylinderGeometry(geometricObject.radius,
                                                                                 geometricObject.radius,
                                                                                 geometricObject.height,
                                                                                 CylinderFactory.RADIAL_SEGMENTS);

        return new THREE.Mesh(cylinderShape, material);
    }
}
