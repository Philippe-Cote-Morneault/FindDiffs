import { ICommonScene } from "../../../../common/model/scene/scene";
import { ICommonSceneModifications } from "../../../../common/model/scene/sceneModifications";
import { GeometricShape, ICommonSceneObject } from "../../../../common/model/scene/sceneObject";
import { EnumUtils } from "../../utils/enumUtils";
import { SceneTransformation } from "./sceneTransformation";

/**
 * In charge of adding a random object to a scene
 */
export class SceneObjectAdder implements SceneTransformation {
    public applyTransformation(modifiedScene: ICommonScene, transformationEligibleObjects: ICommonSceneObject[],
                               modifications: ICommonSceneModifications): void {
    }

    private chooseRandomShape(): GeometricShape {
        const indexOfTransformation: number = Math.floor(Math.random() * EnumUtils.enumLength(GeometricShape));

        return GeometricShape[GeometricShape[indexOfTransformation]];
    }
}