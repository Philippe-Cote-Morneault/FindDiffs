import { ICommonSceneObject } from "./sceneObject";

export interface ICommonGeometricShape extends ICommonSceneObject {
    color: number;
    shape: GeometricShape;
}

export enum GeometricShape { SPHERE, CUBE, CONE, CYLINDER, SQUARED_BASE_PYRAMID };