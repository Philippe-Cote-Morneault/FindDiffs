import { Injectable } from "@angular/core";
import * as THREE from "three";
import { Pair } from "../../../../../common/model/pair";
import { ICommonGeometricModifications } from "../../../../../common/model/scene/modifications/geometricModifications";
import { ICommonThematicModifications } from "../../../../../common/model/scene/modifications/thematicModifications";
import { ICommonSceneObject } from "../../../../../common/model/scene/objects/sceneObject";
import { SceneLoaderService } from "../scene/sceneLoader/sceneLoader.service";

@Injectable({
    providedIn: "root",
})
export class CheatModeService {
    public cheatActivated: boolean;
    public originalLoaderService: SceneLoaderService;
    public modifiedLoaderService: SceneLoaderService;

    public constructor() {
        this.cheatActivated = false;
    }

    public toggleCheatMode(modifiedScene: ICommonGeometricModifications & ICommonThematicModifications): void {
        this.cheatActivated = !this.cheatActivated;
        if (this.cheatActivated) {
            this.enableCheats(modifiedScene);
        } else {
            this.showAllObjects(this.originalLoaderService.scene);
            this.showAllObjects(this.modifiedLoaderService.scene);
        }
    }

    private enableCheats(modifiedScene: ICommonGeometricModifications & ICommonThematicModifications): void {
        const modifiedSceneThree: THREE.Scene = this.modifiedLoaderService.scene;
        const originalSceneThree: THREE.Scene = this.originalLoaderService.scene;

        if (this.arrayNotEmpty(modifiedScene.addedObjects.length)) {
            this.changeAddedObjectsColor(modifiedScene, modifiedSceneThree);
        }
        if (this.arrayNotEmpty(modifiedScene.deletedObjects.length)) {
            this.changeDeletedObjectsColor(modifiedScene, originalSceneThree);
        }
        if (modifiedScene.colorChangedObjects && this.arrayNotEmpty(modifiedScene.colorChangedObjects.length)) {
            this.changeColorChangedObjectsColor(modifiedScene, originalSceneThree, modifiedSceneThree);
        }
        if (modifiedScene.texturesChangedObjects && this.arrayNotEmpty(modifiedScene.texturesChangedObjects.length)) {
            this.changeThematicChangedObjects(modifiedScene, originalSceneThree, modifiedSceneThree);
        }
    }

    private changeAddedObjectsColor(modifiedScene: ICommonGeometricModifications, modifiedSceneThreeJs: THREE.Scene): void {
        const objectsToHide: string[] = modifiedScene.addedObjects.map(
            (x: ICommonSceneObject) => x.id,
        );
        this.hideObjects(modifiedSceneThreeJs, objectsToHide);
    }

    private changeDeletedObjectsColor(modifiedScene: ICommonGeometricModifications,
                                      originalSceneThreeJs: THREE.Scene): void {
        this.hideObjects(originalSceneThreeJs, modifiedScene.deletedObjects);
    }

    private changeColorChangedObjectsColor(modifiedScene: ICommonGeometricModifications,
                                           originalSceneThreeJs: THREE.Scene,
                                           modifiedSceneThreeJs: THREE.Scene): void {
        const objectsToHide: string[] = modifiedScene.colorChangedObjects.map(
            (x: Pair<string, number>) => x.key,
        );
        this.hideObjects(originalSceneThreeJs, objectsToHide);
        this.hideObjects(modifiedSceneThreeJs, objectsToHide);
    }

    private changeThematicChangedObjects(modifiedScene: ICommonThematicModifications,
                                         originalSceneThreeJs: THREE.Scene,
                                         modifiedSceneThreeJs: THREE.Scene): void {
        const objectsToHide: string[] = modifiedScene.texturesChangedObjects.map(
            (x: Pair<string, string>) => x.key,
        );
        this.hideObjects(originalSceneThreeJs, objectsToHide);
        this.hideObjects(modifiedSceneThreeJs, objectsToHide);
    }

    private hideObjects(scene: THREE.Scene, objectsToHide: string[]): void {
        objectsToHide.forEach((objectId: string) => {
            const object3D: THREE.Object3D | undefined = scene.children.find(
                (element: THREE.Mesh | THREE.Scene) =>
                (element instanceof THREE.Mesh || element instanceof THREE.Scene) &&
                element.userData.id === objectId,
            );
            if (object3D) {
                object3D.visible = false;
            }
        });
    }

    private showAllObjects(scene: THREE.Scene): void {
        scene.children.forEach((child: THREE.Object3D) => {
            child.visible = true;
        });
    }

    public arrayNotEmpty(length: number): boolean {
        return length > 0;
    }
}
