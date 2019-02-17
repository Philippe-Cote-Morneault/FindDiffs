import { ICommonSceneObject } from "./sceneObject";

export interface ICommonGeometricObject extends ICommonSceneObject {
    color: number;
    shape: GeometricShape;
    dimensions: number[];
}

export enum GeometricShape { SPHERE, CUBE, CONE, CYLINDER, SQUARED_BASE_PYRAMID };