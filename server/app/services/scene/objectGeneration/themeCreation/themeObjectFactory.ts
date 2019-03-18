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
        thematicObject.isTextured = this.isTextured();
        if (thematicObject.isTextured) {
            thematicObject.texture = this.chooseTexture();
        } else {
            thematicObject.color = this.chooseColor();
        }
        thematicObject.scale = this.generateRandomPercentage();
        thematicObject.objectType = EnumUtils.enumFromString<ObjTheme>(
            this.getObjectName().toUpperCase(),
            ObjTheme) as ObjTheme;
        this.object = thematicObject;
    }

    private chooseTexture(): string {
        const objName: string = this.getObjectName().toLowerCase();
        const textures: string[] = ObjectProperties[objName].texture as string[];
        const choice: number = RandomUtils.inRangeInt(0, textures.length - 1);

        return textures[choice];
    }

    private isTextured(): boolean {
        const objName: string = this.getObjectName().toLowerCase();

        return ObjectProperties[objName].isTextured;
    }

    private chooseColor(): number {
        const objName: string = this.getObjectName().toLowerCase();
        const color: number[] = ObjectProperties[objName].color as number[];
        const choice: number = RandomUtils.inRangeInt(0, color.length - 1);

        return color[choice];
    }
}
