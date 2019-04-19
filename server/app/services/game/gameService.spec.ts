import { expect } from "chai";
import { GameService } from "./gameService";
import { ICommonGame } from "../../../../common/communication/webSocket/game";
import { POVType } from "../../../../common/model/gameCard";
import { GameManager } from "./gameManager";
import * as sinon from "sinon";
import { INewScore } from "../../../../common/model/score";
import { Game } from "../../model/game/game";
import { FreePOVGameManager } from "./freePOVGameManager";

describe("GameService", () => {
    const gameService: GameService = GameService.getInstance();
    describe("getInstance()", () => {
        it("Should return a GameService instance", () => {
            const instance: GameService = GameService.getInstance();
            expect(instance).to.be.an.instanceOf(GameService);
        });

        it("Should return the same GameService instance", () => {
            const instance1: GameService = GameService.getInstance();
            const instance2: GameService = GameService.getInstance();
            expect(instance1).to.equal(instance2);
        });
    });

    describe("createGame()", () => {
        const commonGame: ICommonGame = {
            ressource_id: "1234abcd",
            game_card_id: "abcd1234",
            pov: POVType.Free,
        };

        it("Should add the newly created game to the activeGames array", () => {
            const initialArrayLength: number = gameService["activeGames"].length;
            gameService.createGame(["player1"], commonGame, GameManager.SOLO_WINNING_DIFFERENCES_COUNT);
            expect(gameService["activeGames"].length).to.equal(initialArrayLength + 1);
        });
    });

    describe("newBestScore()", () => {
        // tslint:disable-next-line:typedef
        const broadcastStub = sinon.stub(gameService["socketHandler"], "broadcastMessage");

        const score: INewScore = {
            is_top_score: false,
        };

        gameService["newBestScore"](score);

        expect(broadcastStub.calledOnce).to.equal(true);
        broadcastStub.restore();
    });

    describe("invalidClick()", () => {
        const player1: string = "player1";
        const player2: string = "player2";
        const game: Game = {
            id: "123fsd",
            ressource_id: "fdsr324r",
            players: [player1, player2],
            start_time: undefined,
            game_card_id: "13eref43",
        };
        const callback = (game: Game, winner: string, score: INewScore) => {};
        const gameManager: FreePOVGameManager = new FreePOVGameManager(game, GameManager.MULTIPLAYER_WINNING_DIFFERENCES_COUNT,
                                                                       callback);

        it("Should send a message to the socket twice if there are two players in a game", () => {
            const sendMessageStub = sinon.stub(gameService["socketHandler"], "sendMessage");
            gameService["invalidClick"](gameManager, player1);

            expect(sendMessageStub.calledTwice).to.equal(true);
            sendMessageStub.restore();
        });
    });

});
