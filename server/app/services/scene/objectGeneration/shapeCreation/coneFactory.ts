import { ICommonCone } from "../../../../../../common/model/scene/objects/geometricObjects/cone";
import { GeometricShapeType, ICommonGeometricObject } from "../../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { GeometricObjectFactory } from "./geometricObjectFactory";

export class ConeFactory extends GeometricObjectFactory {
    public static readonly REFERENCE_RADIUS: number = 2;
    public static readonly REFERENCE_HEIGHT: number = 3;

    protected createShape(geometricObject: ICommonGeometricObject): ICommonCone {
        const scalePercentage: number = this.generateRandomPercentage();

        const coneObject: ICommonCone = geometricObject as ICommonCone;

        coneObject.shapeType = GeometricShapeType.CONE;
        coneObject.radius = scalePercentage * ConeFactory.REFERENCE_RADIUS;
        coneObject.height = scalePercentage * ConeFactory.REFERENCE_HEIGHT;

        return coneObject;
    }
}
