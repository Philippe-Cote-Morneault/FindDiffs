import { ICommonThematicModifications } from "../../../../../common/model/scene/modifications/thematicModifications";
import { ICommonThematicObject } from "../../../../../common/model/scene/objects/thematicObjects/thematicObject";
import { ICommonScene } from "../../../../../common/model/scene/scene";
import { SceneTransformation } from "./sceneTransformation";

export class SceneObjectTextureChanger implements SceneTransformation {
    public applyTransformation(modifiedScene: ICommonScene, transformationEligibleObjects: ICommonThematicObject[],
                               modifications: ICommonThematicModifications): void {

        // tslint:disable-next-line:no-suspicious-comment
        // TODO: Implement this in sprint 3
    }
}
