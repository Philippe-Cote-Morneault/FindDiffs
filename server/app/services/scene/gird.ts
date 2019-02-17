import { StackEmptyException } from "../../../../common/errors/stackEmptyException";
import { ICommon3DPosition } from "../../../../common/model/positions";

export abstract class Grid {

    protected width: number;
    protected height: number;
    protected minDistancePos: number;
    protected positions: ICommon3DPosition[];
    protected positionsStack: ICommon3DPosition[];

    public constructor(width: number, height: number, minDistancePos: number) {
        this.width = width;
        this.height = height;
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

        return this.positionsStack.splice(nextPositionIndex, 1)[0];
    }

    public restoreStack(): void {
        this.positionsStack = this.positions.slice();
    }

    protected abstract generateGrid(): void;
}

export class DefaultGrid extends Grid {

    protected generateGrid(): void {
        // tslint:disable-next-line:no-magic-numbers
        const minX: number = (this.width / 2) * -1;
        const maxX: number = minX * -1;
        // tslint:disable-next-line:no-magic-numbers
        const minY: number = (this.height / 2) * -1;
        const maxY: number = minY * -1;

        for (let x: number = minX; x < maxX; x += this.minDistancePos) {
            for (let y: number = minY; y < maxY; y += this.minDistancePos) {
                const position: ICommon3DPosition = {
                    x: x,
                    y: y,
                    z: 0,
                };
                this.positions.push(position);
            }
        }
    }

}
