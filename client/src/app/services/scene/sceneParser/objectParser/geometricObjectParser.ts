import { NotFoundException } from "../../../../../../../common/errors/notFoundException";
import {
    GeometricShapeType,
    ICommonGeometricObject,
    } from "../../../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ConeFactory } from "../../geometricObjects.ts/coneFactory";
import { CubeFactory } from "../../geometricObjects.ts/cubeFactory";
import { CylinderFactory } from "../../geometricObjects.ts/cylinderFactory";
import { PyramidFactory } from "../../geometricObjects.ts/pyramidFactory";
import { SphereFactory } from "../../geometricObjects.ts/sphereFactory";
import { SceneObjectParser } from "../sceneObjectParser";

export class GeometricObjectParser extends SceneObjectParser {

    public parse(object: ICommonGeometricObject): THREE.Object3D {
        switch (object.shapeType) {
            case GeometricShapeType.CONE:
                return new ConeFactory().parse(object);
                break;
            case GeometricShapeType.CUBE:
                return new CubeFactory().parse(object);
                break;
            case GeometricShapeType.CYLINDER:
                return new CylinderFactory().parse(object);
                break;
            case GeometricShapeType.SPHERE:
                return new SphereFactory().parse(object);
                break;
            case GeometricShapeType.SQUARED_BASE_PYRAMID:
                return new PyramidFactory().parse(object);
                break;
            default:
                throw new NotFoundException("This shape does not exist");
        }
    }
}
