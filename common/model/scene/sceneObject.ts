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

// TODO: Define what texture to put
export enum Textures {};