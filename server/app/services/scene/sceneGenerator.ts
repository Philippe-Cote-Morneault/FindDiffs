import { ICommon3DPosition } from "../../../../common/model/positions";
import { ICommonSceneObject } from "../../../../common/model/scene/objects/sceneObject";
import { ICommonGeometricScene, ObjectType } from "../../../../common/model/scene/scene";
import { Grid } from "./grid";
import { RandomGrid } from "./randomGrid";
import { GeometricObjectGenerator } from "./shapeCreation/geometricObjectGenerator";
import { ColorUtils } from "../../utils/colorUtils";

export class SceneGenerator {
    private objectQty: number;
    private readonly SCENE_SIZE: number =  250;
    private readonly SCENE_OBJECT_MARGIN: number = 9;
    private scene: ICommonGeometricScene;
    private grid: Grid | undefined;

    public constructor(objectQty: number) {
        this.objectQty = objectQty;
        this.grid = undefined;
        this.scene = {
            dimensions: {
                x: this.SCENE_SIZE,
                y: this.SCENE_SIZE,
                z: this.SCENE_SIZE,
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
        this.grid = new RandomGrid(this.SCENE_SIZE, this.SCENE_SIZE, this.SCENE_OBJECT_MARGIN);
        for (let i: number = 0; i < this.objectQty; i++) {
            const position: ICommon3DPosition = this.grid.getNextPosition();
            this.scene.sceneObjects.push(GeometricObjectGenerator.getInstance().createObject(position));
        }

        return this.scene;
    }
}
