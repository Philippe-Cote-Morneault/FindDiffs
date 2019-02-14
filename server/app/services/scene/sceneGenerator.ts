import { ColorGenerator } from "../../../../common/model/colorGenerator";
import { GeometricShapes, ICommonPositionObjects, ICommonSceneObject } from "../../../../common/model/scene/sceneObject";
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

    public generateScene(): ICommonSceneObject[] {
        this.numberElementsPerShapeGenerator();

        const CUBE: number = 3;
        const sceneObjects: ICommonSceneObject[] = new Array(this.totalShapes);
        const validPosition: boolean[] = new Array(Math.pow(this.sceneObjectPosition.sizeScene, CUBE));
        validPosition.fill(true);
        for (let i: number = 0; i < GeometricShapes.NUMBER_ELEMENTS - 1; i++) {
            const numberShape: number = (this.shapes.get(i)) as number;
            if (numberShape) {
                for (let j: number = 0; j < numberShape; j++) {
                    // tslint:disable-next-line
                    let positionObject: { modelPosition: ICommonPositionObjects, position: number } = this.sceneObjectPosition.modelPosition();
                    positionObject = this.waitUntilValidPosition(validPosition, positionObject);
                    this.addModel(sceneObjects, positionObject);
                }
            }
        }

        return sceneObjects;
    }

    public waitUntilValidPosition(validPosition: boolean[], positionObject:
                                                            { modelPosition: ICommonPositionObjects; position: number; }):
                                                            { modelPosition: ICommonPositionObjects; position: number } {
        while (validPosition[positionObject.position] === false) {
            positionObject = this.sceneObjectPosition.modelPosition();
        }

        return positionObject;
    }

    public addModel(sceneObjects: ICommonSceneObject[], positionObject:
                    { modelPosition: ICommonPositionObjects; position: number; }): void {
        switch (+GeometricShapes) {
            case GeometricShapes.CONE:
                this.addObj3Params(GeometricShapes.CONE, sceneObjects, positionObject);
                break;
            case GeometricShapes.CUBE:
                this.addObj3Params(GeometricShapes.CUBE, sceneObjects, positionObject);
                break;
            case GeometricShapes.CYLINDER:
                this.addCylinder(GeometricShapes.CYLINDER, sceneObjects, positionObject);
                break;
                break;
            case GeometricShapes.SPHERE:
                this.addObj3Params(GeometricShapes.SPHERE, sceneObjects, positionObject);
                break;
            case GeometricShapes.SQUARED_BASE_PYRAMID:
                this.addPyramid(GeometricShapes.SQUARED_BASE_PYRAMID, sceneObjects, positionObject);
                break;
            default: break;
        }
    }

    public addObj3Params(typeObj: GeometricShapes, sceneObjects: ICommonSceneObject[], positionObject:
                   { modelPosition: ICommonPositionObjects; position: number; }): void {
        sceneObjects.push({
            id: "obj1",
            color: ColorGenerator.generateColor(),
            dimensions: [1, 1, 1],
            type: typeObj,
            position: positionObject.modelPosition,
            texture: 0,
        });
    }

    public addCylinder(typeObj: GeometricShapes, sceneObjects: ICommonSceneObject[], positionObject:
        { modelPosition: ICommonPositionObjects; position: number; }): void {
        sceneObjects.push({
            id: "obj1",
            color: ColorGenerator.generateColor(),
            dimensions: [1, 1, 1, 1],
            type: typeObj,
            position: positionObject.modelPosition,
            texture: 0,
        });
    }

    public addPyramid(typeObj: GeometricShapes, sceneObjects: ICommonSceneObject[], positionObject:
        { modelPosition: ICommonPositionObjects; position: number; }): void {
        sceneObjects.push({
            id: "obj1",
            color: ColorGenerator.generateColor(),
            dimensions: [1, 1],
            type: typeObj,
            position: positionObject.modelPosition,
            texture: 0,
        });
    }
}
