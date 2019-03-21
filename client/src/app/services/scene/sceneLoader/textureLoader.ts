import * as THREE from "three";

export class TextureLoader {
    private static readonly ASSET_PATH: string = "../../assets/theme/textures/";

    public static async load(name: string): Promise<THREE.Texture> {
        if (!THREE.Cache.enabled) {
            THREE.Cache.enabled = true;
        }

        return new Promise((resolve: (texture: THREE.Texture) => void, reject) => {
            const path: string = this.ASSET_PATH + name;
            new THREE.TextureLoader().load(path, resolve, undefined, reject);
          });
    }
}
