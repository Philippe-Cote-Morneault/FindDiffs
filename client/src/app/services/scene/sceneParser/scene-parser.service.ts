import { Injectable } from "@angular/core";
import * as THREE from "three";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";
import {  ICommonScene } from "../../../../../../common/model/scene/scene";
import { AbstractSceneParser } from "./abstractSceneParserService";

@Injectable({
    providedIn: "root",
})
export class SceneParserService extends AbstractSceneParser {

    public async parseScene(sceneModel: ICommonScene): Promise<THREE.Scene> {
        const scene: THREE.Scene = await this.createScene(sceneModel);

        await this.parseObjects(scene, sceneModel.sceneObjects);

        return scene;
    }

    private async parseObjects(scene: THREE.Scene, sceneObjects: ICommonSceneObject[]): Promise<void> {

        const promises: Promise<THREE.Object3D>[] = sceneObjects.map((object: ICommonSceneObject) => this.sceneObjectParser.parse(object));
        await Promise.all(promises).then((v: THREE.Object3D[]) => {
            scene.add(...v);
        });
    }

}
