import { NotFoundException } from "../../../../common/errors/notFoundException";
import { DifferenceType, ICommonReveal3D } from "../../../../common/model/reveal";
import { ICommonGeometricModifications } from "../../../../common/model/scene/modifications/geometricModifications";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import { ICommonThematicModifications } from "../../../../common/model/scene/modifications/thematicModifications";
import { ObjectType } from "../../../../common/model/scene/scene";
import { R } from "../../strings";

export class RevealDifference3D {
    private modifiedScene: ICommonSceneModifications;
    private originalObjectId: string;
    private modfifiedObjectId: string;
    private gameType: ObjectType;
    private returnValue: ICommonReveal3D = {
        hit: false,
        differenceType: DifferenceType.none,
        difference_id: "",
    };

    public constructor(modifiedScene: ICommonSceneModifications, modfifiedObjectId: string,
                       originalObjectId: string, gameType: ObjectType) {
        this.modifiedScene = modifiedScene;
        this.originalObjectId = originalObjectId;
        this.modfifiedObjectId = modfifiedObjectId;
        this.gameType = gameType;
    }

    public reveal(): ICommonReveal3D {
        this.verifyDeleted();

        this.verifyAdded();

        if (this.gameType === ObjectType.Thematic) {
            this.verifyTexture();
        } else {
            this.verifyColor();
        }

        if (this.returnValue.hit) {
            return this.returnValue;
        } else {
            throw new NotFoundException(R.ERROR_NO_DIFFERENCE_FOUND);
        }
    }

    private verifyDeleted(): void {
        for (const element of this.modifiedScene.deletedObjects) {
            if (element === this.originalObjectId) {
                this.returnValue.hit = true;
                this.returnValue.differenceType = DifferenceType.removedObject;
                this.returnValue.difference_id = this.originalObjectId;
            }
        }
    }

    private verifyAdded(): void {
        for (const element of this.modifiedScene.addedObjects) {
            if (element.id === this.modfifiedObjectId) {
                this.returnValue.hit = true;
                this.returnValue.differenceType = DifferenceType.addedObject;
                this.returnValue.difference_id = this.modfifiedObjectId;
            }
        }
    }

    private verifyTexture(): void {
        for (const element of (this.modifiedScene as ICommonThematicModifications).texturesChangedObjects) {
            if (element.key === this.originalObjectId) {
                this.returnValue.hit = true;
                this.returnValue.differenceType = DifferenceType.textureObjectChanged;
                this.returnValue.difference_id = this.originalObjectId;
            }
        }
    }

    private verifyColor(): void {
        for (const element of (this.modifiedScene as ICommonGeometricModifications).colorChangedObjects) {
            if (element.key === this.originalObjectId) {
                this.returnValue.hit = true;
                this.returnValue.differenceType = DifferenceType.colorChanged;
                this.returnValue.difference_id = this.originalObjectId;
            }
        }
    }
}
