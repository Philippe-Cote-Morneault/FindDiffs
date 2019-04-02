import { GameType } from "../../../../common/model/gameCard";
import { INewScore } from "../../../../common/model/score";
import { Game } from "../../model/game/game";
import { ScoreUpdater } from "./scoreUpdater";

export abstract class GameManager {
    public static readonly SOLO_WINNING_DIFFERENCES_COUNT: number = 7;
    public static readonly MULTIPLAYER_WINNING_DIFFERENCES_COUNT: number = 4;

    public game: Game;

    protected differencesFound: Map<string, string[]>;

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
        this.populateDifferencesMap();
    }

    public startGame(): void {
        this.game.start_time = new Date();
    }

    public getAmountDifferencesFound(player: string): number {
        return (this.differencesFound.get(player) as string[]).length;
    }

    public abstract playerClick(position: Object, player: string,
                                successCallback: (data: Object | null) => void,
                                failureCallback: () => void): void;

    protected async differenceFound(differenceId: string, player: string): Promise<void> {
        (this.differencesFound.get(player) as string[]).push(differenceId);
        if (this.getAmountDifferencesFound(player) === this.winningDifferenceCount) {
            await this.endGame(player);
        }
    }

    private async endGame(winner: string): Promise<void> {
        const gameType: GameType = this.winningDifferenceCount === GameManager.SOLO_WINNING_DIFFERENCES_COUNT ?
        GameType.Solo :
        GameType.Online;

        await this.scoreUpdater.updateScore(this.game, Date.now() - (this.game.start_time as Date).valueOf(), gameType)
        .then((value: INewScore | null) => {
            if (value as INewScore) {
                this.endGameCallback(this.game, winner, value as INewScore);
            }
        });
    }

    protected isDifferenceFound(player: string, differenceId: string): boolean {
        return (this.differencesFound.get(player) as string[]).indexOf(differenceId) >= 0;
    }

    private populateDifferencesMap(): void {
        this.game.players.forEach((player: string) => {
            this.differencesFound.set(player, []);
        });
    }

}
