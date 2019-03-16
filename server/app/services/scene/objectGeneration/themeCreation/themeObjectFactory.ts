import { ObjectProperties } from "../../../../../../common/model/scene/objects/thematicObjects/objectProperties";
import { ICommonThematicObject, ObjTheme } from "../../../../../../common/model/scene/objects/thematicObjects/thematicObject";
import { ObjectType } from "../../../../../../common/model/scene/scene";
import { EnumUtils } from "../../../../utils/enumUtils";
import { RandomUtils } from "../../../../utils/randomUtils";
import { ObjectFactory } from "../objectFactory";

export abstract class ThemeObjectFactory extends ObjectFactory {

    protected abstract getObjectName(): string;

    protected getFactoryType(): ObjectType {
        return ObjectType.Thematic;
    }

    protected postCreate(): void {
        const thematicObject: ICommonThematicObject = this.object as ICommonThematicObject;
        if (this.isTextured()) {
            thematicObject.texture = this.chooseTexture();
        } else {
            thematicObject.color = this.chooseColor();
        }
        thematicObject.objectType = EnumUtils.enumFromString<ObjTheme>(
            this.getObjectName().toUpperCase(),
            ObjTheme) as ObjTheme;
        this.object = thematicObject;
    }

    private chooseTexture(): string {
        const objName: string = this.getObjectName().toLowerCase();
        const textures: string[] = ObjectProperties[objName].texture;
        const choice: number = RandomUtils.inRangeInt(0, textures.length - 1);

        return ObjectProperties[objName].texture[choice];
    }

    private isTextured(): boolean {
        const objName: string = this.getObjectName().toLowerCase();

        return ObjectProperties[objName].isTextured;
    }

    private chooseColor(): number {
        const objName: string = this.getObjectName().toLowerCase();
        const color: number[] = ObjectProperties[objName].color;
        const choice: number = RandomUtils.inRangeInt(0, color.length - 1);

        return ObjectProperties[objName].color[choice];
    }
}
