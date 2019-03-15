import { ICommonSceneObject } from "../../../../../common/model/scene/objects/sceneObject";
import { ICommon3DPosition } from "../../../../../common/model/positions";
import uuid = require("uuid");
import { ObjectType } from "../../../../../common/model/scene/scene";
import { ICommonEulerAngles } from "../../../../../common/model/scene/eulerAngles";
import { RandomUtils } from "../../../utils/randomUtils";

export abstract class ObjectFactory{
    protected static readonly SIZE_MAX_PERCENTAGE: number = 150;
    protected static readonly SIZE_MIN_PERCENTAGE: number = 50;
    
    // tslint:disable-next-line:no-magic-numbers
    protected static readonly MAX_RADIAN_ANGLE: number = Math.PI * 2;
    protected static readonly MIN_RADIAN_ANGLE: number = 0;
    protected static readonly PERCENTAGE_DIVISION: number = 100;

    protected object: ICommonSceneObject;
    

    public createObject(position: ICommon3DPosition): ICommonSceneObject{
        this.object = {
            id: uuid().replace(/-/g, ""),
            orientation: this.generateRandomOrientation(),
            position: position,
            type: this.getFactoryType(),
        };
        this.postCreate();

        return this.object;
    }

    protected generateRandomPercentage(): number {
        return RandomUtils.inRange(
            ObjectFactory.SIZE_MIN_PERCENTAGE,
            ObjectFactory.SIZE_MAX_PERCENTAGE,
        ) / ObjectFactory.PERCENTAGE_DIVISION;
    }

    protected generateRandomRadianAngle(): number {
        return RandomUtils.inRange(ObjectFactory.MIN_RADIAN_ANGLE, ObjectFactory.MAX_RADIAN_ANGLE);
    }

    protected abstract getFactoryType(): ObjectType;
    protected abstract generateRandomOrientation(): ICommonEulerAngles;
    protected abstract postCreate(): void;
}