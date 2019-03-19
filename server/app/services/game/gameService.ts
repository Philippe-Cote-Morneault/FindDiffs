import * as uuid from "uuid";
import { ICommonGame } from "../../../../common/communication/webSocket/game";
import { ICommonGameEnding } from "../../../../common/communication/webSocket/gameEnding";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { NotFoundException } from "../../../../common/errors/notFoundException";
import { Game } from "../../model/game/game";
import { _e, R } from "../../strings";
import { SocketHandler } from "../socket/socketHandler";
import { SocketSubscriber } from "../socket/socketSubscriber";
import { GameManager } from "./gameManager";

export class GameService implements SocketSubscriber {
    private static instance: GameService;

    private activePlayers: Map<string, GameManager>;
    private activeGames: GameManager[];
    private socketHandler: SocketHandler;

    public static getInstance(): GameService {
        if (!GameService.instance) {
            GameService.instance = new GameService();
        }

        return GameService.instance;
    }

    public notify(event: Event, message: ICommonSocketMessage, sender: string): void {
        switch (event) {
            case Event.PlaySoloGame:
                this.createSoloGame(message.data as ICommonGame, sender);
                break;
            case Event.ReadyToPlay:
                this.startSoloGame(sender);
                break;
            case Event.GameClick:
                // tslint:disable-next-line:no-suspicious-comment
                // TODO: Make call to indentification service

                break;
            default:
                break;
        }
    }

    private constructor() {
        this.activeGames = [];
        this.socketHandler = SocketHandler.getInstance();
        this.subscribeToSocket();
    }

    private subscribeToSocket(): void {
        this.socketHandler.subscribe(Event.PlaySoloGame, this);
        this.socketHandler.subscribe(Event.ReadyToPlay, this);
        this.socketHandler.subscribe(Event.GameClick, this);
    }

    private createSoloGame(game: ICommonGame, player: string): void {
        const newGame: Game = {
            id: uuid.v4(),
            ressource_id: game.ressource_id,
            players: [player],
            start_time: undefined,
            differences_found: 0,
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

    private endGame(game: Game, winner: string): void {
        const gameEndedMessage: ICommonGameEnding = {
            winner: winner,
            time: Date.now() - (game.start_time as Date).valueOf(),
        }
        const message: ICommonSocketMessage = {
            data: gameEndedMessage,
            timestamp: new Date(),
        }
        game.players.forEach((player: string) => {
            this.socketHandler.sendMessage(Event.GameEnded, message, player);
        });
    }
}
