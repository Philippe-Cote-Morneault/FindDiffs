import { Injectable } from "@angular/core";
import * as THREE from "three";
import { Pair } from "../../../../../common/model/pair";
import { ICommonGeometricModifications } from "../../../../../common/model/scene/modifications/geometricModifications";
import { ICommonSceneModifications } from "../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonGeometricObject } from "../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ICommonScene } from "../../../../../common/model/scene/scene";
import { SceneLoaderService } from "../scene/sceneLoader/sceneLoader.service";
import { ModifiedSceneParserService } from "../scene/sceneParser/modified-scene-parser.service";
import { SceneParserService } from "../scene/sceneParser/scene-parser.service";

@Injectable({
  providedIn: "root",
})
export class CheatModeService {
  public cheatActivated: boolean;
  public originalSceneLoaderService: SceneLoaderService;
  public modifiedSceneLoaderService: SceneLoaderService;
  private originalSceneMaterials: THREE.Material[];
  private modifiedSceneMaterials: THREE.Material[];
  public constructor() {
    this.cheatActivated = false;
    this.originalSceneMaterials = [];
    this.modifiedSceneMaterials = [];
  }

  public toggleCheatMode(event: KeyboardEvent, originalScene: ICommonScene, modifiedScene: ICommonGeometricModifications): void {
    this.cheatActivated = !this.cheatActivated;
    if (this.cheatActivated) {
      this.enableCheats(originalScene, modifiedScene);

    }
  }

  private enableCheats(originalScene: ICommonScene, modifiedScene: ICommonGeometricModifications): void {
    const modifiedSceneThreeJs: THREE.Scene = new ModifiedSceneParserService().parseModifiedScene(originalScene, modifiedScene);
    const originalSceneThreeJs: THREE.Scene = new SceneParserService().parseScene(originalScene);
    /*  if (modifiedScene.deletedObjects.length > 0) {
        originalScene.sceneObjects.forEach((object: ICommonGeometricObject) => {
          originalSceneThreeJs.children.forEach((object3D: THREE.Mesh) => {
            if (object3D.type === "Mesh") {
              if (object3D.userData.id === object.id && modifiedScene.deletedObjects.includes(object.id)) {
                object.color = ~object.color;
                object3D.material = this.generateNewMaterial(object.color);
              }
            }
          });
        });
      }
      if (modifiedScene.addedObjects.length > 0) {
        modifiedScene.addedObjects.forEach((object: ICommonGeometricObject) => {
          modifiedSceneThreeJs.children.forEach((object3D: THREE.Mesh) => {
            if (object3D.type === "Mesh") {
              if (object3D.userData.id === object.id) {
                object.color = ~object.color;
                object3D.material = this.generateNewMaterial(object.color);
              }
            }
          });
        });
      }*/
    if (modifiedScene.colorChangedObjects.length > 0) {
      originalSceneThreeJs.children.forEach((child: THREE.Mesh) => {
        if (child.type === "Mesh") {
          const pair: Pair<string, number> = {
            key: child.userData.id,
            value: (child.material as THREE.MeshPhongMaterial).color.getHex(),
          };
          if (modifiedScene.colorChangedObjects.find(
            (element: Pair<string, number>) => this.comparePair(pair, element),
          )) {
            const modifiedObject: THREE.Mesh = (modifiedSceneThreeJs.children.find(
              (element: THREE.Mesh) => element.userData.id === child.userData.id,
            ) as THREE.Mesh);
            child.material = modifiedObject.material;
            const newMaterial: THREE.Material = this.generateNewMaterial(~modifiedObject.material.color.getHex());
            modifiedObject.material = newMaterial;
          }
        }
      });
    }

    this.renderScene(this.originalSceneLoaderService, originalSceneThreeJs, this.originalSceneLoaderService.camera);
    this.renderScene(this.modifiedSceneLoaderService, modifiedSceneThreeJs, this.modifiedSceneLoaderService.camera);
  }

  private renderScene(sceneLoader: SceneLoaderService, scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    sceneLoader.scene = scene;
    sceneLoader.renderer.render(scene, camera);
  }

  public saveOriginalMaterial(scene: ICommonScene): void {
    const scene3D: THREE.Scene = new SceneParserService().parseScene(scene);
    scene3D.children.forEach((child: THREE.Mesh) => {
      if (child.type === "Mesh") {
        const meshMaterial: THREE.Material | THREE.Material[] = child.material;
        if (meshMaterial instanceof THREE.Material) {
          meshMaterial.userData = { id: child.userData.id };
          this.originalSceneMaterials.push(meshMaterial);
        } else {
          meshMaterial.forEach((material: THREE.Material) => {
            this.originalSceneMaterials.push(material);
          });
        }
      }
    });
  }

  public saveModifiedMaterial(scene: ICommonScene, modifiedScene: ICommonSceneModifications): void {
    const scene3D: THREE.Scene = new ModifiedSceneParserService().parseModifiedScene(scene, modifiedScene);
    scene3D.children.forEach((child: THREE.Mesh) => {
      if (child.type === "Mesh") {
        const meshMaterial: THREE.Material | THREE.Material[] = child.material;
        if (meshMaterial instanceof THREE.Material) {
          meshMaterial.userData = { id: child.userData.id };
          this.modifiedSceneMaterials.push(meshMaterial);
        } else {
          meshMaterial.forEach((material: THREE.Material) => {
            this.modifiedSceneMaterials.push(material);
          });
        }
      }
    });
  }

  private generateNewMaterial(color: number): THREE.Material {
    const parameters: THREE.MeshPhongMaterialParameters = { color };

    return new THREE.MeshPhongMaterial(parameters);
  }

  private comparePair(pair1: Pair<string, number>, pair2: Pair<string, number>): boolean {
    return (pair1.key === pair2.key && pair1.value === pair2.value);
  }

  private restoreScenes(): void {
    
  }
}
