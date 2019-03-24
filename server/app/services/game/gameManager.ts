import { Game } from "../../model/game/game";

export abstract class GameManager {
    private endGameCallback: (game: Game, winner: string) => void;

    public game: Game;
    protected differencesFound: Map<number, boolean>;
    protected identificationErrorCallback: (game: Game) => void;

    public constructor(game: Game, endGameCallback: (game: Game, winner: string) => void) {
        this.game = game;
        this.endGameCallback = endGameCallback;
        this.differencesFound = new Map();
    }

    public startGame(): void {
        this.game.start_time = new Date();
        //this.endGameCallback(this.game, "changeTHIS");
        console.log(this.endGameCallback);
    }

    public abstract playerClick(position: Object, callBack: (data: Object | null) => void): void;
}