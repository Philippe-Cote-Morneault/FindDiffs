import { Injectable } from "@angular/core";
import * as THREE from "three";
// import { Pair } from "../../../../../common/model/pair";
import { ICommonGeometricModifications } from "../../../../../common/model/scene/modifications/geometricModifications";
import { ICommonGeometricObject } from "../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ICommonSceneObject } from "../../../../../common/model/scene/objects/sceneObject";
import { ICommonScene } from "../../../../../common/model/scene/scene";
import { SceneLoaderService } from "../scene/sceneLoader/sceneLoader.service";
import { ModifiedSceneParserService } from "../scene/sceneParser/modified-scene-parser.service";
import { SceneParserService } from "../scene/sceneParser/scene-parser.service";

@Injectable({
  providedIn: "root",
})
export class CheatModeService {
  private static WHITE: number = 0xFFFFFF;
  public cheatActivated: boolean;
  public originalSceneLoaderService: SceneLoaderService;
  public modifiedSceneLoaderService: SceneLoaderService;

  public constructor() {
    this.cheatActivated = false;
  }

  public toggleCheatMode(event: KeyboardEvent, originalScene: ICommonScene, modifiedScene: ICommonGeometricModifications,
                         originalContainer: HTMLElement | null, modifiedContainer: HTMLElement | null): void {
    this.cheatActivated = !this.cheatActivated;
    if (this.cheatActivated) {
      if (originalContainer && modifiedContainer) {
        this.enableCheats(originalScene, modifiedScene);
      }
    }
  }

  private enableCheats(originalScene: ICommonScene, modifiedScene: ICommonGeometricModifications): void {
    const modifiedSceneThreeJs: THREE.Scene = new ModifiedSceneParserService().parseModifiedScene(originalScene, modifiedScene);
    const originalSceneThreeJs: THREE.Scene = new SceneParserService().parseScene(originalScene);

    if (modifiedScene.deletedObjects.length > 0) {
      modifiedScene.deletedObjects.forEach((id: String) => {
        originalScene.sceneObjects.forEach((object: ICommonGeometricObject) => {
          if (object.id === id) {
            object.color = CheatModeService.WHITE - object.color;
          }
        });
      });
    }

    if (modifiedScene.addedObjects.length > 0) {
      modifiedScene.addedObjects.forEach((object: ICommonGeometricObject) => {
        modifiedSceneThreeJs.children.forEach((objectJs: THREE.Object3D) => {
          if (objectJs.userData.id === object.id) {
            object.color = CheatModeService.WHITE - object.color;
          }
        });
      });
    }
    this.renderScene(this.originalSceneLoaderService, originalSceneThreeJs, this.originalSceneLoaderService.camera);
    this.renderScene(this.modifiedSceneLoaderService, modifiedSceneThreeJs, this.modifiedSceneLoaderService.camera);
  }

  private renderScene(sceneLoader: SceneLoaderService, scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    sceneLoader.scene = scene;
    sceneLoader.renderer.render(scene, camera);
  }
}
