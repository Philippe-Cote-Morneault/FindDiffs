import { ICommonSceneModifications } from "../../../../common/model/scene/sceneModifications";
import { ICommonSceneObject, GeometricShape } from "../../../../common/model/scene/sceneObject";
import { SceneTransformation } from "./sceneTransformation";

/**
 * In charge of adding a random object to a scene
 */
export class SceneObjectAdder implements SceneTransformation {
    public applyTransformation(transformationEligibleObjects: ICommonSceneObject[], modifiedObjects: ICommonSceneObject[],
                               modifications: ICommonSceneModifications): void {

    }

    private chooseRandomShape(): GeometricShape {
        const indexOfTransformation: number = Math.floor(Math.random() * GeometricShape.);

        return this.transformationsToApply[indexOfTransformation];
    }
}