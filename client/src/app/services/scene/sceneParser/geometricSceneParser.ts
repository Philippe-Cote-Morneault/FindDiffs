import * as THREE from "three";
import { ICommonGeometricScene } from "../../../../../../common/model/scene/scene";
import { LightGenerator } from "../sceneRenderer/lightGenerator";

export class GeometricSceneParser {
    private static readonly SCENE_BG_COLOR_NUMBER_BASE: number = 16;

    public static parseScene(originalScene: ICommonGeometricScene): THREE.Scene {
        const scene: THREE.Scene = new THREE.Scene();

        const colorValueString: string = (originalScene as ICommonGeometricScene).bg_color.toString();
        scene.background = new THREE.Color(parseInt(colorValueString, GeometricSceneParser.SCENE_BG_COLOR_NUMBER_BASE));

        LightGenerator.generateLighting(scene, originalScene.dimensions);

        return scene;
    }
}
