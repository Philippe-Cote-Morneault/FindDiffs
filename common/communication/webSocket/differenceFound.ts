import { ICommon2DPosition } from "../../model/positions";


export interface ICommonDifferenceFound {
    player: string,
    difference_count: number,
    pixels_affected: ICommon2DPosition[],
}