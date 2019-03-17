import * as THREE from "three";
import { ICommonThematicObject, ObjTheme } from "../../../../../../../common/model/scene/objects/thematicObjects/thematicObject";
import { JSONLoader } from "../../sceneLoader/jsonLoader";
import { SceneObjectParser } from "../sceneObjectParser";

export class ThematicObjectParser extends SceneObjectParser {

    public async parse(object: ICommonThematicObject): Promise<THREE.Object3D> {
        const objectName: string = ObjTheme[object.objectType].toLowerCase();
        const object3D: THREE.Object3D = await JSONLoader.load(objectName);

        object3D.position.x = object.position.x;
        object3D.position.y = object.position.y;
        object3D.position.z = object.position.z;

        object3D.scale.x *= object.scale;
        object3D.scale.y *= object.scale;
        object3D.scale.z *= object.scale;

        if (object3D.rotation.x !== 0) {
            object3D.rotation.z = object.orientation.yAngle;
        } else {
            object3D.rotation.y = object.orientation.yAngle;
        }

        return object3D;
    }
    private async loadTexture(object3D: THREE.Object3D, meshName: string, textureName: string): Promise<void> {
        const newTexture: THREE.Texture = await TextureLoader.load(textureName);
        object3D.traverse((child: THREE.Mesh) => {
            if (child instanceof THREE.Mesh && child.name === meshName) {
                if (child.material instanceof THREE.MeshStandardMaterial ||
                    child.material instanceof THREE.MeshPhongMaterial) {
                    const texture: THREE.Texture | null = child.material.map;
                    if (texture !== null) {
                        newTexture.offset = texture.offset;
                        newTexture.center = texture.center;
                        newTexture.flipY = texture.flipY;
                        newTexture.magFilter = texture.magFilter;
                        newTexture.minFilter = texture.minFilter;
                        newTexture.mapping = texture.mapping;
                        newTexture.offset = texture.offset;
                        newTexture.repeat = texture.repeat;
                        newTexture.rotation = texture.rotation;

                        child.material.map = newTexture;
                        child.material.needsUpdate = true;
                    }
                }
            }
        });
    }
    private loadColor(object3D: THREE.Object3D, meshName: string, color: number): void {
        object3D.traverse((child: THREE.Mesh) => {
            if (child instanceof THREE.Mesh && child.name === meshName) {
                if (child.material instanceof THREE.MeshStandardMaterial ||
                    child.material instanceof THREE.MeshPhongMaterial) {
                        child.material.color = new THREE.Color(color);
                        child.material.needsUpdate = true;
                }
            }
        });
    }
}
