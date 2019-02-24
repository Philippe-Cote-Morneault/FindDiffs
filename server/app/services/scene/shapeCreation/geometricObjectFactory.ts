import { v4 as uuid } from "uuid";
import { ICommon3DPosition } from "../../../../../common/model/positions";
import { ICommonEulerAngles } from "../../../../../common/model/scene/eulerAngles";
import { ICommonGeometricObject } from "../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ObjectType } from "../../../../../common/model/scene/scene";
import { ColorUtils } from "../../../utils/colorUtils";
import { RandomUtils } from "../../../utils/randomUtils";

export abstract class GeometricObjectFactory {
    private static readonly SIZE_MAX_PERCENTAGE: number = 150;
    private static readonly SIZE_MIN_PERCENTAGE: number = 50;
    // tslint:disable-next-line:no-magic-numbers
    private static readonly MAX_RADIAN_ANGLE: number = Math.PI * 2;
    private static readonly MIN_RADIAN_ANGLE: number = 0;
    private static readonly PERCENTAGE_DIVISION: number = 100;

    public createObject(position: ICommon3DPosition): ICommonGeometricObject {
        const geometricObject: ICommonGeometricObject = {
            id: uuid().replace(/-/g, ""),
            orientation: this.generateRandomOrientation(),
            position: position,
            type: ObjectType.Geometric,
            color: ColorUtils.generateRandomColor(),
        };

        return this.createShape(geometricObject);
    }

    protected abstract createShape(geometricObject: ICommonGeometricObject): ICommonGeometricObject;

    protected generateRandomPercentage(): number {
        return RandomUtils.generateInRange(
            GeometricObjectFactory.SIZE_MIN_PERCENTAGE,
            GeometricObjectFactory.SIZE_MAX_PERCENTAGE,
        ) / GeometricObjectFactory.PERCENTAGE_DIVISION;
    }

    private generateRandomOrientation(): ICommonEulerAngles {
        return {
            xAngle: this.generateRandomRadianAngle(),
            yAngle: this.generateRandomRadianAngle(),
            zAngle: this.generateRandomRadianAngle(),
        } as ICommonEulerAngles;
    }

    private generateRandomRadianAngle(): number {
        return RandomUtils.generateInRange(GeometricObjectFactory.MIN_RADIAN_ANGLE, GeometricObjectFactory.MAX_RADIAN_ANGLE);
    }
}
