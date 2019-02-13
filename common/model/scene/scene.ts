import { ICommonSceneObject } from "./sceneObject";

/**
 * Represents a ThreeJS scene
 */
export interface ICommonScene {
    sceneObjects: ICommonSceneObject[];
    bg_color: string;
    texture: string;
    id: string;
    dimensions: ICommonSceneDimensions;

}

/**
 * Represents 3D dimensions of a scene.
 */
export interface ICommonSceneDimensions {
    x: number;
    y: number;
    z: number;
}
