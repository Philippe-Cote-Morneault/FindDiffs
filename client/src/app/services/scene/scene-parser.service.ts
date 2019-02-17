import { Injectable } from "@angular/core";
import * as THREE from "three";
import { ICommonScene } from "../../../../../common/model/scene/scene";
import { SceneObjectParserService } from "./scene-object-parser.service";
import { ICommonSceneObject } from "../../../../../common/model/scene/sceneObject";

@Injectable({
  providedIn: "root",
})
export class SceneParserService {
    private static readonly SCENE_BG_COLOR_NUMBER_BASE: number = 16;

    public constructor(private sceneObjectParserService: SceneObjectParserService) {

    }

    public parseScene(originalScene: ICommonScene): THREE.Scene {
        const scene: THREE.Scene = this.generateSceneObject(
            parseInt(originalScene.bg_color, SceneParserService.SCENE_BG_COLOR_NUMBER_BASE),
        );

        this.generateGrid(originalScene.dimensions.x, 100);

        originalScene.sceneObjects.forEach((object: ICommonSceneObject) => {
            scene.add(this.sceneObjectParserService.parseSceneObject(object));
        });

        return scene;
    }

    private generateGrid(size: number, divisions: number): THREE.GridHelper {
        return new THREE.GridHelper(size, divisions);
    }

    private generateSceneObject(bgColor: number): THREE.Scene {
        const scene: THREE.Scene = new THREE.Scene();
        scene.background = new THREE.Color(bgColor);

        return scene;
    }
}
