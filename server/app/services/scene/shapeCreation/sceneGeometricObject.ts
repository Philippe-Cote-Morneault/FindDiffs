import { v4 as uuid } from "uuid";
import { ICommon3DPosition } from "../../../../../common/model/positions";
import { ICommonGeometricObject } from "../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ICommonEulerAngles } from "../../../../../common/model/scene/eulerAngles";

export abstract class SceneGeometricObject {
    private static readonly SIZE_MAX_PERCENTAGE: number = 150;
    private static readonly SIZE_MIN_PERCENTAGE: number = 50;
    // tslint:disable-next-line:no-magic-numbers
    private static readonly MAX_RADIAN_ANGLE: number = Math.PI * 2;
    private static readonly MIN_RADIAN_ANGLE: number = 0;


    public createObject(position: ICommon3DPosition): ICommonGeometricObject {
        const geometricObject: ICommonGeometricObject = {
            id: uuid(),

        }

        return this.createShape()
    }

    protected abstract createShape(): ICommonGeometricObject;

    protected generateRandomPercentage(): number {
        return Math.random() * (SceneGeometricObject.SIZE_MAX_PERCENTAGE - SceneGeometricObject.SIZE_MIN_PERCENTAGE) +
            SceneGeometricObject.SIZE_MIN_PERCENTAGE;
    }

    private generateRandomOrientation(): ICommonEulerAngles {
        return {
            xAngle: ,
            yAngle: ,
            zAngle: ,
        } as ICommonEulerAngles;
    }
}
