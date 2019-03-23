import { Game } from "../../model/game/game";

export abstract class GameManager {
    private game: Game;
    private endGameCallback: (game: Game, winner: string) => void;

    public constructor(game: Game, endGameCallback: (game: Game, winner: string) => void) {
        this.game = game;
        this.endGameCallback = endGameCallback;
    }

    public startGame(): void {
        this.game.start_time = new Date();
        //this.endGameCallback(this.game, "changeTHIS");
        console.log(this.endGameCallback);
    }

    public abstract playerClick(): void;
}