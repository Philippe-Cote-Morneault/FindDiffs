import { expect } from "chai";
import { StringFormater } from "./stringFormater";
// tslint:disable no-magic-numbers

describe("String formater", () => {
    it("Should return a formated string with the number -1", () => {
        expect(StringFormater.secondsToMinutes(-1)).to.equal("00:00");
    });
    it("Should return a formated string with the number 0", () => {
        expect(StringFormater.secondsToMinutes(0)).to.equal("00:00");
    });

    it("Should return a formated string with the number 40", () => {
        expect(StringFormater.secondsToMinutes(40)).to.equal("00:40");
    });

    it("Should return a formated string with the number 60", () => {
        expect(StringFormater.secondsToMinutes(60)).to.equal("01:00");
    });

    it("Should return a formated string with the number 90", () => {
        expect(StringFormater.secondsToMinutes(90)).to.equal("01:30");
    });

    it("Should return a formated string with the number 120", () => {
        expect(StringFormater.secondsToMinutes(120)).to.equal("02:00");
    });
});
