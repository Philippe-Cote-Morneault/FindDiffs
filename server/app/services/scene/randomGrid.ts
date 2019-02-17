import { ICommon3DPosition } from "../../../../common/model/positions";
import { Grid } from "./gird";

export class RandomGrid extends Grid {
    private NUMBER_POSITION: number = 400;

    protected generateGrid(): void {
        for (let i: number = 0; i < this.NUMBER_POSITION; i++) {
            this.positions.push(this.generatePosition());
        }
    }

    private generatePosition(): ICommon3DPosition {
        let isPositionValid: boolean = false;
        let newPosition: ICommon3DPosition = {x: 0, y: 0, z: 0};

        while (!isPositionValid) {
            isPositionValid = true;

            const x: number = this.generateCoordinates(this.width);
            const y: number = this.generateCoordinates(this.height);
            newPosition = {x: x, y: y, z: 0};

            for (const position of this.positions) {
                const distance: number = this.distanceBetweenPosition(position, newPosition);
                if (distance > this.minDistancePos) {
                    isPositionValid = false;
                    break;
                }
            }
        }

        return newPosition;
    }

    private distanceBetweenPosition(position1: ICommon3DPosition, position2: ICommon3DPosition): number {
        // tslint:disable-next-line:no-magic-numbers
        return Math.sqrt(Math.pow(position1.x - position2.x, 2) + Math.pow(position1.y - position2.y, 2));
    }
    private generateCoordinates(range: number): number {
        // tslint:disable-next-line:no-magic-numbers
        return Math.floor(Math.random() * range) - Math.floor(range / 2);
    }
}
