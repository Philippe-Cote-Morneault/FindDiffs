import { Injectable } from "@angular/core";
import * as THREE from "three";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";
import {  ICommonScene } from "../../../../../../common/model/scene/scene";
import { AbstractSceneParser } from "./abstractSceneParserService";

@Injectable({
    providedIn: "root",
})
export class SceneParserService extends AbstractSceneParser {

    public parseScene(sceneModel: ICommonScene): THREE.Scene {
        const scene: THREE.Scene = this.createScene(sceneModel);

        this.parseObjects(scene, sceneModel.sceneObjects);

        return scene;
    }

    private parseObjects(scene: THREE.Scene, sceneObjects: ICommonSceneObject[]): void {
        sceneObjects.forEach((object: ICommonSceneObject) => {
            scene.add(this.sceneObjectParser.parse(object));
        });
    }

}
