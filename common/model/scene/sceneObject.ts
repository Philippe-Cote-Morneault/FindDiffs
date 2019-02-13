export interface ICommonSceneObject {
    color: string;
    dimensions: number[];
    type: GeometricShapes;
    position: number[];
    texture: Textures;
}

export enum GeometricShapes { SPHERE, CUBE, CONE, CYLINDER, SQUARED_BASE_PYRAMID };

export enum Textures {};