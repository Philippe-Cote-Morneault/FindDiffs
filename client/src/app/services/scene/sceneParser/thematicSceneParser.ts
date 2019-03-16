import * as THREE from "three";
import { ICommonThematicScene } from "../../../../../../common/model/scene/scene";
import { JSONLoader } from "../sceneLoader/jsonLoader";

// tslint:disable-next-line:no-suspicious-comment
// TODO: Implement this in sprint 3
export class ThematicSceneParser {
    private static readonly SCENE_MODEL: string = "scene";
    public static async parseScene(originalScene: ICommonThematicScene): Promise<THREE.Scene> {
        const scene: THREE.Scene = new THREE.Scene();
        const object: THREE.Object3D = await JSONLoader.load(this.SCENE_MODEL);
        scene.add(object);

        const ambientLight: THREE.AmbientLight = new THREE.AmbientLight();
        ambientLight.color = new THREE.Color(0xFFFFFF);
        ambientLight.intensity = 0.2;

        scene.add(ambientLight);
        scene.background = new THREE.Color(0xAAAAAA);

        return scene;
    }
}
