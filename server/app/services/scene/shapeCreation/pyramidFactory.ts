import { GeometricShapeType, ICommonGeometricObject } from "../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ICommonPyramid } from "../../../../../common/model/scene/objects/geometricObjects/pyramid";
import { GeometricObjectFactory } from "./geometricObjectFactory";

export class PyramidFactory extends GeometricObjectFactory {
    private static readonly REFERENCE_RADIUS: number = 2;
    private static readonly REFERENCE_HEIGHT: number = 3;
    protected createShape(geometricObject: ICommonGeometricObject): ICommonPyramid {
        const scalePercentage: number = this.generateRandomPercentage();

        const pyramidObject: ICommonPyramid = geometricObject as ICommonPyramid;

        pyramidObject.shapeType = GeometricShapeType.SQUARED_BASE_PYRAMID;
        pyramidObject.radiusBase = scalePercentage * PyramidFactory.REFERENCE_RADIUS;
        pyramidObject.height = scalePercentage * PyramidFactory.REFERENCE_HEIGHT;

        return pyramidObject;
    }
}
