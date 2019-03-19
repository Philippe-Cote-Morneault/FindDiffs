import { Injectable } from "@angular/core";
import * as THREE from "three";
import { Pair } from "../../../../../common/model/pair";
import { ICommonGeometricModifications } from "../../../../../common/model/scene/modifications/geometricModifications";
import { ICommonThematicModifications } from "../../../../../common/model/scene/modifications/thematicModifications";
import { ICommonGeometricObject } from "../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ICommonScene } from "../../../../../common/model/scene/scene";
import { SceneLoaderService } from "../scene/sceneLoader/sceneLoader.service";

@Injectable({
    providedIn: "root",
})
export class CheatModeService {
    public cheatActivated: boolean;
    public originalSceneLoaderService: SceneLoaderService;
    public modifiedSceneLoaderService: SceneLoaderService;

    public constructor() {
        this.cheatActivated = false;
    }

    public async toggleCheatMode(originalScene: ICommonScene,
                                 modifiedScene: ICommonGeometricModifications & ICommonThematicModifications): Promise<void> {
        this.cheatActivated = !this.cheatActivated;
        if (this.cheatActivated) {
            await this.enableCheats(originalScene, modifiedScene);
        } else {
            await this.showOriginal();
            await this.showModified();
        }
    }

    private async enableCheats(originalScene: ICommonScene,
                               modifiedScene: ICommonGeometricModifications & ICommonThematicModifications): Promise<void> {
        const modifiedSceneThreeJs: THREE.Scene = this.modifiedSceneLoaderService.scene;
        const originalSceneThreeJs: THREE.Scene = this.originalSceneLoaderService.scene;

        if (modifiedScene.addedObjects.length > 0) {
            this.changeAddedObjectsColor(modifiedScene, modifiedSceneThreeJs);
        }
        if (modifiedScene.deletedObjects.length > 0) {
            this.changeDeletedObjectsColor(modifiedScene, originalSceneThreeJs);
        }
        if (modifiedScene.colorChangedObjects && modifiedScene.colorChangedObjects.length > 0) {
            this.changeColorChangedObjectsColor(modifiedScene, originalSceneThreeJs, modifiedSceneThreeJs);
        }
        if (modifiedScene.texturesChangedObjects && modifiedScene.texturesChangedObjects.length > 0) {
            this.changeThematicChangedObjects(modifiedScene, originalSceneThreeJs, modifiedSceneThreeJs);
        }
    }

    private changeAddedObjectsColor(modifiedScene: ICommonGeometricModifications, modifiedSceneThreeJs: THREE.Scene): void {
        modifiedScene.addedObjects.forEach((object: ICommonGeometricObject) => {
            const object3D: THREE.Object3D | undefined = modifiedSceneThreeJs.children.find(
                (element: THREE.Mesh | THREE.Scene) =>
                (element instanceof THREE.Mesh || element instanceof THREE.Scene) &&
                element.userData.id === object.id,
            );

            if (object3D) {
                object3D.visible = false;
            }
        });
    }

    private changeDeletedObjectsColor(modifiedScene: ICommonGeometricModifications,
                                      originalSceneThreeJs: THREE.Scene): void {
        modifiedScene.deletedObjects.forEach((objectId: string) => {
            const object3D: THREE.Object3D | undefined = originalSceneThreeJs.children.find(
                (element: THREE.Mesh | THREE.Scene) =>
                (element instanceof THREE.Mesh || element instanceof THREE.Scene) &&
                element.userData.id === objectId,
            );

            if (object3D) {
                object3D.visible = false;
            }
        });
    }

    private changeColorChangedObjectsColor(modifiedScene: ICommonGeometricModifications,
                                           originalSceneThreeJs: THREE.Scene,
                                           modifiedSceneThreeJs: THREE.Scene): void {
        modifiedScene.colorChangedObjects.forEach((objectColor: Pair<string, number>) => {
            const object3DOriginal: THREE.Object3D | undefined = originalSceneThreeJs.children.find(
                (element: THREE.Mesh | THREE.Scene) =>
                (element instanceof THREE.Mesh || element instanceof THREE.Scene) &&
                element.userData.id === objectColor.key,
            );
            const object3DModified: THREE.Object3D | undefined = modifiedSceneThreeJs.children.find(
                (element: THREE.Mesh | THREE.Scene) =>
                (element instanceof THREE.Mesh || element instanceof THREE.Scene) &&
                element.userData.id === objectColor.key,
            );
            if (object3DOriginal && object3DModified) {
                object3DOriginal.visible = false;
                object3DModified.visible = false;
            }
        });
    }

    private changeThematicChangedObjects(modifiedScene: ICommonThematicModifications,
                                         originalSceneThreeJs: THREE.Scene,
                                         modifiedSceneThreeJs: THREE.Scene): void {
        modifiedScene.texturesChangedObjects.forEach((modifiedPair: Pair<string, string>) => {
            const originalObject: THREE.Object3D | undefined = originalSceneThreeJs.children.find(
                (object: THREE.Object3D) => modifiedPair.key === object.userData.id);
            const modifiedObject: THREE.Object3D | undefined = modifiedSceneThreeJs.children.find(
                (object: THREE.Object3D) => modifiedPair.key === object.userData.id);

            if (originalObject && modifiedObject) {
                originalObject.visible = false;
                modifiedObject.visible = false;
            }
        });
    }

    private async showOriginal(): Promise<void> {
        const scene3D: THREE.Scene = this.originalSceneLoaderService.scene;
        scene3D.children.forEach((child: THREE.Object3D) => {
            child.visible = true;
        });
    }

    private async showModified(): Promise<void> {
        const scene3D: THREE.Scene = this.modifiedSceneLoaderService.scene;
        scene3D.children.forEach((child: THREE.Object3D) => {
            child.visible = true;
        });
    }
}
