import { expect } from "chai";
import * as crypto from "crypto";
import { ICommon3DPosition } from "../../../../../../common/model/positions";
import { NoErrorThrownException } from "../../../../tests/noErrorThrownException";
import * as GamePositions from "./positions.json";
import { IPositionGridTheme, ThemeGrid } from "./themeGrid";

const sha1Pos: (pos: ICommon3DPosition) => string =
(pos: ICommon3DPosition) => crypto.createHash("sha1").update(JSON.stringify(pos)).digest("hex");

describe("ThemeGrid", () => {
    describe("Positions.json", () => {
        it("Should not have duplicates values", () => {

            for (const surface of Object.keys(GamePositions)) {
                const positionsSet: Set<string> = new Set<string>();
                for (const position of GamePositions[surface]) {
                    const hasValue: boolean = positionsSet.has(sha1Pos(position));
                    if (hasValue) {
                        console.error(position);
                    }
                    expect(hasValue).to.equal(false);

                    positionsSet.add(sha1Pos(position));
                }
            }
        });
    });
    describe("generateGrid()", () => {
        const propertyName: string = "NUMBER_POSITION";
        const themeNumberPositon: number = Number(ThemeGrid[propertyName]);
        afterEach(() => {
            ThemeGrid[propertyName] = themeNumberPositon;
        });
        it("Should generate a grid with a bunch of random positions 200 minimum", () => {
            const SIZE: number = 500;
            const DEPTH: number = 50;
            const MARGIN: number = 20;
            const POSITION_TO_GENERATE: number = 200;
            const themeGrid: ThemeGrid = new ThemeGrid({x: SIZE, y: SIZE, z: DEPTH}, MARGIN);

            // tslint:disable-next-line:no-magic-numbers
            const minX: number = SIZE / 2  * -1;
            // tslint:disable-next-line:no-magic-numbers
            const minY: number = SIZE / 2  * -1;
            const maxX: number = minX * -1;
            const maxY: number = minY * -1;

            for (let i: number = 0; i < POSITION_TO_GENERATE; i++) {
                const position: IPositionGridTheme = themeGrid.getNextPosition() as IPositionGridTheme;
                expect(position.x).to.be.gte(minX).and.to.be.lte(maxX);
                expect(position.y).to.be.gte(minY).and.to.be.lte(maxY);
            }
        });
        it("Should throw an error if too many positions are requested than they are available", () => {
            const SIZE: number = 1000;
            const MARGIN: number = 20;
            const DEPTH: number = 50;
            const POSITION_TO_GENERATE: number = 500;
            const themeGrid: ThemeGrid = new ThemeGrid({x: SIZE, y: SIZE, z: DEPTH}, MARGIN);

            try {
                for (let i: number = 0; i < POSITION_TO_GENERATE; i++) {
                    themeGrid.getNextPosition();
                }
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The stack cannot be popped since it's empty.");
            }
        });

        it("Should throw an error if too many position are requested by the grid itself and not enough positons are in json", () => {
            const SIZE: number = 1000;
            const MARGIN: number = 20;
            const DEPTH: number = 50;

            const POSITION_TO_GENERATE: number = 500;
            ThemeGrid[propertyName] = POSITION_TO_GENERATE;

            try {
                // tslint:disable-next-line:no-unused-expression
                new ThemeGrid({x: SIZE, y: SIZE, z: DEPTH}, MARGIN);
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal("The stack cannot be popped since it's empty.");
            }
        });

        it("Should not return a position that was already returned by the grid", () => {
            const SIZE: number = 1000;
            const MARGIN: number = 20;
            const DEPTH: number = 50;

            const POSITION_TO_GENERATE: number = 200;
            const ITERATIONS: number = 10;

            for (let i: number = 0; i < ITERATIONS; i++) {
                const positionsSet: Set<string> = new Set<string>();

                const themeGrid: ThemeGrid = new ThemeGrid({x: SIZE, y: SIZE, z: DEPTH}, MARGIN);
                for (let j: number = 0 ; j < POSITION_TO_GENERATE; j++) {
                    const position: ICommon3DPosition = themeGrid.getNextPosition();
                    const hasValue: boolean = positionsSet.has(sha1Pos(position));
                    if (hasValue) {
                        console.error(positionsSet);
                        console.error(position);
                    }
                    expect(hasValue).to.equal(false);

                    positionsSet.add(sha1Pos(position));
                }
            }
        });

        it("Should return a position which is approximately between the spawning rate specified", () => {
            const SIZE: number = 1000;
            const MARGIN: number = 20;
            const DEPTH: number = 50;
            const POSITION_TO_GENERATE: number = 50;
            const ITERATIONS: number = 1000;

            const ERROR_MARGIN: number = 20;

            const spawnData: number[] = [0, 0, 0];
            for (let i: number = 0; i < ITERATIONS; i++) {
                const themeGrid: ThemeGrid = new ThemeGrid({x: SIZE, y: SIZE, z: DEPTH}, MARGIN);

                for (let j: number = 0; j < POSITION_TO_GENERATE; j++) {
                    const position: IPositionGridTheme = themeGrid.getNextPosition() as IPositionGridTheme;
                    spawnData[position.surface] += 1;
                }
            }

            for (let i: number = 0; i < ThemeGrid.GENERATION_FACTOR.length; i++) {
                // tslint:disable-next-line:no-magic-numbers
                const percent: number = spawnData[i] / (POSITION_TO_GENERATE * ITERATIONS) * 100;
                expect(ThemeGrid.GENERATION_FACTOR[i]).to.be.gte(percent - ERROR_MARGIN).and.to.be.lte(percent + ERROR_MARGIN);
            }
        });
    });
});
