export class GeometricObjectGenerator {
    private static instance: GeometricObjectGenerator;

    public constructor() {
        //
    }

    public static getInstance(): GeometricObjectGenerator {
        if (!GeometricObjectGenerator.instance) {
            GeometricObjectGenerator.instance = new GeometricObjectGenerator();
        }

        return GeometricObjectGenerator.instance;
    }
}
