import { ICommonGeometricObject } from "./geometricObject";

export interface ICommonCylinder extends ICommonGeometricObject {
    radius: number;
    height: number;
}