import * as THREE from "three";
import { ObjectProperties } from "../../../../../../../common/model/scene/objects/thematicObjects/objectProperties";
import { ICommonThematicObject, ObjTheme } from "../../../../../../../common/model/scene/objects/thematicObjects/thematicObject";
import { JSONLoader } from "../../sceneLoader/jsonLoader";
import { TextureLoader } from "../../sceneLoader/textureLoader";
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

        await this.loadMaterial(object3D, object);

        return object3D;
    }

    private async loadMaterial(object3D: THREE.Object3D, object: ICommonThematicObject): Promise<void> {
        const objName: string = ObjTheme[object.objectType].toLowerCase();
        const meshName: string = ObjectProperties[objName].meshName;
        const isTextured: boolean = ObjectProperties[objName].isTextured;
        // Check if it is the first texture/color, we don't need to load it since it's the default
        // texture and already loaded in the json model.
        if (isTextured) {
            if ((ObjectProperties[objName].texture as string[])[0] !== object.texture) {
                await this.loadTexture(object3D, meshName, object.texture as string);
                if (object.objectType === ObjTheme.SIGN_SKIP) {
                    const SKIP_SIGN_LOW: string = "Box62_0";
                    const SIGN_PREFIX: string = "sign_skip1";
                    const SIGN_PREFIX_NEW: string = "sign_skip2";
                    const texture: string = (object.texture as string).replace(SIGN_PREFIX, SIGN_PREFIX_NEW);

                    await this.loadTexture(object3D, SKIP_SIGN_LOW, texture);
                }
            }
        } else {
            if ((ObjectProperties[objName].color as number[])[0] !== object.color) {
                this.loadColor(object3D, meshName, object.color as number);
            }
        }
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
