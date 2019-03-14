import { Grid } from "../grid";
import { IThemeGridPosition } from "./IThemeGridPosition";

export enum SurfaceType {Grass = 0, Parking = 1, Car = 2}

export class ThemeGrid extends Grid {
    private static readonly POSITION_FILE: string = "./positions.json";

    protected generateGrid(): void {
        const availablePositions: IThemeGridPosition = require(ThemeGrid.POSITION_FILE);
    }

}
