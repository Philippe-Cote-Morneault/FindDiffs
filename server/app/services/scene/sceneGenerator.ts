import { GeometricShapes, ICommonSceneObject} from "../../../../common/model/scene/sceneObject";

export class SceneGenerator {
    private readonly MIN_ELEMENTS: number = 10;
    private readonly MAX_ELEMENTS: number = 200;
    public readonly sizeScene: number = 200;

    private shapes: Map<GeometricShapes, number> = new Map<GeometricShapes, number>();

    public randomNumberElementsPerShape(): void {
        const shapesQuantity: number[] = new Array(GeometricShapes.NUMBER_ELEMENTS);
        let totalShapes: number = 0;
        do {
            totalShapes = 0;
            for (let i: number = 0; i < GeometricShapes.NUMBER_ELEMENTS - 1; i++) {
                let numberOfShapes: number = 0;
                numberOfShapes = Math.round((Math.random() * this.MAX_ELEMENTS));
                shapesQuantity[i] = numberOfShapes;
            }
            totalShapes = shapesQuantity.reduce((accumulator: number, value: number) => {
                return accumulator + value;
            },
                                                0);
        }
        while (totalShapes < this.MIN_ELEMENTS || totalShapes > this.MAX_ELEMENTS);

        for (let i: number = 0; i < GeometricShapes.NUMBER_ELEMENTS - 1; i++) {
            this.shapes.set(i, shapesQuantity[i]);
        }
    }
}
