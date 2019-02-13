import { GeometricShapes, ICommonPositionObjects} from "../../../../common/model/scene/sceneObject";

export class SceneGenerator {
    private readonly MIN_ELEMENTS: number = 10;
    private readonly MAX_ELEMENTS: number = 200;
    private readonly CUBE: number = 3;
    private readonly SQUARE: number = 2;
    public readonly sizeScene: number = 1000;
    public totalShapes: number = 0;

    private shapes: Map<GeometricShapes, number> = new Map<GeometricShapes, number>();

    public randomNumberElementsPerShape(): void {
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

    public modelPosition(): void {
        const TEN: number = 10;
        const POWER_HUNDRED: number = 3;
        const POWER_THOUSANDS: number = 6;
        const position: number = Math.round(Math.random() * Math.pow(this.sizeScene, this.CUBE));

        let z: number = position % this.sizeScene;
        const y: number = ((position % Math.pow(this.sizeScene, this.SQUARE)) - position % this.sizeScene) / Math.pow(TEN, POWER_HUNDRED);
        const x: number = ((position) - (position % Math.pow(this.sizeScene, this.SQUARE))) / Math.pow(TEN, POWER_THOUSANDS);

        if (position > this.sizeScene) {
            z -= 1;
        }

        const modelPosition: ICommonPositionObjects = {x: 0, y: 0, z: 0};
        modelPosition.x = x;
        modelPosition.y = y;
        modelPosition.z = z;
    }
}
