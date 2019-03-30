import { GameType } from "../../../../common/model/gameCard";
import { INewScore } from "../../../../common/model/score";
import { Game } from "../../model/game/game";
import { ScoreUpdater } from "./scoreUpdater";

export abstract class GameManager {
    protected static SOLO_WINNING_DIFFERENCES_COUNT: number = 7;
    private scoreUpdater: ScoreUpdater;

    public game: Game;

    protected endGameCallback: (game: Game, winner: string, score: INewScore) => void;
    protected differencesFound: Map<string, boolean>;
    protected identificationErrorCallback: (game: Game) => void;

    public constructor(game: Game, endGameCallback: (game: Game, winner: string, score: INewScore) => void) {
        this.game = game;
        this.endGameCallback = endGameCallback;
        this.differencesFound = new Map();
        this.scoreUpdater = ScoreUpdater.getInstance();
    }

    public startGame(): void {
        this.game.start_time = new Date();
    }

    public abstract playerClick(position: Object,
                                successCallback: (data: Object | null) => void,
                                failureCallback: () => void): void;

    protected async differenceFound(differenceId: string): Promise<void> {
        this.differencesFound.set(differenceId, true);
        if (++this.game.differences_found === GameManager.SOLO_WINNING_DIFFERENCES_COUNT) {
            await this.endGame();
        }
    }

    private async endGame(): Promise<void> {
        await this.scoreUpdater.updateScore(this.game, Date.now() - (this.game.start_time as Date).valueOf(), GameType.Solo)
        .then((value: INewScore | null) => {
            if (value as INewScore) {
                this.endGameCallback(this.game, this.game.players[0], value as INewScore);
            }
        });
    }

}
