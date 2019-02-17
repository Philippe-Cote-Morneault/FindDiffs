import { ICommonGeometricObject } from "./objects/geometricObject";
import { ICommonThematicObject } from "./objects/thematicObject";
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
    sceneObjects: ICommonGeometricObject[];
}

export interface ICommonThematicScene extends ICommonScene {
    texture: string;
    sceneObjects: ICommonThematicObject[];
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
