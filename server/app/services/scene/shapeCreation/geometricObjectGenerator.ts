import { ICommon3DPosition } from "../../../../../common/model/positions";
import { ICommonGeometricObject } from "../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { RandomUtils } from "../../../utils/randomUtils";
import { ConeFactory } from "./coneFactory";
import { CubeFactory } from "./cubeFactory";
import { CylinderFactory } from "./cylinderFactory";
import { GeometricObjectFactory } from "./geometricObjectFactory";
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

    public createObject(position: ICommon3DPosition): ICommonGeometricObject {
        return this.chooseRandomFactory().createObject(position);
    }

    private setFactories(): void {
        this.geometricShapeFactories.push(new CubeFactory());
        this.geometricShapeFactories.push(new ConeFactory());
        this.geometricShapeFactories.push(new CylinderFactory());
        this.geometricShapeFactories.push(new PyramidFactory());
        this.geometricShapeFactories.push(new SphereFactory());
    }

    private chooseRandomFactory(): GeometricObjectFactory {
        const indexOfTransformation: number = RandomUtils.random(this.geometricShapeFactories.length);

        return this.geometricShapeFactories[indexOfTransformation];
    }

}
