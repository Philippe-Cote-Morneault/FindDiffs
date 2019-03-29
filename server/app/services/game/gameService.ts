import * as uuid from "uuid";
import { ICommonDifferenceFound } from "../../../../common/communication/webSocket/differenceFound";
import { ICommonGame } from "../../../../common/communication/webSocket/game";
import { ICommonGameEnding } from "../../../../common/communication/webSocket/gameEnding";
import { ICommonIdentificationError } from "../../../../common/communication/webSocket/identificationError";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { NotFoundException } from "../../../../common/errors/notFoundException";
import { POVType } from "../../../../common/model/gameCard";
import { INewScore } from "../../../../common/model/score";
import { Game } from "../../model/game/game";
import { _e, R } from "../../strings";
import { SocketHandler } from "../socket/socketHandler";
import { FreePOVGameManager } from "./freePOVGameManager";
import { GameManager } from "./gameManager";
import { MatchmakingService } from "./matchmakingService";
import { SimplePOVGameManager } from "./simplePOVGameManager";

export class GameService {
    private static instance: GameService;

    private activePlayers: Map<string, GameManager>;
    private activeGames: GameManager[];
    private socketHandler: SocketHandler;
    private matchmakingService: MatchmakingService;

    public static getInstance(): GameService {
        if (!GameService.instance) {
            GameService.instance = new GameService();
        }

        return GameService.instance;
    }

    private constructor() {
        this.activeGames = [];
        this.socketHandler = SocketHandler.getInstance();
        this.matchmakingService = MatchmakingService.getInstance();
        this.activePlayers = new Map();
        this.subscribeToSocket();
    }

    private subscribeToSocket(): void {
        this.socketHandler.subscribe(Event.PlaySoloGame, (message: ICommonSocketMessage, player: string) => {
            this.createSoloGame(message, player);
        });
        this.socketHandler.subscribe(Event.PlayMultiplayerGame, (message: ICommonSocketMessage, player: string) => {
            this.matchmakingService.matchPlayers(message, player);
        });
        this.socketHandler.subscribe(Event.ReadyToPlay, (message: ICommonSocketMessage, player: string) => {
            this.startSoloGame(message, player);
        });
        this.socketHandler.subscribe(Event.GameClick, (message: ICommonSocketMessage, player: string) => {
            this.gameClick(message, player);
        });
    }

    private createSoloGame(message: ICommonSocketMessage, player: string): void {
        const data: ICommonGame = message.data as ICommonGame;
        const newGame: Game = {
            id: uuid.v4(),
            ressource_id: data.ressource_id,
            players: [player],
            start_time: undefined,
            differences_found: 0,
            game_card_id: data.game_card_id,
        };
        const endGameCallback: (game: Game, winner: string, score: INewScore) => void = (game: Game, winner: string, score: INewScore) => {
            this.endGame(game, winner, score);
        };
        const gameManager: GameManager = data.pov === POVType.Simple ?
            new SimplePOVGameManager(newGame, GameManager.SOLO_WINNING_DIFFERENCES_COUNT, endGameCallback) :
            new FreePOVGameManager(newGame, GameManager.SOLO_WINNING_DIFFERENCES_COUNT, endGameCallback);

        this.activeGames.push(gameManager);
        this.activePlayers.set(player, gameManager);
    }

    public createMultiplayerGame(data: ICommonGame, firstPlayer: string, secondPlayer: string): void {
        const newGame: Game = {
            id: uuid.v4(),
            ressource_id: data.ressource_id,
            players: [firstPlayer, secondPlayer],
            start_time: undefined,
            differences_found: 0,
            game_card_id: data.game_card_id,
        };
        const endGameCallback: (game: Game, winner: string, score: INewScore) => void = (game: Game, winner: string, score: INewScore) => {
            this.endGame(game, winner, score);
        };
        const gameManager: GameManager = data.pov === POVType.Simple ?
            new SimplePOVGameManager(newGame, GameManager.MULTIPLAYER_WINNING_DIFFERENCES_COUNT, endGameCallback) :
            new FreePOVGameManager(newGame, GameManager.MULTIPLAYER_WINNING_DIFFERENCES_COUNT, endGameCallback);

        this.activeGames.push(gameManager);
        this.activePlayers.set(firstPlayer, gameManager);
        this.activePlayers.set(secondPlayer, gameManager);
    }

    private startSoloGame(message: ICommonSocketMessage, player: string): void {
        const game: GameManager | undefined = this.activePlayers.get(player);
        if (game === undefined) {
            throw new NotFoundException(_e(R.ERROR_INVALIDID, [player]));
        }

        game.startGame();
        const socketMessage: ICommonSocketMessage = {
            data: "",
            timestamp: new Date(),
        };
        this.socketHandler.sendMessage(Event.GameStarted, socketMessage, player);
    }

    private endGame(game: Game, winner: string, score: INewScore): void {
        const gameEndedMessage: ICommonGameEnding = {
            winner: winner,
            time: Date.now() - (game.start_time as Date).valueOf(),
        };
        const message: ICommonSocketMessage = {
            data: gameEndedMessage,
            timestamp: new Date(),
        };
        game.players.forEach((player: string) => {
            this.socketHandler.sendMessage(Event.GameEnded, message, player);
            this.activePlayers.delete(player);
        });

        if (score.is_top_score) {
            this.newBestScore(score);
        }

    }

    private gameClick(message: ICommonSocketMessage, clickedPlayer: string): void {
        const gameManager: GameManager | undefined = this.activePlayers.get(clickedPlayer);
        if (gameManager === undefined) {
            throw new NotFoundException(_e(R.ERROR_INVALIDID, [clickedPlayer]));
        }
        gameManager.playerClick(message.data,
                                (data: Object | null) => {
                                    this.differenceFound(gameManager, clickedPlayer, data as Object);
        },                      () => {
                                    this.invalidClick(gameManager, clickedPlayer);
        });
    }

    private differenceFound(gameManager: GameManager, clickedPlayer: string, reveal: Object): void {
        gameManager.game.players.forEach((player: string) => {
                const differenceFound: ICommonDifferenceFound = {
                    player: clickedPlayer,
                    difference_count: gameManager.game.differences_found,
                    reveal: reveal,
                };
                const response: ICommonSocketMessage = {
                    data: differenceFound,
                    timestamp: new Date(),
                };
                this.socketHandler.sendMessage(Event.DifferenceFound, response, player);
        });
    }

    private invalidClick(gameManager: GameManager, clickedPlayer: string): void {
        gameManager.game.players.forEach((player: string) => {
            const identificationError: ICommonIdentificationError = {
                player: clickedPlayer,
            };
            const response: ICommonSocketMessage = {
                data: identificationError,
                timestamp: new Date(),
            };
            this.socketHandler.sendMessage(Event.InvalidClick, response, player);
        });
    }

    private newBestScore(score: INewScore): void {
        const message: ICommonSocketMessage = {
            data: score,
            timestamp: new Date(),
        };
        this.socketHandler.broadcastMessage(Event.BestTime, message);
    }
}
