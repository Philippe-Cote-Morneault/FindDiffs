import { ICommonSceneObject } from "../objects/sceneObject";
import { ObjectType } from "../scene";
/**
 * Represents the modifications applied to an original scene. 
 */
export interface ICommonSceneModifications {
    id: string;

    type: ObjectType;
    
    // Array of objects added to the modified scene
    addedObjects: ICommonSceneObject[];
    // Array of ids of deleted objects
    deletedObjects: string[];
}