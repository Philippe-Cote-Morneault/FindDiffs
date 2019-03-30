import { ICommonGame } from "../../../../common/communication/webSocket/game";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { SocketHandler } from "../socket/socketHandler";
import { GameService } from "./gameService";

export class MatchmakingService {
    private static instance: MatchmakingService;
    // private socketHandler: SocketHandler;
    private pendingGame: Map<string, string>;
    private gameService: GameService;
    private socketHandler: SocketHandler;

    public static getInstance(): MatchmakingService {
        if (!MatchmakingService.instance) {
            MatchmakingService.instance = new MatchmakingService();
        }

        return MatchmakingService.instance;
    }

    private constructor() {
        this.pendingGame = new Map();
        this.gameService = GameService.getInstance();
        this.socketHandler = SocketHandler.getInstance();
        this.subscribeToSocket();
    }

    private subscribeToSocket(): void {
        this.socketHandler.subscribe(Event.PlayMultiplayerGame, (message: ICommonSocketMessage, player: string) => {
            this.matchPlayers(message, player);
        });
    }
    public matchPlayers(message: ICommonSocketMessage, player: string): void {
        const data: ICommonGame = message.data as ICommonGame;
        (this.pendingGame.has(data.ressource_id)) ?
        this.createMultiplayersGame(data, player) :
        this.pendingGame.set(data.ressource_id, player);
    }

    private createMultiplayersGame(data: ICommonGame, secondPlayer: string): void {
        const firstPlayer: string | undefined = this.pendingGame.get(data.ressource_id);
        if (firstPlayer) {
            this.gameService.createMultiplayerGame(data, firstPlayer, secondPlayer);
            this.EndMatchmaking(secondPlayer);
            this.EndMatchmaking(firstPlayer);
            this.pendingGame.delete(data.ressource_id);
        }
    }

    private EndMatchmaking(player: string): void {
        const socketMessage: ICommonSocketMessage = {
            data: "",
            timestamp: new Date(),
        };
        this.socketHandler.sendMessage(Event.EndMatchmaking, socketMessage, player);
    }
}
