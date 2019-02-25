import { GeometricShapeType, ICommonGeometricObject } from "../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ICommonSphere } from "../../../../../common/model/scene/objects/geometricObjects/sphere";
import { GeometricObjectFactory } from "./geometricObjectFactory";

export class SphereFactory extends GeometricObjectFactory {
    private static readonly REFERENCE_RADIUS: number = 3;

    protected createShape(geometricObject: ICommonGeometricObject): ICommonSphere {
        const sphereObject: ICommonSphere = geometricObject as ICommonSphere;

        sphereObject.shapeType = GeometricShapeType.SPHERE;
        sphereObject.radius = this.generateRandomPercentage() * SphereFactory.REFERENCE_RADIUS;

        return sphereObject;
    }
}
