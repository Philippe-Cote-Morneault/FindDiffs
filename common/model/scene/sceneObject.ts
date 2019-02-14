import { ICommon3DPosition } from "../positions";

/**
 * Represents an object in a ThreeJS scene.
 */
export interface ICommonSceneObject {
    id: string;
    color: number;
    dimensions: number[];
    type: GeometricShape;
    position: ICommon3DPosition;
    texture: Textures;
}

export enum GeometricShape { SPHERE, CUBE, CONE, CYLINDER, SQUARED_BASE_PYRAMID };
export enum ObjectTypes { Theme, Geometric };

export enum GeometricShapes { SPHERE = 0, CUBE = 1, CONE = 2, CYLINDER = 3, SQUARED_BASE_PYRAMID = 4, NUMBER_ELEMENTS = 5};

// TODO: Define what texture to put
export enum Textures {};
