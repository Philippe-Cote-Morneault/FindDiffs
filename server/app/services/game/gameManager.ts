import * as uuid from "uuid";
import { ICommonGame } from "../../../../common/communication/webSocket/game";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { NotFoundException } from "../../../../common/errors/notFoundException";
import { Game } from "../../model/game/game";
import { _e, R } from "../../strings";
import { SocketHandler } from "../socket/socketHandler";
import { SocketSubscriber } from "../socket/socketSubscriber";

export class GameManager implements SocketSubscriber {
    private static instance: GameManager;

    private activePlayers: Map<string, Game>;
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
                this.createSoloGame(message.data as ICommonGame, sender);
                break;
            case Event.ReadyToPlay:
                this.startSoloGame(sender);
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
        SocketHandler.getInstance().subscribe(Event.PlaySoloGame, this);
        SocketHandler.getInstance().subscribe(Event.ReadyToPlay, this);
    }

    private createSoloGame(game: ICommonGame, player: string): void {
        const newGame: Game = {
            id: uuid.v4(),
            ressource_id: game.ressource_id,
            players: [player],
            start_time: undefined,
            differences_found: 0;
        };
        this.activeGames.push(newGame);
    }

    private startSoloGame(player: string): void {
        const game: Game | undefined = this.activePlayers.get(player);
        if (game === undefined) {
            throw new NotFoundException(_e(R.ERROR_INVALIDID, [player]));
        }

        game.start_time = new Date();
    }
}
