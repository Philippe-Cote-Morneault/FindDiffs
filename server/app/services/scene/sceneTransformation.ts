import { ICommonGeometricModifications } from "../../../../common/model/scene/modifications/geometricModifications";
import { ICommonGeometricShape } from "../../../../common/model/scene/objects/geometricShape";
import { ICommonScene } from "../../../../common/model/scene/scene";

/**
 * Represents a transformation to apply to a scene
 */
export interface SceneTransformation {
   applyTransformation(modifiedScene: ICommonScene, transformationEligibleObjects: ICommonGeometricShape[],
                       modifications: ICommonGeometricModifications): void;
}
