import * as THREE from "three";
import { NotFoundException } from "../../../../../../../common/errors/notFoundException";
import {
    GeometricShapeType,
    ICommonGeometricObject,
    } from "../../../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ConeFactory } from "../geometricObjects/coneFactory";
import { CubeFactory } from "../geometricObjects/cubeFactory";
import { CylinderFactory } from "../geometricObjects/cylinderFactory";
import { PyramidFactory } from "../geometricObjects/pyramidFactory";
import { SphereFactory } from "../geometricObjects/sphereFactory";
import { SceneObjectParser } from "../sceneObjectParser";

export class GeometricObjectParser extends SceneObjectParser {

    public async parse(object: ICommonGeometricObject): Promise<THREE.Object3D> {
        switch (object.shapeType) {
            case GeometricShapeType.CONE:
                const cone: THREE.Object3D = new ConeFactory().parse(object);
                cone.uuid = object.id;

                return cone;
            case GeometricShapeType.CUBE:
                const cube: THREE.Object3D = new CubeFactory().parse(object);
                cube.uuid = object.id;

                return cube;
            case GeometricShapeType.CYLINDER:
                const cylinder: THREE.Object3D = new CylinderFactory().parse(object);
                cylinder.uuid = object.id;

                return cylinder;
            case GeometricShapeType.SPHERE:
                const sphere: THREE.Object3D = new SphereFactory().parse(object);
                sphere.uuid = object.id;

                return sphere;
            case GeometricShapeType.TRIANGULAR_BASE_PYRAMID:
                const pyramid: THREE.Object3D = new PyramidFactory().parse(object);
                pyramid.uuid = object.id;

                return pyramid;
            default:
                throw new NotFoundException("This shape does not exist");
        }
    }

    public async loadMaterial(objectToModify: THREE.Object3D, object: ICommonGeometricObject,
                              forceUpdate: boolean = false): Promise<void> {
        objectToModify.traverse((child: THREE.Mesh) => {
            if (child instanceof THREE.Mesh) {
                if (child.material instanceof THREE.MeshStandardMaterial ||
                    child.material instanceof THREE.MeshPhongMaterial) {

                    if (forceUpdate) {
                        child.material = child.material.clone();
                    }

                    (child.material as THREE.MeshStandardMaterial|THREE.MeshPhongMaterial).color = new THREE.Color(object.color);
                    child.material.needsUpdate = true;
                }
            }
        });
    }
}
