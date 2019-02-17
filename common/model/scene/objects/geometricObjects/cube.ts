import { ICommonGeometricObject } from "./geometricObject";

export interface ICommonCube extends ICommonGeometricObject {
    width: number;
    height: number;
    depth: number;
}