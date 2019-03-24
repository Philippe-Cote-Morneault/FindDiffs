import { ICommon2DPosition } from "./positions";

export interface ICommonReveal{
    hit: boolean; 
    pixels_affected: ICommon2DPosition[];
    difference_id: number;
}

export interface ICommonReveal3D{
    hit: boolean; 
    differenceType: DifferenceType;
}

export enum DifferenceType { colorChanged, removedObject, addedObject, textureObjectChanged, none };
