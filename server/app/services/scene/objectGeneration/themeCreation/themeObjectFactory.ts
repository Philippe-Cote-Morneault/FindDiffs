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
    private chooseTexture(): string {
        const objName = this.getObjectName().toLowerCase();
        const textures: string[] = ObjectProperties[objName].texture;
        const choice = RandomUtils.inRange(0, textures.length);

        return ObjectProperties[objName].texture[choice];
    }
    private chooseColor(): number {
        const objName = this.getObjectName().toLowerCase();
        const color: number[] = ObjectProperties[objName].color;
        const choice = RandomUtils.inRange(0, color.length);

        return ObjectProperties[objName].color[choice];
    }
}