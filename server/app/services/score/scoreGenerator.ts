import { ICommonScoreEntry } from "../../../../common/model/gameCard";
import { RandomUtils } from "../../utils/randomUtils";

export class ScoreGenerator {
    public static readonly MIN: number = 60;
    public static readonly MAX: number = 90;
    public static readonly DEFAULT_NAMES: string[] = ["Michel", "Jean", "Steven"];

    public static generateScore(length: number): ICommonScoreEntry[] {

        const generatedScore: ICommonScoreEntry[] = new Array<ICommonScoreEntry>();
        for (let i: number = 0; i < length; i++) {
            const scoreEntry: ICommonScoreEntry = {
                name: this.DEFAULT_NAMES[i],
                score: RandomUtils.inRangeInt(this.MIN, this.MAX),
            };
            generatedScore.push(scoreEntry);
        }

        return generatedScore.sort(
            (a: ICommonScoreEntry, b: ICommonScoreEntry) => a.score - b.score,
        );
    }
}
