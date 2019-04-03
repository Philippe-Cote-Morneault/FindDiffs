import { expect } from "chai";
import { GameManager } from "./gameManager";
import { FreePOVGameManager } from "./freePOVGameManager";
import { Game } from "../../model/game/game";
import { INewScore } from "../../../../common/model/score";
import * as sinon from "sinon";
import { ICommonReveal3D, DifferenceType } from "../../../../common/model/reveal";
import { ICommon3DObject } from "../../../../common/model/positions";
import { ObjectType } from "../../../../common/model/scene/scene";

describe("FreePOVGameManager", () => {
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
    describe("startGame()", () => {
        it("Should set the start time of the game to now when calling startGame()", () => {
            const startTimeLowerBound: Date = new Date();
            gameManager.startGame();
            const startTimeUpperBound: Date = new Date();
            // tslint:disable-next-line:no-unused-expression
            expect(gameManager.game.start_time as Date >= startTimeLowerBound
                && gameManager.game.start_time as Date <= startTimeUpperBound).to.be.true;
        });
    });

    describe("getAmountDifferencesFound()", () => {
        it("Should return 0 if the player has 0 differences found", () => {
            expect(gameManager.getAmountDifferencesFound(player1)).to.equal(0);
        });

        it("Should return 3 if the player has 3 differences found", () => {
            gameManager["differencesFound"].set(player1, ["asdsad", "dsa123", "dfa322"]);
            // tslint:disable-next-line:no-magic-numbers
            expect(gameManager.getAmountDifferencesFound(player1)).to.equal(3);
        });
    });

    describe("playerClick()", () => {
        it("Should call the success callback passed in parameter if this is a sucessful hit", async () => {
            const _3dObj: ICommon3DObject = {
                scenePairId: "234rs",
                originalObjectId: "24resfs",
                modifiedObjectId: "23rfdsf",
                gameType: ObjectType.Geometric,
            };
            const post3DClickStub = sinon.stub(gameManager["scenePositionService"], "post3DClick");
            const reveal: ICommonReveal3D = {
                hit: true,
                differenceType: DifferenceType.addedObject,
                difference_id: "abc123",
            };

            // tslint:disable-next-line:no-empty
            const successCallback = (data: Object | null) => {};
            // tslint:disable-next-line:no-empty
            const failureCallback = () => {};

            post3DClickStub.returns(Promise.resolve<ICommonReveal3D>(reveal));
            // tslint:disable-next-line:no-any
            const successCallbackSpy: sinon.SinonSpy<any[], any> = sinon.spy(successCallback);
            gameManager.playerClick(_3dObj, player2, successCallback, failureCallback)
                .then(() => {
                    post3DClickStub.restore();
                    expect(successCallbackSpy.called).to.equal(true);
                });
        });

        it("Should not call the failure callback passed in parameter if this is a sucessful hit", async () => {
            const _3dObj: ICommon3DObject = {
                scenePairId: "234rs",
                originalObjectId: "24resfs",
                modifiedObjectId: "23rfdsf",
                gameType: ObjectType.Geometric,
            };
            const post3DClickStub = sinon.stub(gameManager["scenePositionService"], "post3DClick");
            const reveal: ICommonReveal3D = {
                hit: true,
                differenceType: DifferenceType.addedObject,
                difference_id: "abc123",
            };

            const successCallback = (data: Object | null) => {};
            const failureCallback = () => {};

            post3DClickStub.returns(Promise.resolve<ICommonReveal3D>(reveal));
            // tslint:disable-next-line:no-any
            const failureCallbackSpy: sinon.SinonSpy<any[], any> = sinon.spy(failureCallback);
            gameManager.playerClick(_3dObj, player2, successCallback, failureCallback)
            .then(() => {
                post3DClickStub.restore();
                expect(failureCallbackSpy.calledOnce).to.equal(false);
            });

            // tslint:disable-next-line:no-unused-expression
            
        });
    });
});
