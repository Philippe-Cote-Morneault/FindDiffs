import { ICommonSceneModifications } from "../../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";

/**
 * Represents a transformation to apply to a scene
 */
export interface SceneTransformation {
   applyTransformation(objectsToTransform: ICommonSceneObject[],
                       modifications: ICommonSceneModifications): void;
}
