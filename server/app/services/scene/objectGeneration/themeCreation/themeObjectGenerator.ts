import { ObjectProperties } from "../../../../../../common/model/scene/objects/thematicObjects/objectProperties";
import { ICommonThematicObject, ThemeSurface } from "../../../../../../common/model/scene/objects/thematicObjects/thematicObject";
import { RandomUtils } from "../../../../utils/randomUtils";
import { IPostionGridTheme } from "../../grid/theme/themeGrid";
import { IObjectGenerator } from "../IObjectGenerator";
import { CarFactory } from "./carFactory";
import { SimpleObjectFactory } from "./simpleObjectFactory";
import { ThemeObjectFactory } from "./themeObjectFactory";

interface ObjectListSurface {
    grass: ThemeObjectFactory[];
    car: ThemeObjectFactory[];
    parking: ThemeObjectFactory[];
}
export class ThemeObjectGenerator implements IObjectGenerator {
    private static instance: ThemeObjectGenerator;
    private objectsFactory: ObjectListSurface;

    public constructor() {
        this.objectsFactory = {
            grass: new Array<ThemeObjectFactory>(),
            car: new Array<ThemeObjectFactory>(),
            parking: new Array<ThemeObjectFactory>(),
        };

        Object.keys(ObjectProperties).forEach((name: string) => {
            const surfaces: ThemeSurface[] = ObjectProperties[name].spawnSurface;
            surfaces.forEach((surface: ThemeSurface) => {

                if (surface === ThemeSurface.CAR) {
                    this.objectsFactory.car.push(new CarFactory(name));
                } else if (surface === ThemeSurface.GRASS) {
                    this.objectsFactory.grass.push(new SimpleObjectFactory(name));
                } else {
                    this.objectsFactory.parking.push(new SimpleObjectFactory(name));
                }

            });
        });
    }

    public static getInstance(): ThemeObjectGenerator {
        if (!this.instance) {
            this.instance = new ThemeObjectGenerator();
        }

        return this.instance;
    }

    private chooseFactory(factories: ThemeObjectFactory[]): ThemeObjectFactory {
        return factories[RandomUtils.inRangeInt(0, factories.length - 1)];
    }
    public createObject(position: IPostionGridTheme): ICommonThematicObject {
        let objectFactory: ThemeObjectFactory;
        // tslint:disable-next-line:switch-default
        switch (position.surface) {
            case ThemeSurface.CAR:
            objectFactory = this.chooseFactory(this.objectsFactory.car);
            break;

            case ThemeSurface.GRASS:
            objectFactory = this.chooseFactory(this.objectsFactory.grass);
            break;

            case ThemeSurface.PARKING:
            objectFactory = this.chooseFactory(this.objectsFactory.parking);
            break;

            default:
            objectFactory = this.chooseFactory(this.objectsFactory.parking);
        }

        return objectFactory.createObject(position) as ICommonThematicObject;
    }
}
