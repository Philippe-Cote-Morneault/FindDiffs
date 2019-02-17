import { ICommon3DPosition } from "../../positions";
import { EulerAngles } from "../eulerAngles";

/**
 * Represents an object in a ThreeJS scene.
 */
export interface ICommonSceneObject {
    id: string;
    orientation: EulerAngles;
    position: ICommon3DPosition;
}


