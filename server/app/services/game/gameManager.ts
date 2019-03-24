import { Game } from "../../model/game/game";

export abstract class GameManager {
    protected static SOLO_WINNING_DIFFERENCES_COUNT: number = 7;

    public game: Game;

    protected endGameCallback: (game: Game, winner: string) => void;
    protected differencesFound: Map<string, boolean>;
    protected identificationErrorCallback: (game: Game) => void;

    public constructor(game: Game, endGameCallback: (game: Game, winner: string) => void) {
        this.game = game;
        this.endGameCallback = endGameCallback;
        this.differencesFound = new Map();
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
        this.endGameCallback(this.game, this.game.players[0]);
    }

}
