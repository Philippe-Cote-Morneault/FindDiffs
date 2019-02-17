import { ICommon3DPosition } from "../../positions";
import { ICommonEulerAngles } from "../eulerAngles";
import { ObjectType } from "../scene";

/**
 * Represents an object in a ThreeJS scene.
 */
export interface ICommonSceneObject {
    id: string;
    orientation: ICommonEulerAngles;
    position: ICommon3DPosition;
    type: ObjectType;
}


