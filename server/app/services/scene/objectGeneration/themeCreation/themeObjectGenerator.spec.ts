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
        it("Should return an object that as the same position specified in the method", () => {
            const position: IPositionGridTheme = {
                surface: ThemeSurface.CAR,
                x: 50,
                y: 45,
                z: 34,
            };
            const object: ICommonThematicObject = ThemeObjectGenerator.getInstance().createObject(position);
            expect(object.position.x).to.equal(position.x);
            expect(object.position.y).to.equal(position.y);
            expect(object.position.z).to.equal(position.z);
        });
        it("Should return 3 different car", () => {
            const ITERATIONS: number = 1000;
            const NUMBER_OF_CARS: number = 3;
            const position: IPositionGridTheme = {
                surface: ThemeSurface.CAR,
                x: 50,
                y: 45,
                z: 34,
            };
            const cars: Set<ObjTheme> = new Set<ObjTheme>();
            for (let i: number = 0; i < ITERATIONS; i++) {
                if (cars.size === NUMBER_OF_CARS) {
                    break;
                }
                cars.add(ThemeObjectGenerator.getInstance().createObject(position).objectType);
            }
            expect(cars.size).to.equal(NUMBER_OF_CARS);
        });

        it("Should return 6 different grass objects", () => {
            const ITERATIONS: number = 1000;
            const NUMBER_OBJECTS: number = 6;
            const position: IPositionGridTheme = {
                surface: ThemeSurface.GRASS,
                x: 50,
                y: 45,
                z: 34,
            };
            const cars: Set<ObjTheme> = new Set<ObjTheme>();
            for (let i: number = 0; i < ITERATIONS; i++) {
                if (cars.size === NUMBER_OBJECTS) {
                    break;
                }
                cars.add(ThemeObjectGenerator.getInstance().createObject(position).objectType);
            }
            expect(cars.size).to.equal(NUMBER_OBJECTS);
        });
        it("Should return 2 different parking objects", () => {
            const ITERATIONS: number = 1000;
            const NUMBER_OBJECTS: number = 2;
            const position: IPositionGridTheme = {
                surface: ThemeSurface.PARKING,
                x: 50,
                y: 45,
                z: 34,
            };
            const cars: Set<ObjTheme> = new Set<ObjTheme>();
            for (let i: number = 0; i < ITERATIONS; i++) {
                if (cars.size === NUMBER_OBJECTS) {
                    break;
                }
                cars.add(ThemeObjectGenerator.getInstance().createObject(position).objectType);
            }
            expect(cars.size).to.equal(NUMBER_OBJECTS);
        });
        it("Should choose a random color or texture and have undefined", () => {
            const position: IPositionGridTheme = {
                surface: ThemeSurface.PARKING,
                x: 50,
                y: 40,
                z: 20,
            };
            const object: ICommonThematicObject = ThemeObjectGenerator.getInstance().createObject(position);
            if (object.isTextured) {
                expect(object.texture).to.not.equal(undefined);
            } else {
                expect(object.color).to.not.equal(undefined);
            }
        });
    });
});
