import { expect } from "chai";
import * as sinon from "sinon";
import { mockReq } from "sinon-express-mock";
import { GameType, POVType } from "../../../../common/model/gameCard";
import { INewScore, INewScoreDetails } from "../../../../common/model/score";
import { GameCard, IGameCard } from "../../model/schemas/gameCard";
import { _e, R } from "../../strings";
import { ScoreService } from "./score.service";

// tslint:disable-next-line:max-func-body-length
describe("ScoreService", () => {
    const scoreService: ScoreService = new ScoreService();
    describe("post()", () => {
        it("Should throw a UNKOWN_ID error if the id of the gameCard is invalid", async () => {
            const req = {};
            const mockRequest = mockReq(req);
            mockRequest.params.id = "notAValidId";
            try {
                await scoreService.post(mockRequest);
            } catch(err) {
                expect(err.message).to.equal(R.ERROR_UNKNOWN_ID);
            }
        });
        it("Should return success if the score update worked", async () => {
            const req = {};
            const mockRequest = mockReq(req);
            mockRequest.params.id = "someRandomId";
            sinon.stub(GameCard, "findById");
            (GameCard.findById as sinon.SinonStub).resolves({
                pov: POVType.Free,
                title: "hello",
                resource_id: "1234abcd",
                best_time_solo: [],
                best_time_online: [],
                creation_date: new Date(),
            });
            const generateScoreStub = sinon.stub(scoreService, "generateScore" as any);

            const result = await scoreService.post(mockRequest);
            expect(JSON.parse(result).title).to.equal(R.SUCCESS);
            generateScoreStub.restore();
            (GameCard.findById as sinon.SinonStub).restore();
        });
    });
    describe("update()", () => {
        const gameCardInterface: IGameCard = new GameCard({
            pov: POVType.Free,
            title: "hello",
            resource_id: "1234abcd",
            best_time_solo: [
                {name: "thomas", score: 10},
                {name: "phil", score: 20},
                {name: "joe", score: 30},
            ],
            best_time_online: [
                {name: "thomas", score: 10},
                {name: "phil", score: 20},
                {name: "joe", score: 30},
            ],
            creation_date: new Date(),
        });
        let validateUpdateStub: sinon.SinonStub;
        let verifyScoreStub: sinon.SinonStub;
        let findByIdStub: sinon.SinonStub;
        let saveStub: sinon.SinonStub;

        const score1: INewScore = {
            is_top_score: true,
            details: {
                place: 3,
                game_name: "hello",
                username: "player1",
                game_type: GameType.Online,
            },
        };
        beforeEach((done: MochaDone) => {
            saveStub = sinon.stub(GameCard.prototype, "save");
            findByIdStub = sinon.stub(GameCard, "findById");
            verifyScoreStub = sinon.stub(scoreService, "verifyScore");
            validateUpdateStub = sinon.stub(scoreService, "validateUpdate" as any);
            done();
        });
        afterEach((done: MochaDone) => {
            validateUpdateStub.restore();
            verifyScoreStub.restore();
            findByIdStub.restore();
            saveStub.restore();
            done();
        });
        it("Should return is_top_score = false if this is not a new top score", async () => {
            const req = {};
            const mockRequest = mockReq(req);

            saveStub.resolves();
            findByIdStub.resolves(gameCardInterface);
            verifyScoreStub.returns({is_top_score: false});

            const result = await scoreService.update(mockRequest);
            expect(JSON.parse(result).is_top_score).to.equal(false);
        });
        it("Should return is_top_score = true if this is a new top score", async () => {
            const req = {};
            const mockRequest = mockReq(req);

            saveStub.resolves();
            findByIdStub.resolves(gameCardInterface);
            verifyScoreStub.returns(score1);
            const result = await scoreService.update(mockRequest);
            expect(JSON.parse(result).is_top_score).to.equal(true);
        });
        it("Should throw an UNKOWN_ID error if the id is not found", async () => {
            const req = {};
            const mockRequest = mockReq(req);

            saveStub.resolves();
            findByIdStub.resolves();
            verifyScoreStub.returns(score1);
            try {
            await scoreService.update(mockRequest);
            } catch (err) {
                expect(err.message).to.equal(R.ERROR_UNKNOWN_ID);
            }
        });
    });
    describe("verifyScore", () => {
        const gameCard: IGameCard = new GameCard({
            pov: POVType.Free,
            title: "hello",
            resource_id: "1234abcd",
            best_time_solo: [
                {name: "thomas", score: 10},
                {name: "phil", score: 20},
                {name: "joe", score: 30},
            ],
            best_time_online: [
                {name: "thomas", score: 10},
                {name: "phil", score: 20},
                {name: "joe", score: 30},
            ],
            creation_date: new Date(),
        });
        it("Should return is_top_score: true when the score is a new top score", async () => {
            const req = {
                body: {
                    time: 25000,
                    type: GameType.Online,
                    username: "player1",
                },
            };
            const mockRequest = mockReq(req);
            const result = await scoreService.verifyScore(mockRequest, gameCard);
            expect(result.is_top_score).to.equal(true);
        });
        it("Should return the right player username when he gets a new top score", async () => {
            const req = {
                body: {
                    time: 25000,
                    type: GameType.Online,
                    username: "player1",
                },
            };
            const mockRequest = mockReq(req);
            const result = await scoreService.verifyScore(mockRequest, gameCard);
            expect((result.details as INewScoreDetails).username).to.equal("player1");
        });
        it("Should return the right GameType when the player gets a new top score", async () => {
            const req = {
                body: {
                    time: 25000,
                    type: GameType.Online,
                    username: "player1",
                },
            };
            const mockRequest = mockReq(req);
            const result = await scoreService.verifyScore(mockRequest, gameCard);
            expect((result.details as INewScoreDetails).game_type).to.equal(GameType.Online);
        });
        it("Should return the gameCard title when the players gets a new top score", async () => {
            const req = {
                body: {
                    time: 25000,
                    type: GameType.Online,
                    username: "player1",
                },
            };
            const mockRequest = mockReq(req);
            const result = await scoreService.verifyScore(mockRequest, gameCard);
            expect((result.details as INewScoreDetails).game_name).to.equal(gameCard.title);
        });
        it("Should return the place 3 when the players is the 3rd best player", async () => {
            const req = {
                body: {
                    time: 25000,
                    type: GameType.Online,
                    username: "player1",
                },
            };
            const mockRequest = mockReq(req);
            const result = await scoreService.verifyScore(mockRequest, gameCard);
            expect((result.details as INewScoreDetails).place).to.equal(3);
        });
    });
});
