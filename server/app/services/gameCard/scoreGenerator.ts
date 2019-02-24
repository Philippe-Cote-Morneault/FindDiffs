import { RandomUtils } from "../../utils/randomUtils";

export class ScoreGenerator {
    public static readonly MIN: number = 60;
    public static readonly MAX: number = 90;

    public static generateScore(length: number): number[] {

        const generatedNumbers: number[] = new Array<number>();
        for (let i: number = 0; i < length; i++) {
            generatedNumbers.push(RandomUtils.inRangeInt(this.MIN, this.MAX));
        }

        return generatedNumbers.sort();
    }
}
