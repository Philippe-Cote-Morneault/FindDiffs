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
        for (let i: number = 0; i < this.NUMBER_SHAPES_ENUM - 1; i++) {
            const numberShape: number = (this.shapes.get(i)) as number;
            if (numberShape) {
                for (let j: number = 0; j < numberShape; j++) {
                    // tslint:disable-next-line
                    let positionObject: { modelPosition: ICommon3DPosition, position: number } = this.sceneObjectPosition.modelPosition();
                    positionObject = this.waitUntilValidPosition(validPosition, positionObject);
                    validPosition[positionObject.position] = false;
                    this.addModel(i, sceneObjects, positionObject);
                }
            }
        }

        return sceneObjects;
    }

    public waitUntilValidPosition(validPosition: boolean[], positionObject:
                                                            { modelPosition: ICommon3DPosition; position: number; }):
                                                            { modelPosition: ICommon3DPosition; position: number } {
        while (validPosition[positionObject.position] === false) {
            positionObject = this.sceneObjectPosition.modelPosition();
        }

        return positionObject;
    }

    // tslint:disable-next-line
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
