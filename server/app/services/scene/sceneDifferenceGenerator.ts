import { v4 as uuid } from "uuid";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import { ICommonSceneObject } from "../../../../common/model/scene/objects/sceneObject";
import { ICommonScene } from "../../../../common/model/scene/scene";
import { SceneObjectAdder } from "./transformations/sceneObjectAdder";
import { SceneObjectColorChanger } from "./transformations/sceneObjectColorChanger";
import { SceneObjectRemover } from "./transformations/sceneObjectRemover";
import { SceneTransformation } from "./transformations/sceneTransformation";

export class SceneDifferenceGenerator {
    private static readonly NUMBER_OF_DIFFERENCES: number = 7;
    // Holds the modifications that can be applied to a scene according to user preference
    private transformationsToApply: SceneTransformation[] = [];
    private modifiedScene: ICommonScene;
    // Holds all objects that have not been modified yet. Objects will be removed from this array when they are modified.
    private transformationEligibleObjects: ICommonSceneObject[];
    private modifications: ICommonSceneModifications;

    public generateModifiedScene(originalScene: ICommonScene, requiresInsertion: boolean, requiresRemoval: boolean,
                                 requiresColorChange: boolean): ICommonSceneModifications {

        // Deep copy the original scene
        this.modifiedScene = JSON.parse(JSON.stringify(originalScene));
        // Deep copy the originalObjects array
        this.transformationEligibleObjects = JSON.parse(JSON.stringify(originalScene.sceneObjects));

        this.setTransformationsToApply(requiresInsertion, requiresRemoval, requiresColorChange);

        this.modifications = {
            id: uuid(),
            type: originalScene.type,
            addedObjects: [],
            deletedObjects: [],
            //colorChangedObjects: new Map<string, number>(),
        };

        for (let i: number = 0; i < SceneDifferenceGenerator.NUMBER_OF_DIFFERENCES; ++i) {
            this.applyRandomModification();
        }

        return this.modifications;
    }

    private applyRandomModification(): void {
        this.chooseRandomModification().applyTransformation(
            this.modifiedScene,
            this.transformationEligibleObjects,
            this.modifications,
        );
    }

    private setTransformationsToApply(requiresInsertion: boolean, requiresRemoval: boolean, requiresColorChange: boolean ): void {
        if (requiresInsertion) {
            this.transformationsToApply.push(new SceneObjectAdder);
        }
        if (requiresRemoval) {
            this.transformationsToApply.push(new SceneObjectRemover);
        }
        if (requiresColorChange) {
            this.transformationsToApply.push(new SceneObjectColorChanger);
        }
    }

    private chooseRandomModification(): SceneTransformation {
        const indexOfTransformation: number = Math.floor(Math.random() * this.transformationsToApply.length);

        return this.transformationsToApply[indexOfTransformation];
    }
}
