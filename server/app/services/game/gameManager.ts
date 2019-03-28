import { GameType } from "../../../../common/model/gameCard";
import { INewScore } from "../../../../common/model/score";
import { Game } from "../../model/game/game";
import { ScoreUpdater } from "./scoreUpdater";

export abstract class GameManager {
    public static SOLO_WINNING_DIFFERENCES_COUNT: number = 7;
    public static MULTIPLAYER_WINNING_DIFFERENCES_COUNT: number = 4;
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

    protected differenceFound(differenceId: string): void {
        this.differencesFound.set(differenceId, true);
        if (++this.game.differences_found === GameManager.SOLO_WINNING_DIFFERENCES_COUNT) {
            this.endGame();
        }
    }

    private endGame(): void {
        this.scoreUpdater.updateScore(this.game, Date.now() - (this.game.start_time as Date).valueOf(), GameType.Solo)
        .then((value: INewScore | null) => {
            if (value as INewScore) {
                this.endGameCallback(this.game, this.game.players[0], value as INewScore);
            }
        });
    }

}
