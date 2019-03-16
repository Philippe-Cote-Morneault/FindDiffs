import { ICommonSceneObject } from "../../../../common/model/scene/objects/sceneObject";
import { ICommonThematicScene, ObjectType } from "../../../../common/model/scene/scene";
import { ISceneGenerator } from "./ISceneGenerator";
import { Grid } from "./grid/grid";
import { IPostionGridTheme, ThemeGrid } from "./grid/theme/themeGrid";
import { ThemeObjectGenerator } from "./objectGeneration/themeCreation/themeObjectGenerator";

export class SceneGeneratorTheme implements ISceneGenerator {
    private readonly SCENE_SIZE: number =  250;
    private readonly SCENE_HEIGHT: number = 125;
    private readonly SCENE_OBJECT_MARGIN: number = 9;

    private objectQty: number;
    private scene: ICommonThematicScene;
    private grid: Grid | undefined;

    public constructor(objectQty: number) {
        this.objectQty = objectQty;
        this.grid = undefined;
        this.scene = {
            dimensions: {
                x: this.SCENE_SIZE,
                y: this.SCENE_HEIGHT,
                z: this.SCENE_SIZE,
            },
            sceneObjects: new Array<ICommonSceneObject>(),
            type: ObjectType.Thematic,
            id: "",
            texture: "default",
        };
    }

    public getGrid(): Grid | undefined {
        return this.grid;
    }

    public generateScene(): ICommonThematicScene {
        this.grid = new ThemeGrid(this.scene.dimensions, this.SCENE_OBJECT_MARGIN);

        for (let i: number = 0; i < this.objectQty; i++) {
            const position: IPostionGridTheme = this.grid.getNextPosition() as IPostionGridTheme;
            this.scene.sceneObjects.push(ThemeObjectGenerator.getInstance().createObject(position));
        }

        return this.scene;
    }

}
