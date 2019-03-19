import { Injectable } from "@angular/core";
import { InvalidFormatException } from "../../../../../../common/errors/invalidFormatException";
import { Pair } from "../../../../../../common/model/pair";
import { ICommonGeometricModifications } from "../../../../../../common/model/scene/modifications/geometricModifications";
import { ICommonSceneModifications } from "../../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonThematicModifications } from "../../../../../../common/model/scene/modifications/thematicModifications";
import { ICommonGeometricObject } from "../../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";
import { ICommonThematicObject } from "../../../../../../common/model/scene/objects/thematicObjects/thematicObject";
import { ICommonScene, ObjectType } from "../../../../../../common/model/scene/scene";
import { AbstractSceneParser } from "./abstractSceneParserService";

@Injectable({
    providedIn: "root",
})
export class ModifiedSceneParserService extends AbstractSceneParser {
    public constructor(type: ObjectType) {
        super(
            {
                type: type,
                id: "",
                dimensions: {
                    x: 500,
                    y: 500,
                    z: 500,
                },
                sceneObjects: [],
            },
        );
    }

    public async parseModifiedScene(originalSceneModel: ICommonScene, sceneModifications: ICommonSceneModifications): Promise<THREE.Scene> {
        const scene: THREE.Scene = await this.createScene(originalSceneModel);
        if (originalSceneModel.type === ObjectType.Geometric) {
            await this.parseGeometricObjects(
                scene,
                sceneModifications as ICommonGeometricModifications,
                originalSceneModel.sceneObjects as ICommonGeometricObject[],
            );
        } else {
            await this.parseThematicObjects(
                scene,
                sceneModifications as ICommonThematicModifications,
                originalSceneModel.sceneObjects as ICommonThematicObject[],
            );
        }
        await this.addAddedObjects(scene, sceneModifications.addedObjects);

        return scene;
    }

    private async parseThematicObjects(scene: THREE.Scene, sceneModifications: ICommonThematicModifications,
                                       originalSceneObjects: ICommonThematicObject[]): Promise<void> {
        for (const originalObject of originalSceneObjects) {
            if (!sceneModifications.deletedObjects.includes(originalObject.id)) {

                const objectTexture: Pair<string, string> | undefined =
                sceneModifications.texturesChangedObjects.find(
                    (object: Pair<string, string>) => originalObject.id === object.key,
                );
                if (objectTexture !== undefined) {
                    if (originalObject.isTextured) {
                        this.changeObjectTexture(originalObject, objectTexture.value);
                    } else {
                        this.changeObjectColor(originalObject, Number(objectTexture.value));
                    }
                }
                scene.add(await this.sceneObjectParser.parse(originalObject));
            }
        }
                                 }

    private async parseGeometricObjects(scene: THREE.Scene, sceneModifications: ICommonGeometricModifications,
                                        originalSceneObjects: ICommonGeometricObject[]): Promise<void> {

        for (const originalObject of originalSceneObjects) {
            if (!sceneModifications.deletedObjects.includes(originalObject.id)) {
                const objectColor: Pair<string, number> | undefined =
                sceneModifications.colorChangedObjects.find(
                    (object: Pair<string, number>) => originalObject.id === object.key,
                );
                if (objectColor !== undefined) {
                    this.changeObjectColor(
                        originalObject,
                        objectColor.value,
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

    private changeObjectColor(objectToModify: ICommonGeometricObject | ICommonThematicObject, color: number | undefined): void {
        if (color === undefined) {
            throw new InvalidFormatException("Color not valid!");
        }
        objectToModify.color = color as number;
    }

    private changeObjectTexture(objectToModify: ICommonThematicObject, texture: string): void {
        if (texture === undefined) {
            throw new InvalidFormatException("Texture not valid!");
        }
        objectToModify.texture = texture;
    }
}
