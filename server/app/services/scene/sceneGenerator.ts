import { ICommon3DPosition } from "../../../../common/model/positions";
import { ICommonSceneObject } from "../../../../common/model/scene/objects/sceneObject";
import { ICommonGeometricScene, ObjectType } from "../../../../common/model/scene/scene";
import { ColorUtils } from "../../utils/colorUtils";
import { Grid } from "./grid/grid";
import { RandomGrid } from "./grid/randomGrid";
import { GeometricObjectGenerator } from "./shapeCreation/geometricObjectGenerator";

export class SceneGenerator {
    private static readonly SCENE_SIZE: number =  250;
    private static readonly SCENE_HEIGHT: number = 125;
    private static readonly SCENE_OBJECT_MARGIN: number = 9;

    private objectQty: number;
    private scene: ICommonGeometricScene;
    private grid: Grid | undefined;

    public constructor(objectQty: number) {
        this.objectQty = objectQty;
        this.grid = undefined;
        this.scene = {
            dimensions: {
                x: SceneGenerator.SCENE_SIZE,
                y: SceneGenerator.SCENE_HEIGHT,
                z: SceneGenerator.SCENE_SIZE,
            },
            sceneObjects: new Array<ICommonSceneObject>(),
            type: ObjectType.Geometric,
            id: "",
            bg_color: ColorUtils.generateRandomColor(),
        };
    }

    public getGrid(): Grid | undefined {
        return this.grid;
    }

    public generateScene(): ICommonGeometricScene {
        this.grid = new RandomGrid(this.scene.dimensions, SceneGenerator.SCENE_OBJECT_MARGIN);
        for (let i: number = 0; i < this.objectQty; i++) {
            const position: ICommon3DPosition = this.grid.getNextPosition();
            this.scene.sceneObjects.push(GeometricObjectGenerator.getInstance().createObject(position));
        }

        return this.scene;
    }
}
