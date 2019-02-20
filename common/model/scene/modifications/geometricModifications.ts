import { ICommonSceneModifications } from "./sceneModifications";
import { JSONFriendlyMap } from "../../../util/collection/JSONFriendlyMap";

export interface ICommonGeometricModifications extends ICommonSceneModifications {
    // Key is the id of the object that it's color changed, value is the hex color it changed to
    colorChangedObjects: JSONFriendlyMap<string, number>;
}