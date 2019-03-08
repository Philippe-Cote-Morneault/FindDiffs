import { Injectable } from "@angular/core";
import * as THREE from "three";
import { ICommonGeometricModifications } from "../../../../../common/model/scene/modifications/geometricModifications";
import { ICommonSceneModifications } from "../../../../../common/model/scene/modifications/sceneModifications";
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

  public cheatActivated: boolean;
  private sceneLoaderService: SceneLoaderService;
  public constructor() {
    this.cheatActivated = false;
    this.sceneLoaderService = new SceneLoaderService();
  }

  public toggleCheatMode(event: KeyboardEvent, originalScene: ICommonScene, modifiedScene: ICommonGeometricModifications,
                         container: HTMLElement | null): void {
    this.cheatActivated = !this.cheatActivated;
    if (this.cheatActivated) {
      if (container) {
        this.enableCheats(originalScene, modifiedScene, container);

      }
    }
  }

  private enableCheats(originalScene: ICommonScene, modifiedScene: ICommonGeometricModifications, container: HTMLElement): void {
    const originalSceneThreeJs: THREE.Scene = new SceneParserService().parseScene(originalScene);
    const modifiedSceneThreeJs: THREE.Scene = new ModifiedSceneParserService().parseModifiedScene(originalScene, modifiedScene);

    container.removeChild(container.childNodes[0]);
    originalSceneThreeJs.translateX(1);

    if (modifiedScene.addedObjects.length > 0) {
      modifiedScene.addedObjects.forEach((object: ICommonGeometricObject) => {
        modifiedSceneThreeJs.children.forEach((objectJs) => {
          if (objectJs.userData.id === object.id) {
            // tslint:disable-next-line:no-magic-numbers
            object.color = 0xFFFF;
          }
        });
      });
    }
    if (modifiedScene.deletedObjects.length  > 0) {
      // add code
    }
    if (modifiedScene.colorChangedObjects.length > 0) {
      // add code
    }
    this.renderNewScene(modifiedSceneThreeJs, container);
  }

  private renderNewScene(newScene: THREE.Scene, container: HTMLElement): void {
    this.sceneLoaderService.scene = newScene;
    this.sceneLoaderService.renderScene(container, true);
  }
}
