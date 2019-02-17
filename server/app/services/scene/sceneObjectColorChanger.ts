import { ICommonGeometricModifications } from "../../../../common/model/scene/modifications/geometricModifications";
import { ICommonGeometricShape } from "../../../../common/model/scene/objects/geometricShape";
import { ICommonScene } from "../../../../common/model/scene/scene";
import { SceneTransformation } from "./sceneTransformation";

/**
 * In charge of changing the color of a random scene object to a random color
 */
export class SceneObjectColorChanger implements SceneTransformation {
    private static readonly numberOfHexColors: number = 16777215;

    public applyTransformation(modifedScene: ICommonScene, transformationEligibleObjects: ICommonGeometricShape[],
                               modifications: ICommonGeometricModifications): void {

        const indexOfObject: number = Math.floor(Math.random() * transformationEligibleObjects.length);
        const modifiedObject: ICommonGeometricShape = transformationEligibleObjects[indexOfObject];

        modifications.colorChangedObjects.set(modifiedObject.id, this.generateRandomColor());
        transformationEligibleObjects.splice(indexOfObject, 1);
    }

    private generateRandomColor(): number {
        return Math.floor(Math.random() * SceneObjectColorChanger.numberOfHexColors);
    }
}
