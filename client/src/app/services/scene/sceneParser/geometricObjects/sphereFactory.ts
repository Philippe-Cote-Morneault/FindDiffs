import * as THREE from "three";
import { ICommonSphere } from "../../../../../../../common/model/scene/objects/geometricObjects/sphere";
import { GeometricObjectFactory } from "./geometricObjectFactory";

export class SphereFactory extends GeometricObjectFactory {
    private static readonly HEIGHT_SEGMENTS: number = 30;
    private static readonly WIDTH_SEGMENTS: number = 30;
    public createShape(material: THREE.MeshPhongMaterial, geometricObject: ICommonSphere): THREE.Object3D {
        const sphereShape: THREE.SphereGeometry = new THREE.SphereGeometry(geometricObject.radius,
                                                                           SphereFactory.WIDTH_SEGMENTS,
                                                                           SphereFactory.HEIGHT_SEGMENTS);

        return new THREE.Mesh(sphereShape, material);
    }
}
