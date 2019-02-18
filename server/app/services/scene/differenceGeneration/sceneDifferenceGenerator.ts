import { v4 as uuid } from "uuid";
import { ICommonSceneModifications } from "../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonSceneObject } from "../../../../../common/model/scene/objects/sceneObject";
import { Textures } from "../../../../../common/model/scene/objects/thematicObjects/thematicObject";
import { ICommonScene, ObjectType } from "../../../../../common/model/scene/scene";
import { Grid } from "../grid";
import { SceneObjectAdder } from "./transformations/sceneObjectAdder";
import { SceneObjectColorChanger } from "./transformations/sceneObjectColorChanger";
import { SceneObjectRemover } from "./transformations/sceneObjectRemover";
import { SceneObjectTextureChanger } from "./transformations/sceneObjectTextureChanger";
import { SceneTransformation } from "./transformations/sceneTransformation";

export class SceneDifferenceGenerator {
    private static readonly NUMBER_OF_DIFFERENCES: number = 7;

    private transformationsToApply: SceneTransformation[] = [];
    private objectsToTransform: ICommonSceneObject[];

    private scene: ICommonScene;
    private grid: Grid;
    private sceneModifs: ICommonSceneModifications;

    public constructor(originalScene: ICommonScene, grid: Grid) {
        this.scene = originalScene;
        this.grid = grid;
    }
    public generateModifiedScene(requiresInsertion: boolean, requiresRemoval: boolean,
                                 requiresColorChange: boolean): ICommonSceneModifications {

        // Deep copy the originalObjects array
        this.objectsToTransform = JSON.parse(JSON.stringify(this.scene.sceneObjects));
        this.setTransformationsToApply(requiresInsertion, requiresRemoval, requiresColorChange);
        this.initializeModifications();

        for (let i: number = 0; i < SceneDifferenceGenerator.NUMBER_OF_DIFFERENCES; ++i) {
            this.applyRandomModification();
        }

        return this.sceneModifs;
    }

    private applyRandomModification(): void {
        this.chooseRandomModification().applyTransformation(
            this.objectsToTransform,
            this.sceneModifs,
        );
    }

    private setTransformationsToApply(requiresInsertion: boolean, requiresRemoval: boolean, requiresColorChange: boolean ): void {
        if (requiresInsertion) {
            this.transformationsToApply.push(new SceneObjectAdder(this.grid));
        }
        if (requiresRemoval) {
            this.transformationsToApply.push(new SceneObjectRemover());
        }
        if (requiresColorChange) {
            this.transformationsToApply.push(
                this.scene.type === ObjectType.Geometric ? new SceneObjectColorChanger() : new SceneObjectTextureChanger(),
            );
        }
    }

    private initializeModifications(): void {
        this.sceneModifs = {
                id:  uuid().replace(/-/g, ""),
                type: this.scene.type,
                addedObjects: [],
                deletedObjects: [],
        };
        if (this.scene.type === ObjectType.Geometric) {
            this.sceneModifs["colorChangedObjects"] = new Map<string, number>();
        } else {
            this.sceneModifs["texturesChangedObjects"] = new Map<string, Textures>();
        }
    }

    private chooseRandomModification(): SceneTransformation {
        const indexOfTransformation: number = Math.floor(Math.random() * this.transformationsToApply.length);

        return this.transformationsToApply[indexOfTransformation];
    }
}
