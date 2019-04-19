import { Injectable } from "@angular/core";
import * as THREE from "three";
import { InvalidFormatException } from "../../../../../../common/errors/invalidFormatException";
import { Pair } from "../../../../../../common/model/pair";
import { ICommonGeometricModifications } from "../../../../../../common/model/scene/modifications/geometricModifications";
import { ICommonSceneModifications } from "../../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonThematicModifications } from "../../../../../../common/model/scene/modifications/thematicModifications";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";
import { ICommonThematicObject } from "../../../../../../common/model/scene/objects/thematicObjects/thematicObject";
import { ObjectType } from "../../../../../../common/model/scene/scene";
import { ICommonSceneAndObjects } from "./ICommonSceneAndObjects";
import { AbstractSceneParser } from "./abstractSceneParserService";
import { ThematicObjectParser } from "./objectParser/thematicObjectParser";

@Injectable({
    providedIn: "root",
})
export class ModifiedSceneParserService extends AbstractSceneParser {
    public sceneObjects: THREE.Object3D[] = new Array<THREE.Object3D>();

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

    public async parseModifiedScene(originalScene: THREE.Scene, sceneModifications: ICommonSceneModifications):
        Promise<ICommonSceneAndObjects> {
        const scene: THREE.Scene = originalScene.clone();
        if (sceneModifications.type === ObjectType.Geometric) {
            await this.parseGeometricObjects(
                scene,
                sceneModifications as ICommonGeometricModifications,
            );
        } else {
            await this.parseThematicObjects(
                scene,
                sceneModifications as ICommonThematicModifications,
            );
        }
        await this.addAddedObjects(scene, sceneModifications.addedObjects);

        return {scene: scene, objects: this.sceneObjects};
    }

    private async parseThematicObjects(scene: THREE.Scene, sceneModifications: ICommonThematicModifications): Promise<void> {
        for (const originalObject of scene.children) {
            if (originalObject.userData.id) {
                if (!sceneModifications.deletedObjects.includes(originalObject.userData.id)) {
                    const objectTexture: Pair<string, string> | undefined =
                    sceneModifications.texturesChangedObjects.find(
                        (object: Pair<string, string>) => originalObject.userData.id === object.key,
                    );
                    if (objectTexture) {
                        if (isNaN(Number(objectTexture.value))) {
                            await this.changeObjectTexture(originalObject, objectTexture.value);
                        } else {
                            await this.changeObjectColor(originalObject, Number(objectTexture.value));
                        }
                    }
                } else {
                    scene.remove(originalObject);
                }
            }
        }
    }

    private async parseGeometricObjects(scene: THREE.Scene, sceneModifications: ICommonGeometricModifications): Promise<void> {

        for (const originalObject of scene.children) {
            if (originalObject.userData.id) {
                if (!sceneModifications.deletedObjects.includes(originalObject.userData.id)) {
                    const objectColor: Pair<string, number> | undefined =
                    sceneModifications.colorChangedObjects.find(
                        (object: Pair<string, number>) => originalObject.userData.id === object.key,
                    );
                    if (objectColor) {
                        await this.changeObjectColor(
                            originalObject,
                            objectColor.value,
                        );
                    }
                } else {
                    scene.remove(originalObject);
                }
            }
        }
    }

    private async addAddedObjects(scene: THREE.Scene, objectsToAdd: ICommonSceneObject[]): Promise<void> {
        await Promise.all(objectsToAdd.map(async (object: ICommonSceneObject) =>
        this.sceneObjectParser.parse(object)))
        .then((v: THREE.Object3D[]) => {
            v.forEach((element) => {
                if (element.type === "Mesh" || element.type === "Scene") {
                    this.sceneObjects.push(element);
                }
            });

            v.forEach((element) => {
                scene.add(element);
            });
        });
    }

    private async changeObjectColor(objectToModify: THREE.Object3D, color: number | undefined): Promise<void> {
        if (!color) {
            throw new InvalidFormatException("Color not valid!");
        }
        const object: ICommonThematicObject = objectToModify.userData as ICommonThematicObject;
        object.color = color;
        await this.sceneObjectParser.loadMaterial(objectToModify, object, true);
    }

    private async changeObjectTexture(objectToModify: THREE.Object3D, texture: string): Promise<void> {
        if (!texture) {
            throw new InvalidFormatException("Texture not valid!");
        }
        const object: ICommonThematicObject = objectToModify.userData as ICommonThematicObject;
        object.texture = texture;
        const objParserThematic: ThematicObjectParser = this.sceneObjectParser as ThematicObjectParser;

        await objParserThematic.loadMaterial(objectToModify, object, true);
    }
}
