import { ICommonGeometricModifications } from "../../../../../../common/model/scene/modifications/geometricModifications";
import { SceneTransformation } from "../../../../../../common/model/scene/modifications/sceneTransformation";
import { ICommonGeometricObject } from "../../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ColorUtils } from "../../../../utils/colorUtils";

/**
 * In charge of changing the color of a random scene object to a random color
 */
export class SceneObjectColorChanger implements SceneTransformation {

    public applyTransformation(objectsToTransform: ICommonGeometricObject[],
                               modifications: ICommonGeometricModifications): void {

        const indexOfObject: number = Math.floor(Math.random() * objectsToTransform.length);
        const modifiedObject: ICommonGeometricObject = objectsToTransform[indexOfObject];

        modifications.colorChangedObjects.set(modifiedObject.id, ColorUtils.numberOfHexColors - modifiedObject.color);
        modifications.colorChangedObjects.push({
            key: modifiedObject.id,
            value: ColorUtils.generateRandomColor(),
        });

        objectsToTransform.splice(indexOfObject, 1);
    }

}
