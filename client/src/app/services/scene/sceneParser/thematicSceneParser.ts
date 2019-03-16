import * as THREE from "three";
import { ICommonThematicScene } from "../../../../../../common/model/scene/scene";

// tslint:disable-next-line:no-suspicious-comment
// TODO: Implement this in sprint 3
export class ThematicSceneParser {
    private static readonly SCENE_MODEL: string = "../../assets/theme/scene.json";
    public static async parseScene(originalScene: ICommonThematicScene): Promise<THREE.Scene> {
        const scene: THREE.Scene = new THREE.Scene();
        const object: THREE.Object3D = await this.loadJSON(this.SCENE_MODEL);
        scene.add(object);

        return scene;
    }

    private static async loadJSON(url: string): Promise<THREE.Object3D> {
        return new Promise((resolve: (object: THREE.Object3D) => void, reject) => {
            new THREE.ObjectLoader().load(url, resolve, undefined, reject);
          });
    }
}
