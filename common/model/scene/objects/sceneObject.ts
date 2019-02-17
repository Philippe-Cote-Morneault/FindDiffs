import { ICommon3DPosition } from "../../positions";
import { EulerAngles } from "../eulerAngles";

/**
 * Represents an object in a ThreeJS scene.
 */
export interface ICommonSceneObject {
    id: string;
    orientation: EulerAngles;
    type: ObjectType;
    position: ICommon3DPosition;
}

export enum ObjectType { Theme, Geometric };

