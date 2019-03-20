import { DifferenceType, ICommonReveal3D } from "../../../../common/model/reveal";
import { ICommonGeometricModifications } from "../../../../common/model/scene/modifications/geometricModifications";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
// import { ICommonSceneObject } from "../../../../common/model/scene/objects/sceneObject";
// import { ICommonGeometricObject } from "../../../../common/model/scene/objects/geometricObjects/geometricObject";
// import { ICommonScene } from "../../../../common/model/scene/scene";

export class RevealDifference3D {
    private modifiedScene: ICommonSceneModifications;
    private originalObjectId: string;

    public constructor(modifiedScene: ICommonSceneModifications, originalObjectId: string) {
        this.modifiedScene = modifiedScene;
        this.originalObjectId = originalObjectId;
    }

    // tslint:disable
    public reveal(): ICommonReveal3D {
        const returnValue: ICommonReveal3D = {
            hit: false,
            differenceType: DifferenceType.none,
        };
        
        for (const element of this.modifiedScene.deletedObjects) {
            if (element === this.originalObjectId) {
                returnValue.hit = true;
                returnValue.differenceType = DifferenceType.removedObject;

                return returnValue;
            }
        }

        for (const element of (this.modifiedScene as ICommonGeometricModifications).colorChangedObjects) {
            if (element.key === this.originalObjectId) {
                returnValue.hit = true;
                returnValue.differenceType = DifferenceType.colorChanged;

                return returnValue;
            }
        }


        // this.modifiedScene.sceneObjects.forEach((element: ICommonGeometricObject) => {
        //     if (element.id === this.modifiedObjectId) {
        //         returnValue.hit = true;
        //     }
        // });
        // returnValue.hit = false;

        return returnValue;
    }
}
