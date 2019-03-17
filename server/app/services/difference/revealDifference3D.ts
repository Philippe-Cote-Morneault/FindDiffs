import { ICommonReveal } from "../../../../common/model/reveal";
import { ICommonScene } from "../../../../common/model/scene/scene";

export class RevealDifference {
    private originalScene: ICommonScene;
    private modifiedObjectId: string;

    public constructor(originalScene: ICommonScene, modifiedObjectId: string) {
        this.originalScene = originalScene;
        this.modifiedObjectId = modifiedObjectId;
    }

    public reveal(): ICommonReveal {

    }
}
