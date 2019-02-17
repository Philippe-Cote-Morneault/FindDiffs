import * as THREE from "three";
import { ICommonGeometricScene } from "../../../../../../common/model/scene/scene";

export class GeometricSceneParser {
    private static readonly SCENE_BG_COLOR_NUMBER_BASE: number = 16;

    public static parseScene(originalScene: ICommonGeometricScene): THREE.Scene {
        const scene: THREE.Scene = new THREE.Scene();

        scene.background = new THREE.Color(parseInt((originalScene as ICommonGeometricScene).bg_color,
                                                    GeometricSceneParser.SCENE_BG_COLOR_NUMBER_BASE));

        // TODO: Find a way to hold dimensions and divisions in scene object
        scene.add(GeometricSceneParser.generateGrid(originalScene.dimensions.x, 10));

        return scene;
    }

    private static generateGrid(size: number, divisions: number): THREE.GridHelper {
        return new THREE.GridHelper(size, divisions);
    }
}
