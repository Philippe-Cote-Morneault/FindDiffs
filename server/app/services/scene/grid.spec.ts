import { expect } from "chai";
import * as sinon from "sinon";
import { ICommon3DPosition } from "../../../../common/model/positions";
import { DefaultGrid, Grid } from "./grid";

describe("DefaultGrid", () => {
    describe("generateGrid()", () => {
        const maxSafeZoneCall: number = 2;
        let safeZoneCall: number = 2;
        beforeEach(() => {
            // tslint:disable-next-line:no-any
            sinon.stub(Grid.prototype, "isInSafeZone").callsFake((positon: ICommon3DPosition) => {
                safeZoneCall--;

                return (safeZoneCall > 0);
            });
        });

        afterEach(() => {
            (Grid.prototype.isInSafeZone as sinon.SinonStub).restore();
            safeZoneCall = maxSafeZoneCall;
        });
        it("Should generate a grid with a bunch of random positions, and call itself back if in safezone", () => {
            const SIZE: number = 500;
            const MARGIN: number = 20;
            const DEPTH: number = 50;
            const POSITION_TO_GENERATE: number = 200;
            const defaultGrid: DefaultGrid = new DefaultGrid(SIZE, SIZE, DEPTH, MARGIN);

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
        it("Should generate a grid with a bunch of random positions 200 minimum", () => {
            const SIZE: number = 500;
            const DEPTH: number = 50;
            const MARGIN: number = 20;
            const POSITION_TO_GENERATE: number = 200;
            const defaultGrid: DefaultGrid = new DefaultGrid(SIZE, SIZE, DEPTH, MARGIN);

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

    describe("isInSafeZone()", () => {
        it("Should return true if the position is in the SafeZone", () => {
            const SIZE: number = 50;
            const DEPTH: number = 50;
            const MIN_DISTANCE: number = 5;
            const grid: Grid = new DefaultGrid(SIZE, SIZE, DEPTH, MIN_DISTANCE);
            const position: ICommon3DPosition = {
                x: 0,
                y: 2,
                z: 0,
            };
            expect(grid.isInSafeZone(position)).to.equal(true);
        });

        it("Should return false if the position is in the SafeZone", () => {
            const SIZE: number = 50;
            const DEPTH: number = 50;
            const MIN_DISTANCE: number = 5;
            const grid: Grid = new DefaultGrid(SIZE, SIZE, DEPTH, MIN_DISTANCE);
            const position: ICommon3DPosition = {
                x: 0,
                y: 10,
                z: 0,
            };
            expect(grid.isInSafeZone(position)).to.equal(false);
        });
    });
});
