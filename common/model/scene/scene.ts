import { ICommonSceneObject } from "./objects/sceneObject";

/**
 * Represents a ThreeJS scene
 */
export interface ICommonScene {
    id: string;
    dimensions: ICommonSceneDimensions;
    sceneObjects: ICommonSceneObject[];
    type: Type;
}

export interface ICommonGeometricScene extends ICommonScene {
    bg_color: string;
}

export interface ICommonThematicScene extends ICommonScene {
    texture: string;
}

/**
 * Represents 3D dimensions of a scene.
 */
export interface ICommonSceneDimensions {
    x: number;
    y: number;
    z: number;
}

export enum Type {Geometric, Thematic};
