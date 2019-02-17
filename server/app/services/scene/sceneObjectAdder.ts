import { ICommonGeometricShape } from "../../../../common/model/scene/objects/geometricShape";
import { ICommonScene } from "../../../../common/model/scene/scene";
import { ICommonSceneModifications } from "../../../../common/model/scene/sceneModifications";
import { SceneTransformation } from "./sceneTransformation";

/**
 * In charge of adding a random object to a scene
 */
export class SceneObjectAdder implements SceneTransformation {
    public applyTransformation(modifiedScene: ICommonScene, transformationEligibleObjects: ICommonGeometricShape[],
                               modifications: ICommonSceneModifications): void {
    }

    /*private chooseRandomShape(): GeometricShape {
        const indexOfTransformation: number = Math.floor(Math.random() * EnumUtils.enumLength(GeometricShape));

        return GeometricShape[GeometricShape[indexOfTransformation]];
    }
    */
}