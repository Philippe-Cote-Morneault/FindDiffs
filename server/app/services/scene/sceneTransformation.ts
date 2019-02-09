import { ICommonSceneModifications } from "../../../../common/model/scene/sceneModifications";
import { ICommonSceneObject } from "../../../../common/model/scene/sceneObject";

export interface SceneTransformation {
   applyTransformation(transformationEligibleObjects: ICommonSceneObject[], modifiedObjects: ICommonSceneObject[],
                       modifications: ICommonSceneModifications): void;
}
