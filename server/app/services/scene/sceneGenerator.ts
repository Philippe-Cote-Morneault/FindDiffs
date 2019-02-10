import { GeometricShapes, ICommonSceneObject} from "../../../../common/model/scene/sceneObject";

export class SceneGenerator {
    private readonly MIN_ELEMENTS: number = 10;
    private readonly MAX_ELEMENTS: number = 200;

    private shapes: Map<GeometricShapes, number> = new Map<GeometricShapes, number>();

    public randomNumberElementsPerShape(): void {
        const shapesQuantity: number[] = new Array(GeometricShapes.NUMBER_ELEMENTS);
        for (let i: number = 0; i < GeometricShapes.NUMBER_ELEMENTS - 1; i++) {
            let numberOfShapes: number = 0;
            numberOfShapes = (Math.random() * this.MAX_ELEMENTS);
            shapesQuantity[i] = numberOfShapes;
        }

        const totalShapes: number = shapesQuantity.reduce((accumulator: number, pilot: number) => {
            return accumulator + pilot;
        },
                                                          0);
        if (totalShapes < this.MIN_ELEMENTS || totalShapes > this.MAX_ELEMENTS) {
            this.randomNumberElementsPerShape();
        }

        for (let i: number = 0; i < GeometricShapes.NUMBER_ELEMENTS; i++) {
            this.shapes.set(i, shapesQuantity[i]);
        }
    }
}
