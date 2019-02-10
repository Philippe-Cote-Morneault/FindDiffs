import { ICommonSceneModifications } from "../../../../common/model/scene/sceneModifications";
import { ICommonSceneObject } from "../../../../common/model/scene/sceneObject";
import { SceneObjectAdder } from "./sceneObjectAdder";
import { SceneObjectColorChanger } from "./sceneObjectColorChanger";
import { SceneObjectRemover } from "./sceneObjectRemover";
import { SceneTransformation } from "./sceneTransformation";

export class SceneDifferenceGenerator {
    private readonly NUMBER_OF_ERRORS: number = 7;
    // Holds the modifications that can be applied to a scene according to user preference
    private transformationsToApply: SceneTransformation[] = [];
    // Objects that can be modified from the original scene. Modified objects will be removed from this array
    private transformationEligibleObjects: ICommonSceneObject[];
    // Objects that have been added to the scene or that their color has changed
    private modifiedObjects: ICommonSceneObject[];
    private modifications: ICommonSceneModifications;

    public generateModifiedScene(originalObjects: ICommonSceneObject[], requiresInsertion: boolean, requiresRemoval: boolean,
                                 requiresColorChange: boolean): ICommonSceneModifications {

        // Deep copy the originalObjects array
        this.transformationEligibleObjects = JSON.parse(JSON.stringify(originalObjects));

        this.setTransformationsToApply(requiresInsertion, requiresRemoval, requiresColorChange);

        // TODO: Find out how to get id
        this.modifications = {
            id: "test",
            addedObjects: [],
            deletedObjects: [],
            colorChangedObjects: new Map<string, string>(),
        };

        for (let i: number = 0; i < this.NUMBER_OF_ERRORS; ++i) {
            this.applyRandomModification();
        }

        return this.modifications;

    }

    private applyRandomModification(): void {
        this.chooseRandomModification().applyTransformation(
            this.transformationEligibleObjects,
            this.modifiedObjects,
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
