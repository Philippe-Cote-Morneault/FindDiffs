import { ICommon3DPosition } from "../../../../../common/model/positions";
import { ICommonSceneObject } from "../../../../../common/model/scene/objects/sceneObject";

export interface IObjectGenerator {
    createObject(position: ICommon3DPosition): ICommonSceneObject;
}
