import { GeometricObjectFactory } from "./geometricObjectFactory";
import { ICommonSphere } from "../../../../../common/model/scene/objects/geometricObjects/sphere";
import { ICommonGeometricObject, GeometricShapeType } from "../../../../../common/model/scene/objects/geometricObjects/geometricObject";

export class SphereFactory extends GeometricObjectFactory {
    private static readonly REFERENCE_RADIUS: number = 3;
    protected createShape(geometricObject: ICommonGeometricObject): ICommonSphere {
        const sphereObject: ICommonSphere = geometricObject as ICommonSphere;
        sphereObject.shapeType = GeometricShapeType.SPHERE;
        sphereObject.radius = SphereFactory.REFERENCE_RADIUS;

        return sphereObject;
    }
}