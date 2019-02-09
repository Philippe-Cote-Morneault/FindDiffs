import { ICommonSceneObject } from "../../../../common/model/scene/sceneObject";

export interface SceneTransformation {
   applyTransformation(originalObjects: ICommonSceneObject[], indexOfModifiedObjects: number[]): void;
}
