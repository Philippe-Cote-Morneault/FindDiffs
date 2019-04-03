import { expect } from "chai";
import * as http from "http";
import * as sinon from "sinon";
import * as socketIo from "socket.io";
import * as socketIoClient from "socket.io-client";
import { ICommonGame } from "../../../../common/communication/webSocket/game";
import { Event, ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";
import { INewScore } from "../../../../common/model/score";
import { Game } from "../../model/game/game";
import { SocketHandler } from "./../socket/socketHandler";
import { GameManager } from "./gameManager";
import { MatchmakingService } from "./matchmakingService";
import { SimplePOVGameManager } from "./simplePOVGameManager";

const game: ICommonGame = {
    ressource_id: "12345",
    game_card_id: "67890",
    pov: 0,
};

const newGame1v1: Game = {
    id: "1234567",
    ressource_id: "commonGame.ressource_id",
    players: ["player1", "player2"],
    start_time: undefined,
    game_card_id: "commonGame.game_card_id",
};

// tslint:disable-next-line:max-func-body-length
describe.only("SocketHandler", () => {
    let socketHandler: SocketHandler;
    let service: MatchmakingService;
    let clientSocket: SocketIOClient.Socket;
    // let socket1: socketIo.Socket;
    let server: http.Server;

    before((done: MochaDone) => {
        // tslint:disable:typedef
        const express = require("express");
        server = http.createServer(express);
        // tslint:disable-next-line:no-magic-numbers
        server.listen(3030);
        service = MatchmakingService.getInstance();
        socketHandler = SocketHandler.getInstance();
        socketHandler["io"] = socketIo(server);
        socketHandler["io"].on("connect", (socket: socketIo.Socket) => {
            // socket1 = socket;
            done();
        });
        clientSocket = socketIoClient.connect("http://localhost:3030");
    });

    after(() => {
        clientSocket.close();
        socketHandler["io"].close();
        server.close();
    });

    describe("getInstance()", () => {
        it("Should return an instance of MatchmakingService when getting an instance", () => {
            const instance: MatchmakingService = MatchmakingService.getInstance();
            expect(instance).to.be.an.instanceOf(MatchmakingService);
        });

        it("Should return the same MatchmakingService instance", () => {
            const instance1: MatchmakingService = MatchmakingService.getInstance();
            const instance2: MatchmakingService = MatchmakingService.getInstance();
            expect(instance1).to.equal(instance2);
        });
    });

    describe("matchPlayer()", () => {
        it("Should broadcast 3 messages to all sockets when 2 players are matched", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy<[string | symbol, ...any[]], boolean> = sinon.spy(socketHandler["io"].sockets, "emit");

            const message: ICommonSocketMessage = {
                data: game,
                timestamp: new Date(),
            };

            service.matchPlayers(message, "Player1");
            service.matchPlayers(message, "Player2");
            expect(spy.getCalls()[0].args[0]).to.equal(Event.MatchmakingChange);
            expect(spy.getCalls()[1].args[0]).to.equal(Event.EndMatchmaking);
            // tslint:disable-next-line:no-magic-numbers
            expect(spy.getCalls()[2].args[0]).to.equal(Event.EndMatchmaking);
            spy.restore();
        });

        it("Should broadcast a message to all sockets when one player enter a queue", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy<[string | symbol, ...any[]], boolean> = sinon.spy(socketHandler["io"].sockets, "emit");
            const message: ICommonSocketMessage = {
                data: game,
                timestamp: new Date(),
            };

            service.matchPlayers(message, "Player1");
            expect(spy.getCalls()[0].args[0]).to.equal(Event.MatchmakingChange);
            // tslint:disable-next-line:no-unused-expression
            expect(spy.calledOnce).to.be.true;
            spy.restore();
        });
    });

    describe("matchLoadingGame()", () => {
        it("Should emit 2 messages (gamestarted) to 2 matched player when the game is loaded by both", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy<[string | symbol, ...any[]], boolean> = sinon.spy(socketHandler["io"].sockets, "emit");
            // tslint:disable-next-line
            const endGameCallback: (game: Game, winner: string, score: INewScore) => void = (game: Game, winner: string, score: INewScore) => {};
            // tslint:disable-next-line:no-magic-numbers
            const gameManager: GameManager = new SimplePOVGameManager(newGame1v1, 4, endGameCallback);
            service.matchLoadingGame(gameManager, "players1");
            service.matchLoadingGame(gameManager, "players2");
            expect(spy.getCalls()[0].args[0]).to.equal(Event.GameStarted);
            expect(spy.getCalls()[1].args[0]).to.equal(Event.GameStarted);
            // tslint:disable-next-line:no-magic-numbers
            spy.restore();
        });

        it("Should not send a message to anyone if only 1 player has loaded the game", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy<[string | symbol, ...any[]], boolean> = sinon.spy(socketHandler["io"].sockets, "emit");
            // tslint:disable-next-line
            const endGameCallback: (game: Game, winner: string, score: INewScore) => void = (game: Game, winner: string, score: INewScore) => {};
            // tslint:disable-next-line:no-magic-numbers
            const gameManager: GameManager = new SimplePOVGameManager(newGame1v1, 4, endGameCallback);
            service.matchLoadingGame(gameManager, "players1");
            // tslint:disable-next-line:no-unused-expression
            expect(spy.calledOnce).to.be.false;
            spy.restore();
        });
    });
});
