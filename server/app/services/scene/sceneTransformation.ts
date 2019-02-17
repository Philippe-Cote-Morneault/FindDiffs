import { ICommonGeometricShape } from "../../../../common/model/scene/objects/geometricShape";
import { ICommonScene } from "../../../../common/model/scene/scene";
import { ICommonSceneModifications } from "../../../../common/model/scene/sceneModifications";

/**
 * Represents a transformation to apply to a scene
 */
export interface SceneTransformation {
   applyTransformation(modifiedScene: ICommonScene, transformationEligibleObjects: ICommonGeometricShape[],
                       modifications: ICommonSceneModifications): void;
}
