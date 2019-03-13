import * as THREE from "three";
import { ICommonPyramid } from "../../../../../../../common/model/scene/objects/geometricObjects/pyramid";
import { GeometricObjectFactory } from "./geometricObjectFactory";

export class PyramidFactory extends GeometricObjectFactory {
    // private static readonly RADIUS_TOP: number = 0;
    // private static readonly RADIAL_SEGMENTS: number = 3;
    // private static readonly HEIGHT_SEGMENTS: number = 1;
    public createShape(material: THREE.MeshPhongMaterial, geometricObject: ICommonPyramid): THREE.Object3D {
        const pyramidShape: THREE.TetrahedronBufferGeometry = new THREE.TetrahedronBufferGeometry(2, 0);

        return new THREE.Mesh(pyramidShape, material);
    }
}
