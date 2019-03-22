import { expect } from "chai";
import { ICommonThematicObject, ThemeSurface } from "../../../../../../common/model/scene/objects/thematicObjects/thematicObject";
import { IPositionGridTheme } from "../../grid/theme/themeGrid";
import { ObjectFactory } from "../objectFactory";
import { ThemeObjectGenerator } from "./themeObjectGenerator";

describe("carFactory", () => {
    describe("createObject()", () => {
        it("Should create a car with the orientation facing north or south", () => {
            const NUMBER_DIRECTION: number = 2;
            const ITERATIONS: number = 50;
            const position: IPositionGridTheme = {
                surface: ThemeSurface.CAR,
                x: 50,
                y: 45,
                z: 34,
            };
            const direction: Set<number> = new Set<number>();
            for (let i: number = 0; i < ITERATIONS; i++) {
                if (direction.size === NUMBER_DIRECTION) {
                    break;
                }
                direction.add(ThemeObjectGenerator.getInstance().createObject(position).orientation.yAngle);
            }
            expect(direction.size).to.equal(NUMBER_DIRECTION);
            expect([0,
                    // tslint:disable-next-line:no-magic-numbers
                    ObjectFactory.MAX_RADIAN_ANGLE / 2]).to.include.members(Array.from(direction));
        });
        it("Should create a car that has a zero orientation on all axis but y", () => {
            const position: IPositionGridTheme = {
                surface: ThemeSurface.CAR,
                x: 50,
                y: 45,
                z: 35,
            };
            const object: ICommonThematicObject = ThemeObjectGenerator.getInstance().createObject(position);
            expect(object.orientation.xAngle).to.equal(0);
            expect(object.orientation.zAngle).to.equal(0);
        });
    });
});
