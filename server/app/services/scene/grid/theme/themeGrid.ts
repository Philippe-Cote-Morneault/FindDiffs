import { ICommon3DPosition } from "../../../../../../common/model/positions";
import { EnumUtils } from "../../../../utils/enumUtils";
import { RandomUtils } from "../../../../utils/randomUtils";
import { Grid } from "../grid";
import { IThemeGridPosition } from "./IThemeGridPosition";

export enum SurfaceType {Grass = 0, Parking = 1, Car = 2}

export class ThemeGrid extends Grid {
    private static readonly POSITION_FILE: string = "./positions.json";

    // tslint:disable-next-line:no-magic-numbers
    private static readonly GENERATION_FACTOR: number[] = [30, 40, 30];
    private static readonly SUM_GEN_FACTOR: number = 100;
    private static readonly NUMBER_POSITION: number = 250;

    protected generateGrid(): void {
        const availablePositions: IThemeGridPosition = require(ThemeGrid.POSITION_FILE);

        for (let i: number = 0; i < ThemeGrid.NUMBER_POSITION; i++) {
            this.positions.push(this.choosePosition(availablePositions));
        }
    }

    private choosePosition(positions: IThemeGridPosition): ICommon3DPosition {
        const surfaceChoice: SurfaceType = this.chooseSurfaceType();
        const surfaceName: string = SurfaceType[surfaceChoice].toLowerCase();

        const surfacePositions: ICommon3DPosition[] = positions[surfaceName];
        const choice: number = RandomUtils.inRange(0, surfacePositions.length - 1);

        const position: ICommon3DPosition = surfacePositions[choice];
        surfacePositions.splice(choice);

        return position;
    }

    private chooseSurfaceType(): SurfaceType {
        const choice: number = RandomUtils.random(ThemeGrid.SUM_GEN_FACTOR);
        let factorSum: number = 0;

        ThemeGrid.GENERATION_FACTOR.forEach((factor: number, i: number) => {
            if (choice < factorSum) {
                return EnumUtils.enumFromInt<SurfaceType>(i, SurfaceType);
            } else {
                factorSum += factor;
            }
        });
        const lastIndex: number = ThemeGrid.GENERATION_FACTOR.length - 1;

        return lastIndex as SurfaceType;
    }
}
