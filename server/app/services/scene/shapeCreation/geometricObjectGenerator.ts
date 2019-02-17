import { CubeFactory } from "./cubeFactory";
import { GeometricObjectFactory } from "./geometricObjectFactory";
import { ICommonEulerAngles } from "../../../../../common/model/scene/eulerAngles";
import { ICommonGeometricObject } from "../../../../../common/model/scene/objects/geometricObjects/geometricObject";

export class GeometricObjectGenerator {
    private static instance: GeometricObjectGenerator;
    private geometricShapeFactories: GeometricObjectFactory[] = [];

    public constructor() {
        //
    }

    public static getInstance(): GeometricObjectGenerator {
        if (!GeometricObjectGenerator.instance) {
            GeometricObjectGenerator.instance = new GeometricObjectGenerator();
        }

        return GeometricObjectGenerator.instance;
    }

    public createObject(position: ICommonEulerAngles): ICommonGeometricObject {
        
    }

    private setFactories(): void {
        this.geometricShapeFactories.push(new CubeFactory());

    }
}
