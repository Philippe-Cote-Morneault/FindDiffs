import { Injectable } from "@angular/core";
import * as THREE from "three";
import { ICommonSceneObject } from "../../../../../../common/model/scene/objects/sceneObject";
import { ICommonScene, Type } from "../../../../../../common/model/scene/scene";
import { GeometricObjectParser } from "./geometricObjectParser";
import { SceneObjectParser } from "./sceneObjectParser";
import { ThematicObjectParser } from "./thematicObjectParser";

@Injectable({
  providedIn: "root",
})
export class SceneParserService {
    private static readonly SCENE_BG_COLOR_NUMBER_BASE: number = 16;

    private sceneObjectParser: SceneObjectParser;

    public parseScene(originalScene: ICommonScene): THREE.Scene {
        this.sceneObjectParser = originalScene.type === Type.Geometric ? new GeometricObjectParser() : new ThematicObjectParser();

        const scene: THREE.Scene = this.initializeScene(
            parseInt(originalScene.bg_color, SceneParserService.SCENE_BG_COLOR_NUMBER_BASE),
        );

        this.generateGrid(originalScene.dimensions.x, 100);

        originalScene.sceneObjects.forEach((object: ICommonSceneObject) => {
            scene.add(this.sceneObjectParser.parse(object));
        });

        return scene;
    }

    private generateGrid(size: number, divisions: number): THREE.GridHelper {
        return new THREE.GridHelper(size, divisions);
    }

    private initializeScene(bgColor: number): THREE.Scene {
        const scene: THREE.Scene = new THREE.Scene();
        scene.background = new THREE.Color(bgColor);

        return scene;
    }

}
