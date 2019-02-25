import { SceneTransformation } from "../../../../../../common/model/scene/modifications/sceneTransformation";
import { ICommonThematicModifications } from "../../../../../../common/model/scene/modifications/thematicModifications";
import { ICommonThematicObject } from "../../../../../../common/model/scene/objects/thematicObjects/thematicObject";

export class SceneObjectTextureChanger implements SceneTransformation {
    public applyTransformation(objectsToTransform: ICommonThematicObject[],
                               modifications: ICommonThematicModifications): void {

        // tslint:disable-next-line:no-suspicious-comment
        // TODO: Implement this in sprint 3
    }
}
