import { Injectable } from "@angular/core";
import * as THREE from "three";
import { ICommonScene } from "../../../../../common/model/scene/scene";

@Injectable({
  providedIn: "root",
})
export class SceneParserService {

    public parseScene(originalScene: ICommonScene): THREE.Scene {
        const scene: THREE.Scene = this.generateSceneObject(parseInt(originalScene.bg_color));

        return scene;
    }

    private generateGrid(size: number, divisions: number): THREE.GridHelper {
        return new THREE.GridHelper(size, divisions);
    }

    private generateSceneObject(bgColor: number): THREE.Scene {
        const scene: THREE.Scene = new Scene();
        scene.background = new THREE.Color(bgColor);

        return scene;
    }
}
