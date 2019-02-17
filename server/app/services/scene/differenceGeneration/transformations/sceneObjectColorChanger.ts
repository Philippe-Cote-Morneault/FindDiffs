import { ICommonGeometricModifications } from "../../../../../../common/model/scene/modifications/geometricModifications";
import { ICommonGeometricObject } from "../../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ICommonScene } from "../../../../../../common/model/scene/scene";
import { ColorUtils } from "../../../../utils/colorUtils";
import { SceneTransformation } from "./sceneTransformation";

/**
 * In charge of changing the color of a random scene object to a random color
 */
export class SceneObjectColorChanger implements SceneTransformation {

    public applyTransformation(modifedScene: ICommonScene, transformationEligibleObjects: ICommonGeometricObject[],
                               modifications: ICommonGeometricModifications): void {

        const indexOfObject: number = Math.floor(Math.random() * transformationEligibleObjects.length);
        const modifiedObject: ICommonGeometricObject = transformationEligibleObjects[indexOfObject];

        modifications.colorChangedObjects.set(modifiedObject.id, ColorUtils.generateRandomColor());
        transformationEligibleObjects.splice(indexOfObject, 1);
    }

}
