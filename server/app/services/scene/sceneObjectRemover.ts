import { ICommonGeometricModifications } from "../../../../common/model/scene/modifications/geometricModifications";
import { ICommonGeometricShape } from "../../../../common/model/scene/objects/geometricShape";
import { ICommonScene } from "../../../../common/model/scene/scene";
import { SceneTransformation } from "./sceneTransformation";

/**
 * In charge of removing a random object from a scene
 */
export class SceneObjectRemover implements SceneTransformation {
    public applyTransformation(modifiedScene: ICommonScene, transformationEligibleObjects: ICommonGeometricShape[],
                               modifications: ICommonGeometricModifications): void {

        const indexOfObjectToRemove: number = Math.floor(Math.random() * transformationEligibleObjects.length);
        const removedObject: ICommonGeometricShape = transformationEligibleObjects[indexOfObjectToRemove];

        modifications.deletedObjects.push(removedObject.id);

        transformationEligibleObjects.splice(indexOfObjectToRemove, 1);

        modifiedScene.sceneObjects.splice(
            modifiedScene.sceneObjects.findIndex((object: ICommonGeometricShape) => object.id === removedObject.id),
            1,
        );
    }
}
