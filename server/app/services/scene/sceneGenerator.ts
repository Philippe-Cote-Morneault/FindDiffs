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

        const CUBE: number = 3;
        const sceneObjects: ICommonSceneObject[] = new Array(this.totalShapes);
        const validPosition: boolean[] = new Array(Math.pow(this.sceneObjectPosition.sizeScene, CUBE));
        validPosition.fill(true);
        let validPosition2: boolean[][][] = this.initializeArray(this.sceneObjectPosition.sizeScene);
        for (let i: number = 0; i < this.NUMBER_SHAPES_ENUM - 1; i++) {
            const numberShape: number = (this.shapes.get(i)) as number;
            if (numberShape) {
                for (let j: number = 0; j < numberShape; j++) {
                    // tslint:disable-next-line
                    let positionObject: { modelPosition: ICommon3DPosition, position: number } = this.sceneObjectPosition.modelPosition();
                    positionObject = this.waitUntilValidPosition(validPosition2, validPosition, positionObject);
                    validPosition[positionObject.position] = false;
                    validPosition2 = this.updateArray(validPosition2, positionObject);
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
                    array[i][j][k] = false;
                }
            }
        }

        return array;
    }

    public waitUntilValidPosition(validPosition2: boolean[][][], validPosition: boolean[], positionObject:
                                                            { modelPosition: ICommon3DPosition; position: number; }):
                                                            { modelPosition: ICommon3DPosition; position: number } {
        while (validPosition[positionObject.position] === false) {
            positionObject = this.sceneObjectPosition.modelPosition();
        }

        // tslint:disable
        while (validPosition2[positionObject.modelPosition.x][positionObject.modelPosition.y][positionObject.modelPosition.z] === false &&

            validPosition2[positionObject.modelPosition.x + 1][positionObject.modelPosition.y][positionObject.modelPosition.z] === false &&
            validPosition2[positionObject.modelPosition.x - 1][positionObject.modelPosition.y][positionObject.modelPosition.z] === false &&


            validPosition2[positionObject.modelPosition.x][positionObject.modelPosition.y + 1][positionObject.modelPosition.z] === false &&
            validPosition2[positionObject.modelPosition.x][positionObject.modelPosition.y - 1][positionObject.modelPosition.z] === false &&

            validPosition2[positionObject.modelPosition.x][positionObject.modelPosition.y][positionObject.modelPosition.z + 1] === false &&
            validPosition2[positionObject.modelPosition.x][positionObject.modelPosition.y][positionObject.modelPosition.z - 1] === false &&

            validPosition2[positionObject.modelPosition.x + 1][positionObject.modelPosition.y + 1][positionObject.modelPosition.z] === false &&
            validPosition2[positionObject.modelPosition.x + 1][positionObject.modelPosition.y - 1][positionObject.modelPosition.z] === false &&
            validPosition2[positionObject.modelPosition.x - 1][positionObject.modelPosition.y + 1][positionObject.modelPosition.z] === false &&
            validPosition2[positionObject.modelPosition.x - 1][positionObject.modelPosition.y - 1][positionObject.modelPosition.z] === false &&

            validPosition2[positionObject.modelPosition.x + 1][positionObject.modelPosition.y][positionObject.modelPosition.z + 1] === false &&
            validPosition2[positionObject.modelPosition.x + 1][positionObject.modelPosition.y][positionObject.modelPosition.z - 1] === false &&
            validPosition2[positionObject.modelPosition.x - 1][positionObject.modelPosition.y][positionObject.modelPosition.z + 1] === false &&
            validPosition2[positionObject.modelPosition.x - 1][positionObject.modelPosition.y][positionObject.modelPosition.z - 1] === false &&
            
            validPosition2[positionObject.modelPosition.x][positionObject.modelPosition.y + 1][positionObject.modelPosition.z + 1] === false &&
            validPosition2[positionObject.modelPosition.x][positionObject.modelPosition.y + 1][positionObject.modelPosition.z - 1] === false &&
            validPosition2[positionObject.modelPosition.x][positionObject.modelPosition.y - 1][positionObject.modelPosition.z + 1] === false &&
            validPosition2[positionObject.modelPosition.x][positionObject.modelPosition.y - 1][positionObject.modelPosition.z - 1] === false &&

            validPosition2[positionObject.modelPosition.x + 1][positionObject.modelPosition.y + 1][positionObject.modelPosition.z + 1] === false &&
            validPosition2[positionObject.modelPosition.x + 1][positionObject.modelPosition.y + 1][positionObject.modelPosition.z - 1] === false &&
            validPosition2[positionObject.modelPosition.x + 1][positionObject.modelPosition.y - 1][positionObject.modelPosition.z + 1] === false &&
            validPosition2[positionObject.modelPosition.x + 1][positionObject.modelPosition.y - 1][positionObject.modelPosition.z - 1] === false &&
    
            validPosition2[positionObject.modelPosition.x - 1][positionObject.modelPosition.y + 1][positionObject.modelPosition.z + 1] ===false &&
            validPosition2[positionObject.modelPosition.x - 1][positionObject.modelPosition.y + 1][positionObject.modelPosition.z - 1] === false &&
            validPosition2[positionObject.modelPosition.x - 1][positionObject.modelPosition.y - 1][positionObject.modelPosition.z + 1] === false &&
            validPosition2[positionObject.modelPosition.x - 1][positionObject.modelPosition.y - 1][positionObject.modelPosition.z - 1] === false) {
                positionObject = this.sceneObjectPosition.modelPosition();
        }


        return positionObject;
    }

    public updateArray(validPosition2: boolean[][][], positionObject:
        { modelPosition: ICommon3DPosition; position: number; }): boolean[][][] {
            const SIX: number = 6;
            for (let i: number = positionObject.modelPosition.x; i < SIX; ++i) {
                for (let j: number = positionObject.modelPosition.y; j < SIX; ++j) {
                    for (let k: number = positionObject.modelPosition.z; k < SIX; ++k) {
                        validPosition2[i + ((SIX % i) * -1)][j + ((SIX % j) * -1)][k + ((SIX % k) * -1)] = false;
                    }
                }
            }

            return validPosition2;
    }

    public addModel(type: number, sceneObjects: ICommonSceneObject[], positionObject:
                    { modelPosition: ICommon3DPosition; position: number; }): void {
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

    public addObj(dimensions: number[], typeObj: GeometricShape, sceneObjects: ICommonSceneObject[], positionObject:
                   { modelPosition: ICommon3DPosition; position: number; }): void {
        sceneObjects.push({
            id: uuid(),
            color: ColorUtils.generateColor(),
            dimensions: dimensions,
            type: typeObj,
            position: positionObject.modelPosition,
            texture: 0,
        });
    }
}
