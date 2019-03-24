import { expect } from "chai";
import { ICommonThematicObject, ObjTheme, ThemeSurface } from "../../../../../../common/model/scene/objects/thematicObjects/thematicObject";
import { IPositionGridTheme } from "../../grid/theme/themeGrid";
import { ThemeObjectGenerator } from "./themeObjectGenerator";
describe("ThemeObjectGenerator", () => {
    describe("createObject()", () => {
        it("Should create a car when the position is on a surface that allows car", () => {
            const position: IPositionGridTheme = {
                surface: ThemeSurface.CAR,
                x: 50,
                y: 0,
                z: 50,
            };
            const object: ICommonThematicObject = ThemeObjectGenerator.getInstance().createObject(position);
            expect([ObjTheme.LEXUS, ObjTheme.ECLIPSE, ObjTheme.LAMBO]).to.include.members([object.objectType]);
        });
        it("Should create an object that goes on grass when the position is on a grass surface", () => {
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
        it("Should create an object that goes in parking when the position is on a parking surface", () => {
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
        it("Should create an object that has the same position specified durring its creation", () => {
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
        it("Should create 3 different types of car, when creating a lot of cars", () => {
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

        it("Should create 6 different types of grass objects, when creating a lot of objects that goes on grass", () => {
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
        it("Should create 2 different types of parking objects, when creating a lot of objects in the parking", () => {
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
        it("Should choose a random color or texture for the created object. This color or texture must be defined", () => {
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
        it("Should choose a random color or texture for the created object. It should be diffrent after a few iterations", () => {
            const ITERATIONS: number = 10;
            const position: IPositionGridTheme = {
                surface: ThemeSurface.PARKING,
                x: 50,
                y: 30,
                z: 21,
            };
            const textures: Set<string> = new Set<string>();
            for (let i: number = 0; i < ITERATIONS; i++) {
                const object: ICommonThematicObject = ThemeObjectGenerator.getInstance().createObject(position);
                if (object.isTextured) {
                    textures.add(object.texture as string);
                } else {
                    textures.add(String(object.color));
                }
            }
            expect(textures.size).to.be.greaterThan(0);
        });
    });
});
