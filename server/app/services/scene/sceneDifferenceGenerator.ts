import { ICommonSceneObject } from "../../../../common/model/scene/sceneObject";
import { SceneTransformation } from "./sceneTransformation";
import { SceneObjectAdder } from "./sceneObjectAdder";
import { SceneObjectRemover } from "./sceneObjectRemover";
import { SceneObjectColorChanger } from "./sceneObjectColorChanger";

export class SceneDifferenceGenerator {
    private readonly NUMBER_OF_ERRORS: number = 7;
    private transformationsToApply: SceneTransformation[] = [];
    private originalObjects: ICommonSceneObject[];
    private indexOfModifiedObjects: number[] = [];

    public generateModifiedScene(originalObjects: ICommonSceneObject[], requiresInsertion: boolean, requiresRemoval: boolean,
                                 requiresColorChange: boolean): ICommonSceneObject[] {

        this.setTransformationsToApply(requiresInsertion, requiresRemoval, requiresColorChange);
        this.originalObjects = originalObjects;

        for (let i: number = 0; i < this.NUMBER_OF_ERRORS; ++i) {
            this.applyRandomModification();
        }

      
    }

    private applyRandomModification(): void {
        const indexOfTransformation: number = Math.floor(Math.random() * this.transformationsToApply.length);
        const transformation: SceneTransformation = this.transformationsToApply[indexOfTransformation];
        transformation.applyTransformation(this.originalObjects, this.indexOfModifiedObjects);
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
}