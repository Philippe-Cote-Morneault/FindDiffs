import { expect } from "chai";
import { ICommonReveal } from "../../../../common/model/reveal";
import { Position } from "../../model/bitmap/pixel";
import { R } from "../../strings";
import { NoErrorThrownException } from "../../tests/noErrorThrownException";
import { RevealDifference } from "./revealDifference";

describe("RevealDifference", () => {
    describe("reveal()", () => {

        it("Should throw an error if the selected pixel is not black", () => {
            const posClicked: Position = new Position(0, 0);

            try {
                new RevealDifference([0], posClicked).reveal();
                throw new NoErrorThrownException();
            } catch (err) {
                expect(err.message).to.equal(R.ERROR_NO_DIFFERENCE_FOUND);
            }
        });

        it("Should return an ICommonReveal if the selected pixel is black", () => {
            const posClicked: Position = new Position(0, 0);

            const reveal: ICommonReveal = {
                hit: true,
                pixels_affected: [
                    {
                        x: 0,
                        y: 0,
                    },
                ],
                difference_id: 1,
            };

            const revealDifference: RevealDifference = new RevealDifference([1], posClicked);
            expect(revealDifference.reveal()).to.eql(reveal);
        });
    });
});
