import { ICommonEulerAngles } from "../../../../../../common/model/scene/eulerAngles";
import { ThemeObjectFactory } from "./themeObjectFactory";

export class SimpleObjectFactory extends ThemeObjectFactory {
    private name: string;

    public constructor(name: string) {
        super();
        this.name = name;
    }

    protected getObjectName(): string {
        return this.name;
    }

    protected generateRandomOrientation(): ICommonEulerAngles {
        return {
            xAngle: 0,
            yAngle: this.generateRandomRadianAngle(),
            zAngle: 0,
        };
    }
}
