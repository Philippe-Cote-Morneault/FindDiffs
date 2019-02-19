import { Injectable } from "@angular/core";
import { InvalidFormatException } from "../../../../../../common/errors/invalidFormatException";
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

    public parseModifiedScene(originalSceneModel: ICommonScene, sceneModifications: ICommonSceneModifications): THREE.Scene {
        const scene: THREE.Scene = this.createScene(originalSceneModel);

        originalSceneModel.type === ObjectType.Geometric ?
            this.parseGeometricObjects(scene, sceneModifications as ICommonGeometricModifications,
                                       originalSceneModel.sceneObjects as ICommonGeometricObject[]) :
            this.parseThematicObjects(scene, sceneModifications, originalSceneModel.sceneObjects);

        this.addAddedObjects(scene, sceneModifications.addedObjects);

        return scene;
    }

    private parseThematicObjects(scene: THREE.Scene, sceneModifications: ICommonSceneModifications,
                                 originalSceneObjects: ICommonSceneObject[]): void {

        // tslint:disable-next-line:no-suspicious-comment
        // TODO: Implement this in sprint 3
    }

    private parseGeometricObjects(scene: THREE.Scene, sceneModifications: ICommonGeometricModifications,
                                  originalSceneObjects: ICommonGeometricObject[]): void {

        originalSceneObjects.forEach((object: ICommonGeometricObject) => {
            if (!sceneModifications.deletedObjects.includes(object.id)) {
                if (sceneModifications.colorChangedObjects.has(object.id)) {
                    this.changeObjectColor(object, sceneModifications.colorChangedObjects.get(object.id));
                }
                scene.add(this.sceneObjectParser.parse(object));
            }
        });
    }

    private addAddedObjects(scene: THREE.Scene, objectsToAdd: ICommonSceneObject[]): void {
        objectsToAdd.forEach((object: ICommonSceneObject) => {
            scene.add(this.sceneObjectParser.parse(object));
        });
    }

    private changeObjectColor(objectToModify: ICommonGeometricObject, color: number | undefined): void {
        if (color === undefined) {
            throw new InvalidFormatException("Color not valid!");
        }
        objectToModify.color = color;
    }


}
