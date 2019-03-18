import * as uuid from "uuid";
import { ICommonGame } from "../../../../common/communication/webSocket/game";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { Game } from "../../model/game/game";
import { SocketHandler } from "../socket/socketHandler";
import { SocketSubscriber } from "../socket/socketSubscriber";

export class GameManager implements SocketSubscriber {
    private static instance: GameManager;

    private activeGames: Game[];

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }

        return GameManager.instance;
    }

    public notify(event: Event, message: ICommonSocketMessage, sender: string): void {
        switch (event) {
            case Event.PlaySoloGame:
                this.createSoloGame(message.data as ICommonGame);
                break;
            case Event.UserConnected:
                console.log(message.data);
                break;
            default:
                break;
        }
    }

    private constructor() {
        this.activeGames = [];
        this.subscribeToSocket();
    }

    private subscribeToSocket(): void {
        SocketHandler.getInstance().subscribe(Event.UserConnected, this);
        SocketHandler.getInstance().subscribe(Event.PlaySoloGame, this);
    }

    private createSoloGame(game: ICommonGame): void {
        const newGame: Game = {
            id: uuid.v4(),
            ressource_id: game.ressource_id,
            players: [],
        };
        this.activeGames.push(newGame);
    }
}
