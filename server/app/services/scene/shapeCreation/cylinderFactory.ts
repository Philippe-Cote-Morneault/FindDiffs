import { ICommonCylinder } from "../../../../../common/model/scene/objects/geometricObjects/cylinder";
import { GeometricShapeType, ICommonGeometricObject } from "../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { GeometricObjectFactory } from "./geometricObjectFactory";

export class CylinderFactory extends GeometricObjectFactory {
    private static readonly REFERENCE_RADIUS: number = 2;
    private static readonly REFERENCE_HEIGHT: number = 3;

    protected createShape(geometricObjet: ICommonGeometricObject): ICommonCylinder {
        const scalePercentage: number = this.generateRandomPercentage();

        const cylinderShape: ICommonCylinder = geometricObjet as ICommonCylinder;

        cylinderShape.shapeType = GeometricShapeType.CYLINDER;
        cylinderShape.radius = scalePercentage * CylinderFactory.REFERENCE_RADIUS;
        cylinderShape.height = scalePercentage * CylinderFactory.REFERENCE_HEIGHT;

        return cylinderShape;
    }
}
