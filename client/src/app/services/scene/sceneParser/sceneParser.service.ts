import { Injectable } from "@angular/core";
import * as THREE from "three";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";
import { ICommonScene, ObjectType } from "../../../../../../common/model/scene/scene";
import { WallLoader } from "../sceneLoader/wallLoader";
import { ICommonSceneAndObjects } from "./ICommonSceneAndObjects";
import { AbstractSceneParser } from "./abstractSceneParserService";

@Injectable({
    providedIn: "root",
})
export class SceneParserService extends AbstractSceneParser {
    public constructor(scene: ICommonScene) {
        super(scene);
    }

    public async parseScene(): Promise<ICommonSceneAndObjects> {
        const scene: THREE.Scene = await this.createScene();
        const objects: THREE.Object3D[] = await this.parseObjects(scene, this.sceneModel.sceneObjects);

        return {scene: scene, objects: objects};
    }

    private async parseObjects(scene: THREE.Scene, sceneObjects: ICommonSceneObject[]): Promise<THREE.Object3D[]> {
        const objects: THREE.Object3D[] = new Array<THREE.Object3D>();
        const promises: Promise<THREE.Object3D>[] = sceneObjects.map(
            async (object: ICommonSceneObject) => this.sceneObjectParser.parse(object));
        (this.sceneType === ObjectType.Geometric) ?
            await WallLoader.loadGeometric(scene, objects) :
            await WallLoader.loadThematic(scene, objects);

        await Promise.all(promises).then((v: THREE.Object3D[]) => {
            v.forEach((element) => {
                if (element.type === "Mesh" || element.type === "Scene") {
                    objects.push(element);
                }
            });
            scene.add(...v);
        });

        return objects;
    }
}
