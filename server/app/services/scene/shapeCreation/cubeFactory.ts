import { ICommonCube } from "../../../../../common/model/scene/objects/geometricObjects/cube";
import { GeometricShapeType, ICommonGeometricObject } from "../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { GeometricObjectFactory } from "./geometricObjectFactory";

export class CubeFactory extends GeometricObjectFactory {
    private static readonly REFERENCE_WIDTH: number = 3;

    protected createShape(geometricObject: ICommonGeometricObject): ICommonGeometricObject {
        const cubeObject: ICommonCube = geometricObject as ICommonCube;

        cubeObject.shapeType = GeometricShapeType.CUBE;
        cubeObject.width = this.generateRandomPercentage() * CubeFactory.REFERENCE_WIDTH;

        return cubeObject;
    }
}
