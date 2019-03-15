import { ICommonScoreEntry } from "../../../../common/model/gameCard";

export class ScoreUpdater {

    public static updateScore(scoreTable: ICommonScoreEntry[], userScore: ICommonScoreEntry): ICommonScoreEntry[] {

        let temp: ICommonScoreEntry;
        let score: ICommonScoreEntry = userScore;
        //scoreTable.forEach((element: ICommonScoreEntry) => {
        for (let i: number = 0; i < scoreTable.length; ++i) {
            if (scoreTable[i].score > userScore.score) {
                temp = scoreTable[i];
                scoreTable[i] = score;
                score = temp;
            }
        }
        //});

        return scoreTable;
    }
}
