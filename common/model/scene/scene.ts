import { ICommonGeometricShape } from "./objects/geometricShape";
import { ICommonThematicObject } from "./objects/thematic";

/**
 * Represents a ThreeJS scene
 */
export interface ICommonScene {
    id: string;
    dimensions: ICommonSceneDimensions;
}

export interface ICommonGeometricScene extends ICommonScene {
    bg_color: string;
    sceneObjects: ICommonGeometricShape[];
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
