import { ICommonSceneModifications } from "../../../../common/model/scene/sceneModifications";
import { ICommonSceneObject } from "../../../../common/model/scene/sceneObject";

/**
 * Represents a transformation to apply to a scene
 */
export interface SceneTransformation {
   applyTransformation(transformationEligibleObjects: ICommonSceneObject[], modifiedObjects: ICommonSceneObject[],
                       modifications: ICommonSceneModifications): void;
}
