import { ICommon3DPosition } from "../../../../../common/model/positions";
import { RandomUtils } from "../../../utils/randomUtils";
import { Grid } from "./grid";

export class RandomGrid extends Grid {
    private static readonly NUMBER_POSITION: number = 400;

    protected generateGrid(): void {
        for (let i: number = 0; i < RandomGrid.NUMBER_POSITION; i++) {
            this.positions.push(this.generatePosition());
        }
    }

    private generatePosition(): ICommon3DPosition {
        let isPositionValid: boolean = false;
        let newPosition: ICommon3DPosition = Grid.CENTER;

        while (!isPositionValid) {
            isPositionValid = true;
            newPosition = {
                x: this.generateCoordinates(this.dimensions.x),
                y: this.generateCoordinates(this.dimensions.y),
                z: this.generateCoordinates(this.dimensions.z),
            };

            for (const position of this.positions) {
                const distance: number = this.distanceBetweenPosition(position, newPosition);
                if (distance < this.minDistancePos) {
                    isPositionValid = false;
                    break;
                }
            }
        }

        return newPosition;
    }

    private generateCoordinates(range: number): number {
        // tslint:disable-next-line:no-magic-numbers
        return RandomUtils.random(range) - Math.floor(range / 2);
    }
}
