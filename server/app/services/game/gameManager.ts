// import { Game } from "../../model/game/game";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { SocketHandler } from "../socket/socketHandler";
import { SocketSubscriber } from "../socket/socketSubscriber";

export class GameManager implements SocketSubscriber {
    private static instance: GameManager;

    // private activeGames: Game[];

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }

        return GameManager.instance;
    }

    public notify(event: Event, message: ICommonSocketMessage): void { }

    private constructor() {
        SocketHandler.getInstance().subscribe(Event.UserConnected, this);
    }
}
