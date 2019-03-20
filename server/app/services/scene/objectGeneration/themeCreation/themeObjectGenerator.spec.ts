import { expect } from "chai";
import { ICommonThematicObject, ObjTheme, ThemeSurface } from "../../../../../../common/model/scene/objects/thematicObjects/thematicObject";
import { IPositionGridTheme } from "../../grid/theme/themeGrid";
import { ThemeObjectGenerator } from "./themeObjectGenerator";
describe("ThemeObjectGenerator", () => {
    describe("createObject()", () => {
        it("Should return a car when the position is on car", () => {
            const position: IPositionGridTheme = {
                surface: ThemeSurface.CAR,
                x: 50,
                y: 0,
                z: 50,
            };
            const object: ICommonThematicObject = ThemeObjectGenerator.getInstance().createObject(position);
            expect([ObjTheme.LEXUS, ObjTheme.ECLIPSE, ObjTheme.LAMBO]).to.include.members([object.objectType]);
        });
        it("Should return an object that goes on grass", () => {
            const position: IPositionGridTheme = {
                surface: ThemeSurface.GRASS,
                x: 50,
                y: 0,
                z: 50,
            };
            const object: ICommonThematicObject = ThemeObjectGenerator.getInstance().createObject(position);
            expect([ObjTheme.BIN,
                    ObjTheme.METER,
                    ObjTheme.LAMP,
                    ObjTheme.SIGN_FORBIDDEN,
                    ObjTheme.SIGN_SKIP,
                    ObjTheme.SIGN_STOP]).to.include.members([object.objectType]);
        });
        it("Should return an object that goes in parking", () => {
            const position: IPositionGridTheme = {
                surface: ThemeSurface.PARKING,
                x: 50,
                y: 0,
                z: 50,
            };
            const object: ICommonThematicObject = ThemeObjectGenerator.getInstance().createObject(position);
            expect([ObjTheme.BIN,
                    ObjTheme.CONE]).to.include.members([object.objectType]);
        });
    });
});
