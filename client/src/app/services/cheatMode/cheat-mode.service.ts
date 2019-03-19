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
  private static readonly MESH_TYPE: string = "Mesh";
  private static readonly SCENE_TYPE: string = "Scene";
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

      await this.restoreOriginalMaterial();
      await this.restoreModifiedMaterial();
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
      this.changeDeletedObjectsColor(originalScene, modifiedScene, originalSceneThreeJs);
    }
    if (modifiedScene.colorChangedObjects && modifiedScene.colorChangedObjects.length > 0) {
      this.changeColorChangedObjectsColor(modifiedScene, originalSceneThreeJs, modifiedSceneThreeJs);
    }
    if (modifiedScene.texturesChangedObjects && modifiedScene.texturesChangedObjects.length > 0) {
      this.changeThematicChangedObjects(modifiedScene, originalSceneThreeJs, modifiedSceneThreeJs);
    }

    this.renderScene(this.originalSceneLoaderService, originalSceneThreeJs);
    this.renderScene(this.modifiedSceneLoaderService, modifiedSceneThreeJs);
  }

  private changeAddedObjectsColor(modifiedScene: ICommonGeometricModifications, modifiedSceneThreeJs: THREE.Scene): void {
    modifiedScene.addedObjects.forEach((object: ICommonGeometricObject) => {
      const object3D: THREE.Object3D | undefined = modifiedSceneThreeJs.children.find(
        (element: THREE.Mesh | THREE.Scene) =>
        (element.type === CheatModeService.MESH_TYPE || element.type === CheatModeService.SCENE_TYPE)
        && element.userData.id === object.id);

      if (object3D) {
        object3D.visible = false;
      }
    });
  }

  private changeDeletedObjectsColor(originalScene: ICommonScene,
                                    modifiedScene: ICommonGeometricModifications,
                                    originalSceneThreeJs: THREE.Scene): void {
    originalScene.sceneObjects.forEach((object: ICommonGeometricObject) => {
      const object3D: THREE.Object3D | undefined = originalSceneThreeJs.children.find(
        (element: THREE.Mesh | THREE.Scene) =>
        (element.type === CheatModeService.MESH_TYPE || element.type === CheatModeService.SCENE_TYPE) &&
        element.userData.id === object.id &&
        modifiedScene.deletedObjects.includes(object.id));

      if (object3D) {
        object3D.visible = false;
      }
    });
  }

  private changeColorChangedObjectsColor(modifiedScene: ICommonGeometricModifications,
                                         originalSceneThreeJs: THREE.Scene,
                                         modifiedSceneThreeJs: THREE.Scene): void {
    originalSceneThreeJs.children.forEach((child: THREE.Mesh) => {
      if (child.type === CheatModeService.MESH_TYPE) {
        const pair: Pair<string, number> = {
          key: child.userData.id,
          value: (child.material as THREE.MeshPhongMaterial).color.getHex(),
        };
        if (modifiedScene.colorChangedObjects.find(
          (modifiedPair: Pair<string, number>) => this.comparePair(pair, modifiedPair),
        )) {
          const modifiedObject: THREE.Mesh = (modifiedSceneThreeJs.children.find(
            (modifiedChild: THREE.Mesh) => modifiedChild.userData.id === child.userData.id,
          ) as THREE.Mesh);
          child.material = this.generateNewMaterial(pair.value);
          modifiedObject.visible = false;
        }
      }
    });
  }

  private changeThematicChangedObjects(modifiedScene: ICommonThematicModifications,
                                       originalSceneThreeJs: THREE.Scene,
                                       modifiedSceneThreeJs: THREE.Scene): void {
    modifiedScene.texturesChangedObjects.forEach((modifiedPair: Pair<string, string>) => {
      const originalObject: THREE.Object3D | undefined = originalSceneThreeJs.children.find(
        (object: THREE.Object3D) => modifiedPair.key === object.userData.id);
      if (originalObject) {
        originalObject.visible = false;
      }

      const modifiedObject: THREE.Object3D | undefined = modifiedSceneThreeJs.children.find(
        (object: THREE.Object3D) => modifiedPair.key === object.userData.id);
      if (modifiedObject) {
        modifiedObject.visible = false;
      }
    });
  }
  private renderScene(sceneLoader: SceneLoaderService, scene: THREE.Scene): void {
    sceneLoader.scene = scene;
  }

  private generateNewMaterial(color: number): THREE.Material {
    const parameters: THREE.MeshPhongMaterialParameters = { color };

    return new THREE.MeshPhongMaterial(parameters);
  }

  private comparePair(pair1: Pair<string, number>, pair2: Pair<string, number>): boolean {
    return (pair1.key === pair2.key && pair1.value === pair2.value);
  }

  private async restoreOriginalMaterial(): Promise<void> {
    const scene3D: THREE.Scene = this.originalSceneLoaderService.scene;
    scene3D.children.forEach((child: THREE.Object3D) => {
      child.visible = true;
    });
    this.renderScene(this.originalSceneLoaderService, scene3D);
  }

  private async restoreModifiedMaterial(): Promise<void> {
    const scene3D: THREE.Scene = this.modifiedSceneLoaderService.scene;
    scene3D.children.forEach((child: THREE.Object3D) => {
      child.visible = true;
    });
    this.renderScene(this.modifiedSceneLoaderService, scene3D);
  }
}