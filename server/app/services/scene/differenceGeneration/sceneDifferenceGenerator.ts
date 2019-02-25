import { v4 as uuid } from "uuid";
import { ICommonSceneModifications } from "../../../../../common/model/scene/modifications/sceneModifications";
import { SceneTransformation } from "../../../../../common/model/scene/modifications/sceneTransformation";
import { ICommonSceneObject } from "../../../../../common/model/scene/objects/sceneObject";
import { ICommonScene, ObjectType } from "../../../../../common/model/scene/scene";
import { RandomUtils } from "../../../utils/randomUtils";
import { Grid } from "../grid";
import { SceneObjectAdder } from "./transformations/sceneObjectAdder";
import { SceneObjectColorChanger } from "./transformations/sceneObjectColorChanger";
import { SceneObjectRemover } from "./transformations/sceneObjectRemover";
import { SceneObjectTextureChanger } from "./transformations/sceneObjectTextureChanger";

export class SceneDifferenceGenerator {
    private static readonly NUMBER_OF_DIFFERENCES: number = 7;

    private transformationsToApply: SceneTransformation[];
    private objectsToTransform: ICommonSceneObject[];

    private scene: ICommonScene;
    private grid: Grid;
    private sceneModif: ICommonSceneModifications;

    public constructor(originalScene: ICommonScene, grid: Grid) {
        this.transformationsToApply = new Array<SceneTransformation>();
        this.scene = originalScene;
        this.grid = grid;
    }
    public generateModifiedScene(insert: boolean, remove: boolean,
                                 changeColor: boolean): ICommonSceneModifications {

        // Deep copy the originalObjects array
        this.objectsToTransform = JSON.parse(JSON.stringify(this.scene.sceneObjects));
        this.setTransformationsToApply(insert, remove, changeColor);
        this.initializeModifications();

        for (let i: number = 0; i < SceneDifferenceGenerator.NUMBER_OF_DIFFERENCES; ++i) {
            this.applyRandomModification();
        }

        return this.sceneModif;
    }

    private applyRandomModification(): void {
        this.chooseRandomModification().applyTransformation(
            this.objectsToTransform,
            this.sceneModif,
        );
    }

    private setTransformationsToApply(insert: boolean, remove: boolean, changeColor: boolean ): void {
        if (insert) {
            this.transformationsToApply.push(new SceneObjectAdder(this.grid));
        }
        if (remove) {
            this.transformationsToApply.push(new SceneObjectRemover());
        }
        if (changeColor) {
            this.transformationsToApply.push(
                this.scene.type === ObjectType.Geometric ?
                new SceneObjectColorChanger() : new SceneObjectTextureChanger(),
            );
        }
    }

    private initializeModifications(): void {
        this.sceneModif = {
                id:  uuid().replace(/-/g, ""),
                type: this.scene.type,
                addedObjects: [],
                deletedObjects: [],
        };
        if (this.scene.type === ObjectType.Geometric) {
            this.sceneModif["colorChangedObjects"] = [];
        } else {
            this.sceneModif["texturesChangedObjects"] = [];
        }
    }

    private chooseRandomModification(): SceneTransformation {
        const indexOfTransformation: number = RandomUtils.random(this.transformationsToApply.length);

        return this.transformationsToApply[indexOfTransformation];
    }
}
