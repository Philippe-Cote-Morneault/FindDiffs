import { ICommonSceneObject } from "./sceneObject";

/**
 * Represents a ThreeJS scene
 */
export interface ICommonScene {
    sceneObjects: ICommonSceneObject[];
    bg_color: string;
    texture: string;
    id: string;
}

