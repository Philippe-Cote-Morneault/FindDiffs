import { ICommonGeometricObject } from "./geometricObject";

export interface ICommonPyramid extends ICommonGeometricObject {
    radiusBase: number;
    height: number;
}