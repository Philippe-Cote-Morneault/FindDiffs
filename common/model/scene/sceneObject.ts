/**
 * Represents an object in a ThreeJS scene.
 */
export interface ICommonSceneObject {
    id: string;
    color: number;
    dimensions: number[];
    type: GeometricShape;
    position: number[];
    texture: Textures;
}

export enum GeometricShape { SPHERE, CUBE, CONE, CYLINDER, SQUARED_BASE_PYRAMID };

// TODO: Define what texture to put
export enum Textures {};