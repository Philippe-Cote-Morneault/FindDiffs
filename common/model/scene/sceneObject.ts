export interface ICommonSceneObject {
    id: string;
    color: string;
    dimensions: number[];
    type: GeometricShapes;
    position: ICommonPositionObjects;
    texture: Textures;
}

export interface ICommonPositionObjects {
    x: number;
    y: number;
    z: number;
}

export enum GeometricShapes { SPHERE = 0, CUBE = 1, CONE = 2, CYLINDER = 3, SQUARED_BASE_PYRAMID = 4, NUMBER_ELEMENTS = 5};

// TODO: Define what texture to put
export enum Textures {};
