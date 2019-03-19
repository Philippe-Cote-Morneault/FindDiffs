import { ICommonEulerAngles } from "../../../../../../common/model/scene/eulerAngles";
import { RandomUtils } from "../../../../utils/randomUtils";
import { ObjectFactory } from "../objectFactory";
import { ThemeObjectFactory } from "./themeObjectFactory";

export class CarFactory extends ThemeObjectFactory {
    private readonly SCALE_MULTIPLIER: number = 0.75;
    private name: string;

    public constructor(name: string) {
        super();
        this.name = name;
    }

    protected getScaleMultiplier(): number {
        return this.SCALE_MULTIPLIER;
    }

    protected getObjectName(): string {
        return this.name;
    }

    protected generateRandomOrientation(): ICommonEulerAngles {
        const orientation: ICommonEulerAngles = {
            xAngle: 0,
            yAngle: 0,
            zAngle: 0,
        };
        if (RandomUtils.inRangeInt(0, 1) === 1) {
            // tslint:disable-next-line:no-magic-numbers
            orientation.yAngle = ObjectFactory.MAX_RADIAN_ANGLE / 2;
        }

        return orientation;
    }
}
