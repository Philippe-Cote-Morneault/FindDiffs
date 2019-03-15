import { ICommonEulerAngles } from "../../../../../../common/model/scene/eulerAngles";
import { ICommonGeometricObject } from "../../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ObjectType } from "../../../../../../common/model/scene/scene";
import { ColorUtils } from "../../../../utils/colorUtils";
import { ObjectFactory } from "../objectFactory";

export abstract class GeometricObjectFactory extends ObjectFactory {

    protected abstract createShape(geometricObject: ICommonGeometricObject): ICommonGeometricObject;

    protected postCreate(){
        const objectGeometric = this.object as ICommonGeometricObject;
        objectGeometric.color = ColorUtils.generateRandomColor();
        this.object = this.createShape(objectGeometric);
    }
    
    protected generateRandomOrientation(): ICommonEulerAngles {
        return {
            xAngle: this.generateRandomRadianAngle(),
            yAngle: this.generateRandomRadianAngle(),
            zAngle: this.generateRandomRadianAngle(),
        } as ICommonEulerAngles;
    }

    protected getFactoryType(): ObjectType{
        return ObjectType.Geometric
    }
}
