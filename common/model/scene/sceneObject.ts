import { ICommon3DPosition } from "../positions";

/**
 * Represents an object in a ThreeJS scene.
 */
export interface ICommonSceneObject {
    id: string;
    dimensions: number[];
    type: GeometricShape;
    position: ICommon3DPosition;
    color?: number;
    texture?: Textures;
}

export enum GeometricShape { SPHERE, CUBE, CONE, CYLINDER, SQUARED_BASE_PYRAMID };
export enum ObjectTypes { Theme, Geometric };

// TODO: Define what texture to put
export enum Textures {};
