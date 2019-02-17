import { CubeFactory } from "./cubeFactory";
import { GeometricObjectFactory } from "./geometricObjectFactory";
import { ICommonEulerAngles } from "../../../../../common/model/scene/eulerAngles";
import { ICommonGeometricObject } from "../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ConeFactory } from "./coneFactory";
import { CylinderFactory } from "./cylinderFactory";
import { PyramidFactory } from "./pyramidFactory";
import { SphereFactory } from "./sphereFactory";

export class GeometricObjectGenerator {
    private static instance: GeometricObjectGenerator;
    private geometricShapeFactories: GeometricObjectFactory[] = [];

    public constructor() {
        this.setFactories();
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
        this.geometricShapeFactories.push(new ConeFactory());
        this.geometricShapeFactories.push(new CylinderFactory());
        this.geometricShapeFactories.push(new PyramidFactory());
        this.geometricShapeFactories.push(new SphereFactory());
    }
}
