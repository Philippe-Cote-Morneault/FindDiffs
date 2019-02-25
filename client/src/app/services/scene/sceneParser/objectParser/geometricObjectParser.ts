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

    public parse(object: ICommonGeometricObject): THREE.Object3D {
        switch (object.shapeType) {
            case GeometricShapeType.CONE:
                return new ConeFactory().parse(object);
            case GeometricShapeType.CUBE:
                return new CubeFactory().parse(object);
            case GeometricShapeType.CYLINDER:
                return new CylinderFactory().parse(object);
            case GeometricShapeType.SPHERE:
                return new SphereFactory().parse(object);
            case GeometricShapeType.TRIANGULAR_BASE_PYRAMID:
                return new PyramidFactory().parse(object);
            default:
                throw new NotFoundException("This shape does not exist");
        }
    }
}
