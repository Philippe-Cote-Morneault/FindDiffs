import { expect } from "chai";
import { ICommonThematicObject, ThemeSurface } from "../../../../../../common/model/scene/objects/thematicObjects/thematicObject";
import { IPositionGridTheme } from "../../grid/theme/themeGrid";
import { ObjectFactory } from "../objectFactory";
import { ThemeObjectGenerator } from "./themeObjectGenerator";

describe("simpleObjectFactory", () => {
    describe("createObject()", () => {
        it("Should return an with the orientation facing various direction", () => {
            const NUMBER_DIRECTION_MIN: number = 5;
            const ITERATIONS: number = 50;
            const position: IPositionGridTheme = {
                surface: ThemeSurface.PARKING,
                x: 50,
                y: 45,
                z: 34,
            };
            const direction: Set<number> = new Set<number>();
            for (let i: number = 0; i < ITERATIONS; i++) {
                if (direction.size === NUMBER_DIRECTION_MIN) {
                    break;
                }
                direction.add(ThemeObjectGenerator.getInstance().createObject(position).orientation.yAngle);
            }
            expect(direction.size).to.equal(NUMBER_DIRECTION_MIN);
        });
        
    });
});
