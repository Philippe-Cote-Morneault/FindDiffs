import { ICommonScene } from "../../../../common/model/scene/scene";
import { ICommonSceneModifications } from "../../../../common/model/scene/sceneModifications";
import { ICommonSceneObject } from "../../../../common/model/scene/sceneObject";

/**
 * Represents a transformation to apply to a scene
 */
export interface SceneTransformation {
   applyTransformation(modifiedScene: ICommonScene, transformationEligibleObjects: ICommonSceneObject[],
                       modifications: ICommonSceneModifications): void;
}
