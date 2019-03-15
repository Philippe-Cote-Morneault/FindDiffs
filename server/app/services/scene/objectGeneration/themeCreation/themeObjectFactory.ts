import { ObjectFactory } from "../objectFactory";
import { ICommonThematicObject } from "../../../../../../common/model/scene/objects/thematicObjects/thematicObject";
import { ObjectType } from "../../../../../../common/model/scene/scene";
import { ObjectProperties } from "../../../../../../common/model/scene/objects/thematicObjects/objectProperties";
import { RandomUtils } from "../../../../utils/randomUtils";

export abstract class ThemeObjectFactory extends ObjectFactory{
    
    protected abstract getObjectName(): string;

    protected getFactoryType(): ObjectType{
        return ObjectType.Thematic;
    }
    
    protected postCreate(): void{
        const thematicObject = this.object as ICommonThematicObject;

        this.object = thematicObject;
    }
}