import { expect } from "chai";
import { ColorUtils } from "./colorUtils";

describe("ColorUtils", () => {
    describe("generateRandomColor()", () => {
        it("Should generate a color between 0xffffff and 0x000000", () => {
            expect(ColorUtils.generateRandomColor()).to.be.gte(0).and.lte(ColorUtils.WHITE);
        });
    });
});
