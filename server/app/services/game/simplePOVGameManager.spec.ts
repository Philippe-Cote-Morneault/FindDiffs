import { fail } from "assert";
import { expect } from "chai";
import * as sinon from "sinon";
import { ICommon2DPosition } from "../../../../common/model/positions";
import { ICommonReveal } from "../../../../common/model/reveal";
import { INewScore } from "../../../../common/model/score";
import { Game } from "../../model/game/game";
import { GameManager } from "./gameManager";
import { SimplePOVGameManager } from "./simplePOVGameManager";

describe("simplePOVGameManager", () => {
    const player1: string = "player1";
    const player2: string = "player2";
    const game: Game = {
        id: "123fsd",
        ressource_id: "fdsr324r",
        players: [player1, player2],
        start_time: undefined,
        game_card_id: "13eref43",
    };
    // tslint:disable:no-shadowed-variable
    // tslint:disable:no-empty
    const callback: (game: Game, winner: string, score: INewScore) => void = (game: Game, winner: string, score: INewScore) => {};
    const gameManager: SimplePOVGameManager = new SimplePOVGameManager(game, GameManager.MULTIPLAYER_WINNING_DIFFERENCES_COUNT,
                                                                       callback);
    describe("playerClick()", () => {
        it("Should call the success callback passed in parameter if this is a sucessful hit", async () => {
            const _2dPosition: ICommon2DPosition = {
                x: 100,
                y: 234,
            };
            const postPixelPositionStub: sinon.SinonStub<[string, number, number], Promise<ICommonReveal | null>> =
            sinon.stub(gameManager["pixelPositionService"], "postPixelPosition");
            const reveal: ICommonReveal = {
                hit: true,
                pixels_affected: [{x: 20, y: 23}],
                difference_id: 12312,
            };
            // tslint:disable-next-line:no-empty
           // const successCallback = (data: Object | null) => {};
            // tslint:disable-next-line:no-empty
            const failureCallback: () => void = () => {};

            // tslint:disable-next-line:no-any
            const successCallbackfake: sinon.SinonSpy<any[], any> = sinon.fake();
            postPixelPositionStub.resolves(reveal);
            // tslint:disable-next-line:no-any
            gameManager.playerClick(_2dPosition, player2, successCallbackfake, failureCallback)
                .then(() => {
                    postPixelPositionStub.restore();
                    expect(successCallbackfake.called).to.equal(true);
                },    () => {
                    fail("playerClick() failed to resolve");
                });
        });

        it("Should not call the failure callback passed in parameter if this is a sucessful hit", async () => {
            const _2dPosition: ICommon2DPosition = {
                x: 100,
                y: 234,
            };
            const postPixelPositionStub: sinon.SinonStub<[string, number, number], Promise<ICommonReveal | null>> =
            sinon.stub(gameManager["pixelPositionService"], "postPixelPosition");
            const reveal: ICommonReveal = {
                hit: true,
                pixels_affected: [{x: 20, y: 23}],
                difference_id: 12312,
            };

            const successCallback: (data: Object | null) => void = (data: Object | null) => {};
            const failureCallback: () => void = () => {};

            postPixelPositionStub.returns(Promise.resolve<ICommonReveal>(reveal));
            // tslint:disable-next-line:no-any
            const failureCallbackSpy: sinon.SinonSpy<any[], any> = sinon.spy(failureCallback);
            await gameManager.playerClick(_2dPosition, player2, successCallback, failureCallback)
            .then(() => {
                postPixelPositionStub.restore();
                expect(failureCallbackSpy.calledOnce).to.equal(false);
            });
        });
    });
});
