import { GameType } from "../../../../common/model/gameCard";
import { INewScore } from "../../../../common/model/score";
import { Game } from "../../model/game/game";
import { ScoreUpdater } from "./scoreUpdater";

export abstract class GameManager {
    public static readonly SOLO_WINNING_DIFFERENCES_COUNT: number = 7;
    public static readonly MULTIPLAYER_WINNING_DIFFERENCES_COUNT: number = 4;

    public game: Game;

    protected differencesFound: Map<string, boolean>;

    private scoreUpdater: ScoreUpdater;
    private endGameCallback: (game: Game, winner: string, score: INewScore) => void;
    private winningDifferenceCount: number;

    public constructor(game: Game, winningDifferenceCount: number,
                       endGameCallback: (game: Game, winner: string, score: INewScore) => void) {

        this.game = game;
        this.endGameCallback = endGameCallback;
        this.differencesFound = new Map();
        this.scoreUpdater = ScoreUpdater.getInstance();
        this.winningDifferenceCount = winningDifferenceCount;
    }

    public startGame(): void {
        this.game.start_time = new Date();
    }

    public abstract playerClick(position: Object,
                                successCallback: (data: Object | null) => void,
                                failureCallback: () => void): void;

    protected async differenceFound(differenceId: string): Promise<void> {
        this.differencesFound.set(differenceId, true);
        if (++this.game.differences_found === this.winningDifferenceCount) {
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
