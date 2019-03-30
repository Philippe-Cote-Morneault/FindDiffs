import * as axios from "axios";
import { GameType } from "../../../../common/model/gameCard";
import { INewScore } from "../../../../common/model/score";
import { Game } from "../../model/game/game";

export class ScoreUpdater {
    private static instance: ScoreUpdater;

    public static getInstance(): ScoreUpdater {
        if (!ScoreUpdater.instance) {
            ScoreUpdater.instance = new ScoreUpdater();
        }

        return ScoreUpdater.instance;
    }

    public async updateScore(game: Game, time: number, type: GameType): Promise<INewScore | null> {
        const requestBody: Object = {
            id: game.game_card_id,
            username: game.players[0],
            time: time,
            type: type,
        };
        try {
            return (await axios.default.put(`http://localhost:3000/score/${game.game_card_id}`, requestBody)).data as INewScore;
        } catch (error) {
            return null;
        }
    }
}
