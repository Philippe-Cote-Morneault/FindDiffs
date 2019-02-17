import { CubeFactory } from "./cubeFactory";
import { GeometricObjectFactory } from "./geometricObjectFactory";

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

    private setFactories(): void {
        this.geometricShapeFactories.push(new CubeFactory());

    }
}
