import { ICommonCone } from "../../../../../common/model/scene/objects/geometricObjects/cone";
import { GeometricShapeType, ICommonGeometricObject } from "../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { GeometricObjectFactory } from "./geometricObjectFactory";

export class ConeFactory extends GeometricObjectFactory {
    private static readonly REFERENCE_RADIUS: number = 2;
    private static readonly REFERENCE_HEIGHT: number = 3;

    protected createShape(geometricObject: ICommonGeometricObject): ICommonCone {
        const coneObject: ICommonCone = geometricObject as ICommonCone;

        coneObject.shapeType = GeometricShapeType.CONE;
        coneObject.radius = ConeFactory.REFERENCE_RADIUS;
        coneObject.height = ConeFactory.REFERENCE_HEIGHT;

        return coneObject;
    }
}
