import { ICommonScene } from "../../../../common/model/scene/scene";
import { ICommonSceneModifications } from "../../../../common/model/scene/sceneModifications";
import { ICommonSceneObject } from "../../../../common/model/scene/sceneObject";
import { SceneTransformation } from "./sceneTransformation";

/**
 * In charge of changing the color of a random scene object to a random color
 */
export class SceneObjectColorChanger implements SceneTransformation {
    private static readonly numberOfHexColors: number = 16777215;

    public applyTransformation(modifedScene: ICommonScene, transformationEligibleObjects: ICommonSceneObject[],
                               modifications: ICommonSceneModifications): void {

        const indexOfObject: number = Math.floor(Math.random() * transformationEligibleObjects.length);
        const modifiedObject: ICommonSceneObject = transformationEligibleObjects[indexOfObject];

        modifications.colorChangedObjects.set(modifiedObject.id, this.generateRandomColor());
        transformationEligibleObjects.splice(indexOfObject, 1);
    }

    private generateRandomColor(): number {
        return Math.floor(Math.random() * SceneObjectColorChanger.numberOfHexColors);
    }
}
