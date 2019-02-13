import { GeometricShapes } from "../../../../common/model/scene/sceneObject";
import { SceneObjectPosition } from "./sceneObjectPosition";

export class SceneGenerator {
    private readonly MIN_ELEMENTS: number = 10;
    private readonly MAX_ELEMENTS: number = 200;
    public totalShapes: number = 0;

    private shapes: Map<GeometricShapes, number> = new Map<GeometricShapes, number>();

    public constructor(private sceneObjectPosition: SceneObjectPosition) { }
    public numberElementsPerShapeGenerator(): void {
        const shapesQuantity: number[] = new Array(GeometricShapes.NUMBER_ELEMENTS);
        do {
            this.totalShapes = 0;
            for (let i: number = 0; i < GeometricShapes.NUMBER_ELEMENTS - 1; i++) {
                let numberOfShapes: number = 0;
                numberOfShapes = Math.round((Math.random() * this.MAX_ELEMENTS));
                shapesQuantity[i] = numberOfShapes;
            }
            this.totalShapes = shapesQuantity.reduce((accumulator: number, value: number) => {
                return accumulator + value;
            },
                                                     0);
        }
        while (this.totalShapes < this.MIN_ELEMENTS || this.totalShapes > this.MAX_ELEMENTS);

        for (let i: number = 0; i < GeometricShapes.NUMBER_ELEMENTS - 1; i++) {
            this.shapes.set(i, shapesQuantity[i]);
        }
    }
}
