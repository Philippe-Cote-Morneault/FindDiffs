import { expect } from "chai";
import { ICommonScoreEntry } from "../../../../common/model/gameCard";
import { ScoreUpdater } from "./scoreUpdater";

describe("ScoreUpdater", () => {
    it("Should return an the same array if the score is higher then 3rd place", () => {
        // tslint:disable:no-magic-numbers
        const entries: ICommonScoreEntry[] = [{name: "Michel", score: 10},
                                              {name: "Bob", score: 12},
                                              {name: "Simon", score: 14}];
        const newScore: ICommonScoreEntry = {name: "Sam", score: 16};
        const newEntries: ICommonScoreEntry[] = ScoreUpdater.updateScore(entries, newScore);
        expect(newEntries).to.equal(entries);
    });

    it("Should return an array with new first place and other users down-shifted", () => {
        const entries: ICommonScoreEntry[] = [{name: "Michel", score: 10},
                                              {name: "Bob", score: 12},
                                              {name: "Simon", score: 14}];

        const newScore: ICommonScoreEntry = {name: "Sam", score: 8};

        const expectedResponse: ICommonScoreEntry[] = [{name: "Sam", score: 8},
                                                       {name: "Michel", score: 10},
                                                       {name: "Bob", score: 12}];
        const newEntries: ICommonScoreEntry[] = ScoreUpdater.updateScore(entries, newScore);

        expect(newEntries[0].score).to.equal(expectedResponse[0].score);
        expect(newEntries[1].score).to.equal(expectedResponse[1].score);
        expect(newEntries[2].score).to.equal(expectedResponse[2].score);

    });

    it("Should return an array with new second place and other users down-shifted", () => {
        const entries: ICommonScoreEntry[] = [{name: "Michel", score: 10},
                                              {name: "Bob", score: 12},
                                              {name: "Simon", score: 14}];

        const newScore: ICommonScoreEntry = {name: "Sam", score: 11};

        const expectedResponse: ICommonScoreEntry[] = [{name: "Michel", score: 10},
                                                       {name: "Sam", score: 11},
                                                       {name: "Bob", score: 12}];
        const newEntries: ICommonScoreEntry[] = ScoreUpdater.updateScore(entries, newScore);
        expect(newEntries[0].score).to.equal(expectedResponse[0].score);
        expect(newEntries[1].score).to.equal(expectedResponse[1].score);
        expect(newEntries[2].score).to.equal(expectedResponse[2].score);
    });

    it("Should return an array with new third place and other users down-shifted", () => {
        const entries: ICommonScoreEntry[] = [{name: "Michel", score: 10},
                                              {name: "Bob", score: 12},
                                              {name: "Simon", score: 14}];

        const newScore: ICommonScoreEntry = {name: "Sam", score: 13};

        const expectedResponse: ICommonScoreEntry[] = [{name: "Michel", score: 10},
                                                       {name: "Bob", score: 12},
                                                       {name: "Sam", score: 13}];
        const newEntries: ICommonScoreEntry[] = ScoreUpdater.updateScore(entries, newScore);

        expect(newEntries[0].score).to.equal(expectedResponse[0].score);
        expect(newEntries[1].score).to.equal(expectedResponse[1].score);
        expect(newEntries[2].score).to.equal(expectedResponse[2].score);
    });

    it("Should return an array with new user second place", () => {
        const entries: ICommonScoreEntry[] = [{name: "Michel", score: 10},
                                              {name: "Bob", score: 12},
                                              {name: "Simon", score: 14}];
        const newScore: ICommonScoreEntry = {name: "Sam", score: 10};

        const expectedResponse: ICommonScoreEntry[] = [{name: "Michel", score: 10},
                                                       {name: "Sam", score: 10},
                                                       {name: "Bob", score: 12}];
        const newEntries: ICommonScoreEntry[] = ScoreUpdater.updateScore(entries, newScore);
        expect(newEntries[0].score).to.equal(expectedResponse[0].score);
        expect(newEntries[1].score).to.equal(expectedResponse[1].score);
        expect(newEntries[2].score).to.equal(expectedResponse[2].score);
    });
});
