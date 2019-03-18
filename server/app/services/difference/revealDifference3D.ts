import { ICommonReveal3D } from "../../../../common/model/reveal";
import { ICommonGeometricObject } from "../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ICommonScene } from "../../../../common/model/scene/scene";

export class RevealDifference3D {
    private originalScene: ICommonScene;
    private modifiedObjectId: string;

    public constructor(originalScene: ICommonScene, modifiedObjectId: string) {
        this.originalScene = originalScene;
        this.modifiedObjectId = modifiedObjectId;
    }

    public reveal(): ICommonReveal3D {
        const returnValue: ICommonReveal3D = {hit: false};
        this.originalScene.sceneObjects.forEach((element: ICommonGeometricObject) => {
            if (element.id === this.modifiedObjectId) {
                returnValue.hit = true;
            }
        });
        returnValue.hit = false;

        return returnValue;
    }
}
