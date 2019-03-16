import { SceneTransformation } from "../../../../../../common/model/scene/modifications/sceneTransformation";
import { ICommonThematicModifications } from "../../../../../../common/model/scene/modifications/thematicModifications";
import { ICommonThematicObject } from "../../../../../../common/model/scene/objects/thematicObjects/thematicObject";
import { ObjectType } from "../../../../../../common/model/scene/scene";

export class SceneObjectTextureChanger implements SceneTransformation {
    public applyTransformation(objectsToTransform: ICommonThematicObject[],
                               modifications: ICommonThematicModifications,
                               type: ObjectType): void {

    private chooseTexture(modifiedObject: ICommonThematicObject): string {
        const objName: string = ObjTheme[modifiedObject.objectType].toLowerCase();
        const availableTextures: string[] = (ObjectProperties[objName].texture as string[]).filter(
            (x: string) => x !== modifiedObject.texture,
        );

        const choice: number = RandomUtils.inRangeInt(0, availableTextures.length - 1);

        return availableTextures[choice];
    }

    private chooseColor(modifiedObject: ICommonThematicObject): string {
        const objName: string = ObjTheme[modifiedObject.objectType].toLowerCase();
        const availableColors: number[] = (ObjectProperties[objName].color as number[]).filter(
            (x: number) => x !== modifiedObject.color,
        );

        const choice: number = RandomUtils.inRangeInt(0, availableColors.length - 1);

        return String(availableColors[choice]);
    }
}
