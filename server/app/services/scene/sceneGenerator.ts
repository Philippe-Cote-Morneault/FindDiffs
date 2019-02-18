import { v4 as uuid } from "uuid";
import { ICommon3DPosition } from "../../../../common/model/positions";
import { GeometricShape, ICommonSceneObject } from "../../../../common/model/scene/sceneObject";
import { ColorUtils } from "../../utils/colorUtils";
import { EnumUtils } from "../../utils/enumUtils";
import { SceneObjectPosition } from "./sceneObjectPosition";

export class SceneGenerator {
    public totalShapes: number = 0;
    private readonly NUMBER_SHAPES_ENUM: number = EnumUtils.enumLength(GeometricShape);

    private shapes: Map<GeometricShape, number> = new Map<GeometricShape, number>();

    public constructor(private sceneObjectPosition: SceneObjectPosition, totalShapes: number) {
        this.totalShapes = totalShapes;
     }
    public numberElementsPerShapeGenerator(): void {
        const shapesQuantity: number[] = new Array(this.NUMBER_SHAPES_ENUM);
        shapesQuantity.fill(0);
        for (let i: number = 0; i < this.totalShapes; ++i) {
            shapesQuantity[Math.round(Math.random() * this.NUMBER_SHAPES_ENUM)] += 1;
        }

        for (let i: number = 0; i < this.NUMBER_SHAPES_ENUM - 1; i++) {
            this.shapes.set(i, shapesQuantity[i]);
        }
    }

    public generateScene(): ICommonSceneObject[] {
        this.numberElementsPerShapeGenerator();

        const sceneObjects: ICommonSceneObject[] = new Array(this.totalShapes);
        let validPositions: boolean[][][] = this.initializeArray(this.sceneObjectPosition.sizeScene);
        for (let i: number = 0; i < this.NUMBER_SHAPES_ENUM - 1; i++) {
            const numberShape: number = (this.shapes.get(i)) as number;
            if (numberShape) {
                for (let j: number = 0; j < numberShape; j++) {
                    // tslint:disable-next-line
                    let positionObject: ICommon3DPosition = this.sceneObjectPosition.modelPosition();
                    positionObject = this.waitUntilValidPosition(validPositions, positionObject);
                    validPositions = this.updateArray(validPositions, positionObject);
                    this.addModel(i, sceneObjects, positionObject);
                }
            }
        }

        return sceneObjects;
    }

    public initializeArray(sizeScene: number): boolean[][][] {
        const array: boolean[][][] = [];

        for (let i: number = 0; i < sizeScene; ++i) {
            array[i] = [];
        }

        for (let i: number = 0; i < sizeScene; ++i) {
            for (let j: number = 0; j < sizeScene; ++j) {
                array[i][j] = [];
            }
        }

        for (let i: number = 0; i < sizeScene; ++i) {
            for (let j: number = 0; j < sizeScene; ++j) {
                for (let k: number = 0; k < sizeScene; ++k) {
                    array[i][j][k] = true;
                }
            }
        }

        return array;
    }

    public waitUntilValidPosition(validPositions: boolean[][][], positionObject: ICommon3DPosition): ICommon3DPosition {
        while (!this.allFree(validPositions, positionObject)) {
            positionObject = this.sceneObjectPosition.modelPosition();
        }

        return positionObject;
    }

    private allFree(validPosition: boolean[][][], positionObject: ICommon3DPosition): boolean {
        const TWO: number = 2;
        const x: number = positionObject.x;
        const y: number = positionObject.y;
        const z: number = positionObject.z;
        let areAllFree: boolean = true;

        for (let i: number = -1; i < TWO; ++i) {
            for (let j: number = -1; j < TWO; ++j) {
                for (let k: number = -1; k < TWO; ++k) {
                    if (!validPosition[x + i][y + j][z + k]) {
                        areAllFree = false;
                        break;
                    }
                }
            }
        }

        return areAllFree;
    }

    private updateArray(validPositions: boolean[][][], positionObject: ICommon3DPosition): boolean[][][] {
            const TWO: number = 2;
            const x: number = positionObject.x;
            const y: number = positionObject.y;
            const z: number = positionObject.z;

            for (let i: number = -1; i < TWO; ++i) {
                for (let j: number = -1; j < TWO; ++j) {
                    for (let k: number = -1; k < TWO; ++k) {
                        validPositions[x + i][y + j][z + k] = false;
                    }
                }
            }

            return validPositions;
    }

    public addModel(type: number, sceneObjects: ICommonSceneObject[], positionObject: ICommon3DPosition): void {
        let dimensions: number[];
        const MIN_SIZE_FACTOR: number = 0.5;
        const factor: number = Math.random() + MIN_SIZE_FACTOR;
        switch (type) {
            case GeometricShape.CONE:
                dimensions = [factor, factor, factor];
                this.addObj(dimensions, GeometricShape.CONE, sceneObjects, positionObject);
                break;
            case GeometricShape.CUBE:
                dimensions = [factor, factor, factor];
                this.addObj(dimensions, GeometricShape.CUBE, sceneObjects, positionObject);
                break;
            case GeometricShape.CYLINDER:
                dimensions = [factor, factor, factor, factor];
                this.addObj(dimensions, GeometricShape.CYLINDER, sceneObjects, positionObject);
                break;
            case GeometricShape.SPHERE:
                dimensions = [factor, factor, factor];
                this.addObj(dimensions, GeometricShape.SPHERE, sceneObjects, positionObject);
                break;
            case GeometricShape.SQUARED_BASE_PYRAMID:
                dimensions = [factor, factor];
                this.addObj(dimensions, GeometricShape.SQUARED_BASE_PYRAMID, sceneObjects, positionObject);
                break;
            default: break;
        }
    }

    public addObj(dimensions: number[], typeObj: GeometricShape, sceneObjects: ICommonSceneObject[], positionObject: ICommon3DPosition):
    void {
        sceneObjects.push({
            id: uuid(),
            color: ColorUtils.generateColor(),
            dimensions: dimensions,
            type: typeObj,
            position: positionObject,
            texture: 0,
        });
    }
}
