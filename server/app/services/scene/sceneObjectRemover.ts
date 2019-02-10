import { ICommonSceneModifications } from "../../../../common/model/scene/sceneModifications";
import { ICommonSceneObject } from "../../../../common/model/scene/sceneObject";
import { SceneTransformation } from "./sceneTransformation";

/**
 * In charge of removing a random object from a scene
 */
export class SceneObjectRemover implements SceneTransformation {
    public applyTransformation(transformationEligibleObjects: ICommonSceneObject[], modifiedObjects: ICommonSceneObject[],
                               modifications: ICommonSceneModifications): void {

        const indexOfObject: number = Math.floor(Math.random() * transformationEligibleObjects.length);
        const removedObject: ICommonSceneObject = transformationEligibleObjects[indexOfObject];

        modifiedObjects.push(removedObject);
        modifications.deletedObjects.push(removedObject.id);
        transformationEligibleObjects.splice(indexOfObject, 1);
    }
}
