import { expect } from "chai";
import { ICommon3DPosition } from "../../../../common/model/positions";
import { DefaultGrid } from "./grid";

describe("RandomGrid", () => {
    describe("generateGrid()", () => {
        it("Should generate a grid with a bunch of random positions 200 minimum", () => {
            const SIZE: number = 1000;
            const MARGIN: number = 20;
            const POSITION_TO_GENERATE: number = 200;
            const defaultGrid: DefaultGrid = new DefaultGrid(SIZE, SIZE, MARGIN);

            // tslint:disable-next-line:no-magic-numbers
            const minX: number = SIZE / 2  * -1;
            // tslint:disable-next-line:no-magic-numbers
            const minY: number = SIZE / 2  * -1;
            const maxX: number = minX * -1;
            const maxY: number = minY * -1;

            for (let i: number = 0; i < POSITION_TO_GENERATE; i++) {
                const position: ICommon3DPosition = defaultGrid.getNextPosition();

                expect(position.x).to.be.gte(minX).and.to.be.lte(maxX);
                expect(position.y).to.be.gte(minY).and.to.be.lte(maxY);
            }
        });
    });
});
