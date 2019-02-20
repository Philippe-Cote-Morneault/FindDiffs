import { Injectable } from "@angular/core";
import { InvalidFormatException } from "../../../../../../common/errors/invalidFormatException";
import { ICommonGeometricModifications } from "../../../../../../common/model/scene/modifications/geometricModifications";
import { ICommonSceneModifications } from "../../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonGeometricObject } from "../../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";
import { ICommonScene, ObjectType } from "../../../../../../common/model/scene/scene";
import { AbstractSceneParser } from "./abstractSceneParserService";
import { Pair } from "../../../../../../common/model/pair";

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

        originalSceneObjects.forEach((originalObject: ICommonGeometricObject) => {
            if (!sceneModifications.deletedObjects.includes(originalObject.id)) {
                console.log(sceneModifications.colorChangedObjects);
                if (sceneModifications.colorChangedObjects.some((object: Pair<string, number>) => originalObject.id === object.key)) {
                    // sceneModifications.colorChangedObjects.
                    this.changeObjectColor(originalObject,
                                           this.findChangedColor(originalObject.id, sceneModifications.colorChangedObjects),
                    );
                }
                scene.add(this.sceneObjectParser.parse(originalObject));
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

    private findChangedColor(key: string, colorChangedObjects: Pair<string, number>[]): number | undefined {
        for (let i = 0; i < colorChangedObjects.length; ++i) {
            if (colorChangedObjects[i].key === key) {
                return colorChangedObjects[i].value;
            }
        }

        return undefined;
    }
}
