import { ICommonGame } from "../../../../common/communication/webSocket/game";
import { ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { GameService } from "./gameService";

export class MatchmakingService {
    private static instance: MatchmakingService;
    // private socketHandler: SocketHandler;
    private pendingGame: Map<string, string>;
    private gameService: GameService;

    public static getInstance(): MatchmakingService {
        if (!MatchmakingService.instance) {
            MatchmakingService.instance = new MatchmakingService();
        }

        return MatchmakingService.instance;
    }

    private constructor() {
        this.pendingGame = new Map();
        this.gameService = GameService.getInstance();
    }

    public matchPlayers(message: ICommonSocketMessage, player: string): void {
        const data: ICommonGame = message.data as ICommonGame;
        (this.pendingGame.has(data.ressource_id)) ?
        this.createMultiplayersGame(data, player) :
        this.pendingGame.set(data.ressource_id, player);

    }

    private createMultiplayersGame(data: ICommonGame, player: string): void {
        const firstPlayer: string | undefined = this.pendingGame.get(data.ressource_id);
        if (firstPlayer) {
            this.gameService.createMultiplayerGame(data, firstPlayer, player);
            this.pendingGame.delete(data.ressource_id);
        }
    }
}
