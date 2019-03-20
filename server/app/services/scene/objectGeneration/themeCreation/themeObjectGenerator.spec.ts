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
    });
});
