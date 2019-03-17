import * as THREE from "three";
import { ICommonThematicScene } from "../../../../../../common/model/scene/scene";
import { JSONLoader } from "../sceneLoader/jsonLoader";
import { TextureLoader } from "../sceneLoader/textureLoader";

export class ThematicSceneParser {
    private static readonly SCENE_MODEL: string = "scene";

    private static readonly SKYBOX_FILES: string[] = ["px", "nx", "py", "ny", "pz", "nz"];
    private static readonly SKYBOX_EXTENSION: string = ".jpg";
    private static readonly SKYBOX_PATH: string = "skybox/";
    private static readonly SKYBOX_SIZE: number = 500;

    private static readonly WHITE: number = 0xFFFFFF;
    private static readonly GREY: number = 0xAAAAAA;
    private static readonly AMBIENT_INTENSITY: number = 0.2;

    public static async parseScene(originalScene: ICommonThematicScene): Promise<THREE.Scene> {
        const scene: THREE.Scene = new THREE.Scene();
        const object: THREE.Object3D = await JSONLoader.load(this.SCENE_MODEL);
        scene.add(object);

        const ambientLight: THREE.AmbientLight = new THREE.AmbientLight();
        ambientLight.color = new THREE.Color(this.WHITE);
        ambientLight.intensity = this.AMBIENT_INTENSITY;

        scene.add(ambientLight);
        scene.background = new THREE.Color(this.GREY);

        scene.add(await this.createSkybox());

        return scene;
    }

    private static async createSkybox(): Promise<THREE.Object3D> {
        const materials: THREE.Material[] = new Array<THREE.Material>();
        for (const file of this.SKYBOX_FILES) {
            materials.push(new THREE.MeshBasicMaterial({
                map: await TextureLoader.load(this.SKYBOX_PATH + file + this.SKYBOX_EXTENSION),
                side: THREE.BackSide,
            }));
        }
        const skyboxGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(
            this.SKYBOX_SIZE,
            this.SKYBOX_SIZE,
            this.SKYBOX_SIZE,
        );

        return new THREE.Mesh( skyboxGeometry, materials);
    }

}
