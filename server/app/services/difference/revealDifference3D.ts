import { NotFoundException } from "../../../../common/errors/notFoundException";
import { DifferenceType, ICommonReveal3D } from "../../../../common/model/reveal";
import { ICommonGeometricModifications } from "../../../../common/model/scene/modifications/geometricModifications";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import { ICommonThematicModifications } from "../../../../common/model/scene/modifications/thematicModifications";
import { ObjectType } from "../../../../common/model/scene/scene";
import { R } from "../../strings";
// import { ICommonSceneObject } from "../../../../common/model/scene/objects/sceneObject";
// import { ICommonGeometricObject } from "../../../../common/model/scene/objects/geometricObjects/geometricObject";
// import { ICommonScene } from "../../../../common/model/scene/scene";

export class RevealDifference3D {
    private modifiedScene: ICommonSceneModifications;
    private originalObjectId: string;
    private modfifiedObjectId: string;
    private gameType: ObjectType;

    public constructor(modifiedScene: ICommonSceneModifications, modfifiedObjectId: string,
                       originalObjectId: string, gameType: ObjectType) {
        this.modifiedScene = modifiedScene;
        this.originalObjectId = originalObjectId;
        this.modfifiedObjectId = modfifiedObjectId;
        this.gameType = gameType;
    }

    // tslint:disable-next-line:max-func-body-length
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

        if (this.gameType === ObjectType.Thematic) {
            for (const element of (this.modifiedScene as ICommonThematicModifications).texturesChangedObjects) {
                if (element.key === this.originalObjectId) {
                    returnValue.hit = true;
                    returnValue.differenceType = DifferenceType.textureObjectChanged;

                    return returnValue;
                }
            }
        } else {
            for (const element of (this.modifiedScene as ICommonGeometricModifications).colorChangedObjects) {
                if (element.key === this.originalObjectId) {
                    returnValue.hit = true;
                    returnValue.differenceType = DifferenceType.colorChanged;

                    return returnValue;
                }
            }
        }

        for (const element of this.modifiedScene.addedObjects) {
            if (element.id === this.modfifiedObjectId) {
                returnValue.hit = true;
                returnValue.differenceType = DifferenceType.addedObject;

                return returnValue;
            }
        }

        throw new NotFoundException(R.ERROR_NO_DIFFERENCE_FOUND);
    }
}
