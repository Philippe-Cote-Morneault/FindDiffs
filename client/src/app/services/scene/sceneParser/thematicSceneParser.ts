import * as THREE from "three";
import { ICommonThematicScene } from "../../../../../../common/model/scene/scene";
import { JSONLoader } from "../sceneLoader/jsonLoader";

// tslint:disable-next-line:no-suspicious-comment
// TODO: Implement this in sprint 3
export class ThematicSceneParser {
    private static readonly SCENE_MODEL: string = "scene";

    private static readonly SKYBOX_FILES: string[] = ["px", "nx", "py", "ny", "pz", "nz"];
    private static readonly SKYBOX_EXTENSION: string = ".jpg";
    private static readonly SKYBOX_PATH: string = "../../assets/theme/textures/skybox/";
    private static readonly SKYBOX_SIZE: number = 500;

    public static async parseScene(originalScene: ICommonThematicScene): Promise<THREE.Scene> {
        const scene: THREE.Scene = new THREE.Scene();
        const object: THREE.Object3D = await JSONLoader.load(this.SCENE_MODEL);
        scene.add(object);

        const ambientLight: THREE.AmbientLight = new THREE.AmbientLight();
        ambientLight.color = new THREE.Color(0xFFFFFF);
        ambientLight.intensity = 0.2;

        scene.add(ambientLight);
        scene.background = new THREE.Color(0xAAAAAA);

        scene.add(this.createSkybox());

        return scene;
    }

    private static createSkybox(): THREE.Object3D {
        const materials: THREE.Material[] = new Array<THREE.Material>();
        this.SKYBOX_FILES.forEach((file: string) => {
            materials.push(new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture(this.SKYBOX_PATH + file + this.SKYBOX_EXTENSION),
                side: THREE.BackSide,
            }));
        });
        const skyboxGeometry: THREE.CubeGeometry = new THREE.CubeGeometry(
            this.SKYBOX_SIZE,
            this.SKYBOX_SIZE,
            this.SKYBOX_SIZE,
        );
        const skyboxMaterial: THREE.MeshFaceMaterial = new THREE.MeshFaceMaterial(materials);

        return new THREE.Mesh( skyboxGeometry, skyboxMaterial);
    }

}
