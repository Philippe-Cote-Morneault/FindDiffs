import { ICommonGeometricObject } from "./geometricObject";

export interface ICommonCone extends ICommonGeometricObject {
    radius: number;
    height: number;
}