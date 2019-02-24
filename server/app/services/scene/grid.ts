import { StackEmptyException } from "../../../../common/errors/stackEmptyException";
import { ICommon3DPosition } from "../../../../common/model/positions";
import { ICommonSceneDimensions } from "../../../../common/model/scene/scene";

export abstract class Grid {
    public static readonly CENTER: ICommon3DPosition = {x: 0, y: 0, z: 0};

    protected dimensions: ICommonSceneDimensions;
    protected minDistancePos: number;
    protected positions: ICommon3DPosition[];
    protected positionsStack: ICommon3DPosition[];

    public constructor(dimensions: ICommonSceneDimensions, minDistancePos: number) {
        this.dimensions = dimensions;
        this.minDistancePos = minDistancePos;
        this.positions = new Array<ICommon3DPosition>();

        this.generateGrid();
        this.restoreStack();
    }

    public getNextPosition(): ICommon3DPosition {
        if (this.positionsStack.length === 0) {
            throw new StackEmptyException();
        }
        const nextPositionIndex: number = Math.floor(Math.random() * (this.positionsStack.length - 1));
        const position: ICommon3DPosition = this.positionsStack.splice(nextPositionIndex, 1)[0];

        if (!this.isInSafeZone(position)) {
            return position;
        }

        return this.getNextPosition();
    }

    public restoreStack(): void {
        this.positionsStack = this.positions.slice();
    }

    public getPositions(): ICommon3DPosition[] {
        return this.positionsStack;
    }

    public isInSafeZone(position: ICommon3DPosition): boolean {
        return this.distanceBetweenPosition(position, Grid.CENTER) < this.minDistancePos;
    }

    protected distanceBetweenPosition(position1: ICommon3DPosition, position2: ICommon3DPosition): number {
        // tslint:disable-next-line:no-magic-numbers
        return Math.sqrt(Math.pow(position1.x - position2.x, 2) +
                         // tslint:disable-next-line:no-magic-numbers
                         Math.pow(position1.y - position2.y, 2) +
                         // tslint:disable-next-line:no-magic-numbers
                         Math.pow(position1.z - position2.z, 2));
    }

    protected abstract generateGrid(): void;
}

export class DefaultGrid extends Grid {

    protected generateGrid(): void {
        // tslint:disable-next-line:no-magic-numbers
        const minX: number = (this.dimensions.x / 2) * -1;
        const maxX: number = minX * -1;
        // tslint:disable-next-line:no-magic-numbers
        const minY: number = (this.dimensions.y / 2) * -1;
        const maxY: number = minY * -1;
        // tslint:disable-next-line:no-magic-numbers
        const minZ: number = (this.dimensions.z / 2) * -1;
        const maxZ: number = minZ * -1;

        for (let x: number = minX; x < maxX; x += this.minDistancePos) {
            for (let y: number = minY; y < maxY; y += this.minDistancePos) {
                for (let z: number = minZ; z < maxZ; z += this.minDistancePos) {
                    const position: ICommon3DPosition = {
                        x: x,
                        y: y,
                        z: z,
                    };
                    this.positions.push(position);
                }
            }
        }
    }

}
