import { ICommonScene } from "../../../../common/model/scene/scene";
import { ICommonSceneModifications } from "../../../../common/model/scene/sceneModifications";
import { ICommonSceneObject } from "../../../../common/model/scene/sceneObject";
import { SceneTransformation } from "./sceneTransformation";

/**
 * In charge of adding a random object to a scene
 */
export class SceneObjectAdder implements SceneTransformation {
    public applyTransformation(modifiedScene: ICommonScene, transformationEligibleObjects: ICommonSceneObject[],
                               // tslint:disable-next-line:no-empty
                               modifications: ICommonSceneModifications): void {
    }

    /*private chooseRandomShape(): GeometricShape {
        const indexOfTransformation: number = Math.floor(Math.random() * EnumUtils.enumLength(GeometricShape));

        return GeometricShape[GeometricShape[indexOfTransformation]];
    }
    */
}
