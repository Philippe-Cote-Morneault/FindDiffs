import { ICommonScene } from "../../../../common/model/scene/scene";
import { ICommonSceneModifications } from "../../../../common/model/scene/sceneModifications";
import { ICommonSceneObject } from "../../../../common/model/scene/sceneObject";
import { SceneTransformation } from "./sceneTransformation";

/**
 * In charge of adding a random object to a scene
 */
export class SceneObjectAdder implements SceneTransformation {
    public applyTransformation(modifiedScene: ICommonScene, transformationEligibleObjects: ICommonSceneObject[],
                               modifications: ICommonSceneModifications): void {

        // tslint:disable-next-line:no-suspicious-comment
        // TODO: Add call to algorithm
    }

    /*private chooseRandomShape(): GeometricShape {
        const indexOfTransformation: number = Math.floor(Math.random() * EnumUtils.enumLength(GeometricShape));

        return GeometricShape[GeometricShape[indexOfTransformation]];
    }
    */
}
