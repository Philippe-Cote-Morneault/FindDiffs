import { ICommonSceneObject } from "../../../../common/model/scene/sceneObject";
import { SceneTransformation } from "./sceneTransformation";
import { SceneObjectAdder } from "./sceneObjectAdder";
import { SceneObjectRemover } from "./sceneObjectRemover";
import { SceneObjectColorChanger } from "./sceneObjectColorChanger";

export class SceneDifferenceGenerator {
    private readonly NUMBER_OF_ERRORS: number = 7;
    private transformationsToApply: SceneTransformation[] = [];

    public generateModifiedScene(sceneObjects: ICommonSceneObject[], requiresInsertion: boolean, requiresRemoval: boolean,
                                 requiresColorChange: boolean): ICommonSceneObject[] {

        this.setTransformationsToApply(requiresInsertion, requiresRemoval, requiresColorChange);

        for (let i: number = 0; i < this.NUMBER_OF_ERRORS; ++i) {
            this.applyRandomModification()
        }


        return objects;
    }

    private applyRandomModification(): void {
        let class: Function = this.transformationsToApply[Math.floor(Math.random() * this.transformationsToApply.length)];
        this.transformationsToApply[Math.floor(Math.random() * this.transformationsToApply.length)].applyTransformation()
    }

    private setTransformationsToApply(requiresInsertion: boolean, requiresRemoval: boolean, requiresColorChange: boolean ): void {
        if (requiresInsertion) {
            this.transformationsToApply.push(SceneObjectAdder);
        }
        if (requiresRemoval) {
            this.transformationsToApply.push(SceneObjectRemover);
        }
        if (requiresColorChange) {
            this.transformationsToApply.push(SceneObjectColorChanger);
        }
    }
}