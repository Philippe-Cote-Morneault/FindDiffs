//import { Game } from "../../model/game/game";
import { SocketSubscriber } from "../socket/socketSubscriber";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { SocketHandler } from "../socket/socketHandler";

export class GameManager implements SocketSubscriber {
    private static instance: GameManager;

    private activeGames: Game[];

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }

        return GameManager.instance;
    }

    public notify(event: Event, message: ICommonSocketMessage): void {
        switch (event) {
            case Event.PlaySoloGame:
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

    private createSoloGame(): void {
        this.activeGames.push();
    }
}
