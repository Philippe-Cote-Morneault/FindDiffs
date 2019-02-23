import { ICommonSceneObject } from "../sceneObject";

export interface ICommonGeometricObject extends ICommonSceneObject {
    color: number;
    shapeType?: GeometricShapeType;
}

export enum GeometricShapeType { SPHERE, CUBE, CONE, CYLINDER, TRIANGULAR_BASE_PYRAMID };