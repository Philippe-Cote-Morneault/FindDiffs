export interface ICommonSceneObject {
    id: string;
    color: string;
    dimensions: number[];
    type: GeometricShapes;
    position: number[];
    texture: Textures;
}

export enum GeometricShapes { SPHERE, CUBE, CONE, CYLINDER, SQUARED_BASE_PYRAMID };

// TODO: Define what texture to put
export enum Textures {};