import { Game } from "../../model/game/game";

export abstract class GameManager {
    protected static SOLO_WINNING_DIFFERENCES_COUNT: number = 7;

    public game: Game;

    protected endGameCallback: (game: Game, winner: string) => void;
    protected differencesFound: Map<number, boolean>;
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

}
