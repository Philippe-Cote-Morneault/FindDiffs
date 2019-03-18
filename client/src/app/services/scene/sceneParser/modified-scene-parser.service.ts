import { Injectable } from "@angular/core";
import { InvalidFormatException } from "../../../../../../common/errors/invalidFormatException";
import { Pair } from "../../../../../../common/model/pair";
import { ICommonGeometricModifications } from "../../../../../../common/model/scene/modifications/geometricModifications";
import { ICommonSceneModifications } from "../../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonGeometricObject } from "../../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";
import { ICommonScene, ObjectType } from "../../../../../../common/model/scene/scene";
import { AbstractSceneParser } from "./abstractSceneParserService";

@Injectable({
    providedIn: "root",
})
export class ModifiedSceneParserService extends AbstractSceneParser {

    public async parseModifiedScene(originalSceneModel: ICommonScene, sceneModifications: ICommonSceneModifications): Promise<THREE.Scene> {
        const scene: THREE.Scene = await this.createScene(originalSceneModel);

        originalSceneModel.type === ObjectType.Geometric ?
            this.parseGeometricObjects(scene, sceneModifications as ICommonGeometricModifications,
                                       originalSceneModel.sceneObjects as ICommonGeometricObject[]) :
            this.parseThematicObjects(scene, sceneModifications, originalSceneModel.sceneObjects);

        await this.addAddedObjects(scene, sceneModifications.addedObjects);

        return scene;
    }

    private parseThematicObjects(scene: THREE.Scene, sceneModifications: ICommonSceneModifications,
                                 originalSceneObjects: ICommonSceneObject[]): void {

        // tslint:disable-next-line:no-suspicious-comment
        // TODO: Implement this in sprint 3
    }

    private async parseGeometricObjects(scene: THREE.Scene, sceneModifications: ICommonGeometricModifications,
                                        originalSceneObjects: ICommonGeometricObject[]): Promise<void> {

        for (const originalObject of originalSceneObjects) {
            if (!sceneModifications.deletedObjects.includes(originalObject.id)) {
                if (sceneModifications.colorChangedObjects.some((object: Pair<string, number>) => originalObject.id === object.key)) {
                    this.changeObjectColor(
                        originalObject,
                        this.findChangedColor(originalObject.id, sceneModifications.colorChangedObjects),
                    );
                }
                scene.add(await this.sceneObjectParser.parse(originalObject));
            }
        }
    }

    private async addAddedObjects(scene: THREE.Scene, objectsToAdd: ICommonSceneObject[]): Promise<void> {
        for (const object of objectsToAdd) {
            scene.add(await this.sceneObjectParser.parse(object));
        }
    }

    private changeObjectColor(objectToModify: ICommonGeometricObject, color: number | undefined): void {
        if (color === undefined) {
            throw new InvalidFormatException("Color not valid!");
        }
        objectToModify.color = color;
    }

    private changeObjectTexture(objectToModify: ICommonThematicObject, texture: string): void {
        if (texture === undefined) {
            throw new InvalidFormatException("Texture not valid!");
        }
        objectToModify.texture = texture;
    }
}
