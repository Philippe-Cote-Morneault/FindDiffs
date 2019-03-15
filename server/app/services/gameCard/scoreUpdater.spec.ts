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
        const newEntries: ICommonScoreEntry[] = ScoreUpdater.updateScore(entries, newScore);
        console.log(newEntries[0]);
        console.log(newScore);
        expect(newEntries[0]).to.equal(newScore);
        expect(newEntries[1]).to.equal(entries[0]);
        expect(newEntries[2]).to.equal(entries[1]);
    });