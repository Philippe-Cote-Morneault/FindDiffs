import { expect } from "chai";
import * as sinon from "sinon";
import { mockReq } from "sinon-express-mock";
import { GameType, POVType } from "../../../../common/model/gameCard";
import { INewScore, INewScoreDetails } from "../../../../common/model/score";
import { GameCard, IGameCard } from "../../model/schemas/gameCard";
import { _e, R } from "../../strings";
import { NoErrorThrownException } from "../../tests/noErrorThrownException";
import { ScoreService } from "./score.service";
import { ScoreGenerator } from "./scoreGenerator";

describe("ScoreService", () => {
    const scoreService: ScoreService = new ScoreService();
    describe("post()", () => {
        beforeEach(() => {
            sinon.stub(GameCard, "findById");
            sinon.stub(ScoreGenerator, "generateScore");
            sinon.stub(GameCard.prototype, "save");
        });
        afterEach(() => {
            (GameCard.findById as sinon.SinonStub).restore();
            (ScoreGenerator.generateScore as sinon.SinonStub).restore();
            (GameCard.prototype.save as sinon.SinonStub).restore();
        });
        it("Should throw a UNKOWN_ID error if the id of the gameCard is invalid", async () => {
            const req: Object = {};
            (GameCard.findById as sinon.SinonStub).rejects();

            // tslint:disable-next-line:no-any
            const mockRequest: any = mockReq(req);
            mockRequest.params.id = "notAValidId";
            try {
                await scoreService.post(mockRequest);
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(R.ERROR_UNKNOWN_ID);
            }
        });

        it("Should throw a UNKOWN_ID error if the id of the gameCard is invalid but database returns an invalid entry", async () => {
            const req: Object = {};

            (GameCard.findById as sinon.SinonStub).resolves(undefined);
            // tslint:disable-next-line:no-any
            const mockRequest: any = mockReq(req);
            mockRequest.params.id = "notAValidId";
            try {
                await scoreService.post(mockRequest);
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(R.ERROR_UNKNOWN_ID);
            }
        });
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
            // tslint:disable-next-line:no-any
            const generateScoreStub: sinon.SinonStub = sinon.stub(scoreService, "generateScore" as any);

            const result: string = await scoreService.post(mockRequest);
            expect(JSON.parse(result).title).to.equal(R.SUCCESS);
        });

        it("Should throw an error if no changes are detected in the post request", async () => {
            const req: Object = {
                body: {
                },
            };
            // tslint:disable-next-line:no-any
            const mockRequest: any = mockReq(req);
            mockRequest.params.id = "someRandomId";
            (GameCard.prototype.save as sinon.SinonStub).resolves();
            (GameCard.findById as sinon.SinonStub).resolves(new GameCard({
                pov: POVType.Free,
                title: "hello",
                resource_id: "1234abcd",
                best_time_solo: [],
                best_time_online: [],
                creation_date: new Date(),
            }));

            try {
                await scoreService.post(mockRequest);
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(R.ERROR_NO_CHANGES);
            }
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

        beforeEach((done: Mocha.Done) => {
            saveStub = sinon.stub(GameCard.prototype, "save");
            findByIdStub = sinon.stub(GameCard, "findById");
            verifyScoreStub = sinon.stub(scoreService, "verifyScore");
            // tslint:disable-next-line:no-any
            validateUpdateStub = sinon.stub(scoreService, "validateUpdate" as any);
            done();
        });
        afterEach((done: Mocha.Done) => {
            validateUpdateStub.restore();
            verifyScoreStub.restore();
            findByIdStub.restore();
            saveStub.restore();
            done();
        });
        it("Should return is_top_score = false if this is not a new top score", async () => {
            const req: Object = {};
            // tslint:disable-next-line:no-any
            const mockRequest: any = mockReq(req);

            saveStub.resolves();
            findByIdStub.resolves(gameCardInterface);
            verifyScoreStub.returns({is_top_score: false});

            const result: string = await scoreService.update(mockRequest);
            expect(JSON.parse(result).is_top_score).to.equal(false);
        });
        it("Should return is_top_score = true if this is a new top score online", async () => {
            const req: Object = {body: {
                type: GameType.Online,
            }};
            // tslint:disable-next-line:no-any
            const mockRequest: any = mockReq(req);

            saveStub.resolves();
            findByIdStub.resolves(gameCardInterface);
            verifyScoreStub.returns(score1);
            const result: string = await scoreService.update(mockRequest);
            expect(JSON.parse(result).is_top_score).to.equal(true);
        });
        it("Should return is_top_score = true if this is a new top score offline", async () => {
            const req: Object = {body: {
                type: GameType.Solo,
            }};
            // tslint:disable-next-line:no-any
            const mockRequest: any = mockReq(req);

            saveStub.resolves();
            findByIdStub.resolves(gameCardInterface);
            verifyScoreStub.returns(score1);
            const result: string = await scoreService.update(mockRequest);
            expect(JSON.parse(result).is_top_score).to.equal(true);
        });
        it("Should throw an UNKOWN_ID error if the id is not found", async () => {
            const req: Object = {};
            // tslint:disable-next-line:no-any
            const mockRequest: any = mockReq(req);

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
        it("Should return is_top_score: true when the score is a new top score", () => {
            const req: Object = {
                body: {
                    time: 25000,
                    type: GameType.Online,
                    username: "player1",
                },
            };
            // tslint:disable-next-line:no-any
            const mockRequest: any = mockReq(req);
            const result: INewScore = scoreService.verifyScore(mockRequest, gameCard);
            expect(result.is_top_score).to.equal(true);
        });
        it("Should return the right player username when he gets a new top score", async () => {
            const req: Object = {
                body: {
                    time: 25000,
                    type: GameType.Online,
                    username: "player1",
                },
            };
            // tslint:disable-next-line:no-any
            const mockRequest: any = mockReq(req);
            const result: INewScore = scoreService.verifyScore(mockRequest, gameCard);
            expect((result.details as INewScoreDetails).username).to.equal("player1");
        });
        it("Should return the right GameType when the player gets a new top score", async () => {
            const req: Object = {
                body: {
                    time: 25000,
                    type: GameType.Online,
                    username: "player1",
                },
            };
            // tslint:disable-next-line:no-any
            const mockRequest: any = mockReq(req);
            const result: INewScore = scoreService.verifyScore(mockRequest, gameCard);
            expect((result.details as INewScoreDetails).game_type).to.equal(GameType.Online);
        });
        it("Should return the gameCard title when the players gets a new top score", async () => {
            const req: Object = {
                body: {
                    time: 25000,
                    type: GameType.Online,
                    username: "player1",
                },
            };
            // tslint:disable-next-line:no-any
            const mockRequest: any = mockReq(req);
            const result: INewScore = scoreService.verifyScore(mockRequest, gameCard);
            expect((result.details as INewScoreDetails).game_name).to.equal(gameCard.title);
        });
        it("Should return the place 3 when the players is the 3rd best player", async () => {
            const req: Object = {
                body: {
                    time: 25000,
                    type: GameType.Online,
                    username: "player1",
                },
            };
            // tslint:disable-next-line:no-any
            const mockRequest: any = mockReq(req);
            const result: INewScore = scoreService.verifyScore(mockRequest, gameCard);
            // tslint:disable-next-line:no-magic-numbers
            expect((result.details as INewScoreDetails).place).to.equal(3);
        });
    });
    describe("validateUpdate()", () => {
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
        let findByIdStub: sinon.SinonStub;
        let saveStub: sinon.SinonStub;

        beforeEach((done: Mocha.Done) => {
            saveStub = sinon.stub(GameCard.prototype, "save");
            findByIdStub = sinon.stub(GameCard, "findById");
            done();
        });
        afterEach((done: Mocha.Done) => {
            findByIdStub.restore();
            saveStub.restore();
            done();
        });
        it("Should throw a UsernameMissing error when the request doesn't have a username", async () => {
            const req: Object = {};
            // tslint:disable-next-line:no-any
            const mockRequest: any = mockReq(req);
            mockRequest.params.id = "justARandomId";

            saveStub.resolves();
            findByIdStub.resolves(gameCardInterface);
            try {
            await scoreService.update(mockRequest);
            } catch (err) {
                expect(err.message).to.equal(_e(R.ERROR_MISSING_FIELD, [R.USERNAME_]));
            }
        });
        it("Should throw a TimeMissing error when the request doesn't have a time", async () => {
            const req: Object = {
                body: {
                    username: "player1",
                },
            };
            // tslint:disable-next-line:no-any
            const mockRequest: any = mockReq(req);
            mockRequest.params.id = "justARandomId";

            saveStub.resolves();
            findByIdStub.resolves(gameCardInterface);
            try {
            await scoreService.update(mockRequest);
            } catch (err) {
                expect(err.message).to.equal(_e(R.ERROR_MISSING_FIELD, [R.TIME_]));
            }
        });
        it("Should throw a NAN error if the time in the request is not a number", async () => {
            const req: Object = {
                body: {
                    username: "player1",
                    time: "hello",
                },
            };
            // tslint:disable-next-line:no-any
            const mockRequest: any = mockReq(req);
            mockRequest.params.id = "justARandomId";

            saveStub.resolves();
            findByIdStub.resolves(gameCardInterface);
            try {
            await scoreService.update(mockRequest);
            } catch (err) {
                expect(err.message).to.equal(_e(R.ERROR_N_A_N, [R.TIME_]));
            }
        });
        it("Should throw a LessThanZero error if the time in the request is less than 0", async () => {
            const req: Object = {
                body: {
                    username: "player1",
                    time: -5,
                },
            };
            // tslint:disable-next-line:no-any
            const mockRequest: any = mockReq(req);
            mockRequest.params.id = "justARandomId";

            saveStub.resolves();
            findByIdStub.resolves(gameCardInterface);
            try {
            await scoreService.update(mockRequest);
            } catch (err) {
                expect(err.message).to.equal(_e(R.ERROR_LESS_ZERO, [R.TIME_]));
            }
        });
        it("Should throw a WrongType error if the type enum passed is not valid", async () => {
            const req: Object = {
                body: {
                    username: "player1",
                    time: 5,
                    type: 14,
                },
            };
            // tslint:disable-next-line:no-any
            const mockRequest: any = mockReq(req);
            mockRequest.params.id = "justARandomId";

            saveStub.resolves();
            findByIdStub.resolves(gameCardInterface);
            try {
            await scoreService.update(mockRequest);
            } catch (err) {
                expect(err.message).to.equal(_e(R.ERROR_WRONG_TYPE, [R.GAME_TYPE_]));
            }
        });
    });
// tslint:disable-next-line:max-file-line-count
});
