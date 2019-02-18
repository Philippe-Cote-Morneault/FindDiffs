import { ICommonSceneModifications } from "../../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";
import { SceneTransformation } from "./sceneTransformation";

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
