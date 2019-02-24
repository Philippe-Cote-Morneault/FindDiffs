import { ICommonSceneModifications } from "../../../../../../common/model/scene/modifications/sceneModifications";
import { SceneTransformation } from "../../../../../../common/model/scene/modifications/sceneTransformation";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";

/**
 * In charge of removing a random object from a scene
 */
export class SceneObjectRemover implements SceneTransformation {
    public applyTransformation(objectsToTransform: ICommonSceneObject[],
                               modifications: ICommonSceneModifications): void {

        const indexOfObjectToRemove: number = Math.floor(Math.random() * objectsToTransform.length);
        const removedObject: ICommonSceneObject = objectsToTransform[indexOfObjectToRemove];

        modifications.deletedObjects.push(removedObject.id);
        objectsToTransform.splice(indexOfObjectToRemove, 1);
    }
}
