import { Injectable } from "@angular/core";
import * as THREE from "three";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";
import { ICommonScene, ObjectType } from "../../../../../../common/model/scene/scene";
import { BoundingBoxLoader } from "../sceneLoader/boundingBoxLoader";
import { WallLoader } from "../sceneLoader/wallLoader";
import { ISceneBoundingBox } from "./ISceneBoundingBox";
import { AbstractSceneParser } from "./abstractSceneParserService";

@Injectable({
    providedIn: "root",
})
export class SceneParserService extends AbstractSceneParser {
    public constructor(scene: ICommonScene) {
        super(scene);
    }

    public async parseScene(): Promise<ISceneBoundingBox> {
        const scene: THREE.Scene = await this.createScene();

        const bbox: THREE.Box3[] = await this.parseObjects(scene, this.sceneModel.sceneObjects);

        return {scene: scene, bbox: bbox};
    }

    private async parseObjects(scene: THREE.Scene, sceneObjects: ICommonSceneObject[]): Promise<THREE.Box3[]> {

        const boundingBoxes: THREE.Box3[] = new Array<THREE.Box3>();
        const promises: Promise<THREE.Object3D>[] = sceneObjects.map(
            async (object: ICommonSceneObject) => this.sceneObjectParser.parse(object));

        (this.sceneType === ObjectType.Geometric) ?
            await WallLoader.loadGeometric(boundingBoxes, scene) :
            await WallLoader.loadThematic(boundingBoxes, scene);

        await Promise.all(promises).then((v: THREE.Object3D[]) => {
            v.forEach((element, index: number) => {
                (element.name === "lamp.gltf") ?
                    BoundingBoxLoader.loadLamp(boundingBoxes, sceneObjects[index], element) :
                    BoundingBoxLoader.loadObject(boundingBoxes, element);
            });
            scene.add(...v);
        });

        return boundingBoxes;
    }
}
