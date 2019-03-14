import { ICommonSceneModifications } from "./sceneModifications";
import { ICommonSceneObject } from "../objects/sceneObject";
import { ObjectType } from "../scene";

/**
 * Represents a transformation to apply to a scene
 */
export interface SceneTransformation {
   applyTransformation(
      objectsToTransform: ICommonSceneObject[],
      modifications: ICommonSceneModifications,
      type: ObjectType,
   ): void;
}
