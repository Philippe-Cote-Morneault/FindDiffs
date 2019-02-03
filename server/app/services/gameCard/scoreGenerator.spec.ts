import { expect } from "chai";
import { ScoreGenerator } from "./scoreGenerator";

describe("ScoreGenerator", () => {
    describe("generateScore()", () => {
        it("Should return an empty array if length is zero", () => {
            const numbers: number[] = ScoreGenerator.generateScore(0);
            expect(numbers.length).to.equal(0);
        });
        it("Should return an empty array if length is less than zero", () => {
            const numbers: number[] = ScoreGenerator.generateScore(-1);
            expect(numbers.length).to.equal(0);
        });

        it("should be lower than MAX and MIN value specified", () => {
            const NUMBER_SCORE: number = 100;
            const numbers: number[] = ScoreGenerator.generateScore(NUMBER_SCORE);

            expect(numbers.filter(
                (x: number) => x >= ScoreGenerator.MIN && ScoreGenerator.MAX >= x).length
                ).to.equal(NUMBER_SCORE);
        });
    });
});
