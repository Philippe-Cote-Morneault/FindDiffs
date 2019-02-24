import { ICommonGeometricModifications } from "../../../../../../common/model/scene/modifications/geometricModifications";
import { SceneTransformation } from "../../../../../../common/model/scene/modifications/sceneTransformation";
import { ICommonGeometricObject } from "../../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ColorUtils } from "../../../../utils/colorUtils";
import { RandomUtils } from "../../../../utils/randomUtils";

/**
 * In charge of changing the color of a random scene object to a random color
 */
export class SceneObjectColorChanger implements SceneTransformation {

    public applyTransformation(objectsToTransform: ICommonGeometricObject[],
                               modifications: ICommonGeometricModifications): void {

        const indexOfObject: number = RandomUtils.random(objectsToTransform.length);
        const modifiedObject: ICommonGeometricObject = objectsToTransform[indexOfObject];

        modifications.colorChangedObjects.push({
            key: modifiedObject.id,
            value: ColorUtils.WHITE - modifiedObject.color,
        });

        objectsToTransform.splice(indexOfObject, 1);
    }

}
