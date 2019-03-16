import * as THREE from "three";

export class JSONLoader {
    private static readonly ASSET_PATH: string = "../../assets/theme/models/";
    private static readonly ASSET_EXTENSION: string = ".json";

    public static async load(name: string): Promise<THREE.Object3D> {
        if (!THREE.Cache.enabled) {
            THREE.Cache.enabled = true;
        }

        return new Promise((resolve: (object: THREE.Object3D) => void, reject) => {
            const path: string = this.ASSET_PATH + name + this.ASSET_EXTENSION;
            new THREE.ObjectLoader().load(path, resolve, undefined, reject);
          });
    }
}
