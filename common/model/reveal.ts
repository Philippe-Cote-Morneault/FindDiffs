import { ICommon2DPosition } from "./positions";

export interface ICommonReveal{
    hit: boolean; 
    pixels_affected: ICommon2DPosition[];
    difference_id: number;
}
