import * as THREE from "three";
import { ICommonGeometricScene } from "../../../../../../common/model/scene/scene";

export class GeometricSceneParser {
    private static readonly SCENE_BG_COLOR_NUMBER_BASE: number = 16;

    public static parseScene(originalScene: ICommonGeometricScene): THREE.Scene {
        const scene: THREE.Scene = new THREE.Scene();

        const colorValueString: string = (originalScene as ICommonGeometricScene).bg_color.toString();
        scene.background = new THREE.Color(parseInt(colorValueString, GeometricSceneParser.SCENE_BG_COLOR_NUMBER_BASE));

        // TODO: Find a way to hold dimensions and divisions in scene object
        scene.add(GeometricSceneParser.generateGrid(originalScene.dimensions.x, 10));

        const light1: THREE.PointLight = new THREE.PointLight( 0xffffff, 5, 350 );
        light1.position.set( 150, 100, 150 );
        scene.add(light1);

        const light2: THREE.PointLight = new THREE.PointLight( 0xffffff, 5, 350 );
        light2.position.set( -150, 100, 150 );
        scene.add(light2);

        const light3: THREE.PointLight = new THREE.PointLight( 0xffffff, 2, 300 );
        light3.position.set( 0, 100, -150 );
        scene.add(light3);

        const ambiantLight = new THREE.AmbientLight(0x303030); // soft white light
        scene.add( ambiantLight );
        return scene;
    }

    private static generateGrid(size: number, divisions: number): THREE.GridHelper {
        return new THREE.GridHelper(size, divisions);
    }
}
