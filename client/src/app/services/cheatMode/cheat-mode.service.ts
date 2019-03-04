import { Injectable } from "@angular/core";
import * as THREE from "three";
import { ICommonSceneModifications } from "../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonSceneObject } from "../../../../../common/model/scene/objects/sceneObject";
import { ICommonScene } from "../../../../../common/model/scene/scene";

@Injectable({
  providedIn: "root",
})
export class CheatModeService {

  public cheatActivated: boolean;
  public constructor() {
    this.cheatActivated = false;
  }

  public toggleCheatMode(event: KeyboardEvent, originalScene: ICommonScene, modifiedScene: ICommonSceneModifications): void {
    this.cheatActivated = !this.cheatActivated;
    if (this.cheatActivated) {
      this.enableCheats(originalScene, modifiedScene);
    }
  }

  private enableCheats(originalScene: ICommonScene, modifiedScene: ICommonSceneModifications): void {
    if (modifiedScene.addedObjects.length > 0) {
      modifiedScene.addedObjects.forEach((object: ICommonSceneObject) => {
        // ajouter code
      });
    } else if (modifiedScene.deletedObjects.length  > 0) {
      originalScene.sceneObjects.forEach((object: ICommonSceneObject) => {
        if (modifiedScene.deletedObjects.includes(object.id)) {
          // ajouter code
        }
      });
    } else {
      // ajouter code
    }
  }
}
