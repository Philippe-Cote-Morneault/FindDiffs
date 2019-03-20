import { Game } from "../../model/game/game";

export class GameManager {
    private game: Game;
    //private endGameCallback: (game: Game, winner: string) => void;

    public constructor(game: Game, endGameCallback: (game: Game, winner: string) => void) {
        this.game = game;
       // this.endGameCallback = endGameCallback;
    }

    public startGame(): void {
        this.game.start_time = new Date();
    }
}