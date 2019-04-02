import * as axios from "axios";
import { expect } from "chai";
import * as sinon from "sinon";
import { GameType } from "../../../../common/model/gameCard";
import { INewScore } from "../../../../common/model/score";
import { Game } from "../../model/game/game";
import { ScoreUpdater } from "./scoreUpdater";

describe("GameService", () => {
    describe("getInstance()", () => {
        it("Should return a GameService instance", () => {
            const instance: ScoreUpdater = ScoreUpdater.getInstance();
            expect(instance).to.be.an.instanceOf(ScoreUpdater);
        });

        it("Should return the same GameService instance", () => {
            const instance1: ScoreUpdater = ScoreUpdater.getInstance();
            const instance2: ScoreUpdater = ScoreUpdater.getInstance();
            expect(instance1).to.equal(instance2);
        });
    });

    describe("updateScore()", () => {
        it("Should return the new score details", async() => {
            const mockGame: Game = {
                id: "game1",
                ressource_id: "1",
                players: ["player1", "player2"],
                start_time: new Date(),
                //amount_differences_found: 0,
                game_card_id: "1",
            };
            const time: number = 100;
            const expectedScore: INewScore = {is_top_score: true, details: {
                place: 1,
                game_name: "game1",
                username: "player1",
                game_type: GameType.Online,
            }};
            const response: axios.AxiosResponse = {data: expectedScore, status: 1, statusText: "good", headers: "", config: {}};
            const stub: sinon.SinonStub = sinon.stub(axios.default, "put").resolves(response);
            const instance: ScoreUpdater = ScoreUpdater.getInstance();
            const newScore: INewScore | null = await instance.updateScore(mockGame, time, GameType.Online);
            expect(newScore).not.to.equal(null);
            if (newScore) {
                expect(newScore).to.equal(expectedScore);
            }
            stub.restore();
        });
    });
});
