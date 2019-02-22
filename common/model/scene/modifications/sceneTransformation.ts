import { ICommonSceneModifications } from "./sceneModifications";
import { ICommonSceneObject } from "../objects/sceneObject";

/**
 * Represents a transformation to apply to a scene
 */
export interface SceneTransformation {
   applyTransformation(objectsToTransform: ICommonSceneObject[],
                       modifications: ICommonSceneModifications): void;
}
