import * as THREE from "three";
import { ICommonGeometricScene } from "../../../../../../common/model/scene/scene";

export class GeometricSceneParser {
    private static readonly SCENE_BG_COLOR_NUMBER_BASE: number = 16;
    private static readonly WHITE_LIGHT_COLOR: number = 0xFFFFFF;
    private static readonly SOFT_WHITE_LIGHT_COLOR: number = 0x303030;
    private static readonly GRID_NUMBER_DIVISIONS: number = 10;

    public static parseScene(originalScene: ICommonGeometricScene): THREE.Scene {
        const scene: THREE.Scene = new THREE.Scene();

        const colorValueString: string = (originalScene as ICommonGeometricScene).bg_color.toString();
        scene.background = new THREE.Color(parseInt(colorValueString, GeometricSceneParser.SCENE_BG_COLOR_NUMBER_BASE));

        scene.add(GeometricSceneParser.generateGrid(originalScene.dimensions.x, GeometricSceneParser.GRID_NUMBER_DIVISIONS));

        // tslint:disable-next-line:no-magic-numbers
        const light1: THREE.PointLight = new THREE.PointLight(GeometricSceneParser.WHITE_LIGHT_COLOR, 5, 350 );
        // tslint:disable-next-line:no-magic-numbers
        light1.position.set( 150, 100, 150 );
        scene.add(light1);

        // tslint:disable-next-line:no-magic-numbers
        const light2: THREE.PointLight = new THREE.PointLight(GeometricSceneParser.WHITE_LIGHT_COLOR, 5, 350 );
        // tslint:disable-next-line:no-magic-numbers
        light2.position.set( -150, 100, 150 );
        scene.add(light2);

        // tslint:disable-next-line:no-magic-numbers
        const light3: THREE.PointLight = new THREE.PointLight(GeometricSceneParser.WHITE_LIGHT_COLOR, 2, 300 );
        // tslint:disable-next-line:no-magic-numbers
        light3.position.set( 0, 100, -150 );
        scene.add(light3);

        const ambiantLight: THREE.AmbientLight = new THREE.AmbientLight(GeometricSceneParser.SOFT_WHITE_LIGHT_COLOR);
        scene.add( ambiantLight );

        return scene;
    }

    private static generateGrid(size: number, divisions: number): THREE.GridHelper {
        return new THREE.GridHelper(size, divisions);
    }
}
