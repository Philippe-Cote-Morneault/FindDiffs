import { ICommonSceneObject } from "./sceneObject";
/**
 * Represents the modifications applied to an original scene. 
 */
export interface ICommonSceneModifications {
    id: string;
    // Array of objects added to the modified scene
    addedObjects: ICommonSceneObject[];
    // Array of ids of deleted objects
    deletedObjects: string[];
    // Key is the id of the object that it's color changed, value is the hex color it changed to
    colorChangedObjects: Map<string, string>;
}