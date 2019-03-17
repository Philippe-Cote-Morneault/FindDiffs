import { Game } from "../../model/game/game";

export class GameManager {
    private static instance: GameManager;

    private activeGames: Game[];

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }

        return GameManager.instance;
    }
}
