import { ICommonScene } from "../../../../common/model/scene/scene";
import { ICommonSceneModifications } from "../../../../common/model/scene/sceneModifications";
import { ICommonSceneObject } from "../../../../common/model/scene/sceneObject";
import { SceneTransformation } from "./sceneTransformation";

/**
 * In charge of removing a random object from a scene
 */
export class SceneObjectRemover implements SceneTransformation {
    public applyTransformation(modifiedScene: ICommonScene, transformationEligibleObjects: ICommonSceneObject[],
                               modifications: ICommonSceneModifications): void {

        const indexOfObjectToRemove: number = Math.floor(Math.random() * transformationEligibleObjects.length);
        const removedObject: ICommonSceneObject = transformationEligibleObjects[indexOfObjectToRemove];

        modifications.deletedObjects.push(removedObject.id);

        transformationEligibleObjects.splice(indexOfObjectToRemove, 1);

        modifiedScene.sceneObjects.splice(
            modifiedScene.sceneObjects.findIndex((object: ICommonSceneObject) => object.id === removedObject.id),
            1,
        );
    }
}
