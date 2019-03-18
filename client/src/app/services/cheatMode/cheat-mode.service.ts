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
  private static readonly WHITE: number = 0xFFFFFF;
  private static readonly MESH_TYPE: string = "Mesh";
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

  public async toggleCheatMode(originalScene: ICommonScene, modifiedScene: ICommonGeometricModifications): Promise<void> {
    this.cheatActivated = !this.cheatActivated;
    if (this.cheatActivated) {
      await this.enableCheats(originalScene, modifiedScene);
    } else {

      await this.restoreOriginalMaterial();
      await this.restoreModifiedMaterial();

    }
  }

  private async enableCheats(originalScene: ICommonScene, modifiedScene: ICommonGeometricModifications): Promise<void> {
    const modifiedSceneThreeJs: THREE.Scene = this.modifiedSceneLoaderService.scene;
    const originalSceneThreeJs: THREE.Scene = this.originalSceneLoaderService.scene;
    if (modifiedScene.deletedObjects.length > 0) {
      this.changeDeletedObjectsColor(originalScene, modifiedScene, originalSceneThreeJs);
    }
    if (modifiedScene.addedObjects.length > 0) {
      this.changeAddedObjectsColor(modifiedScene, modifiedSceneThreeJs);
    }
    if (modifiedScene.colorChangedObjects.length > 0) {
      this.changeColorChangedObjectsColor(modifiedScene, originalSceneThreeJs, modifiedSceneThreeJs);
    }

    this.renderScene(this.originalSceneLoaderService, originalSceneThreeJs);
    this.renderScene(this.modifiedSceneLoaderService, modifiedSceneThreeJs);
  }

  private changeDeletedObjectsColor(originalScene: ICommonScene,
                                    modifiedScene: ICommonGeometricModifications,
                                    originalSceneThreeJs: THREE.Scene): void {
    originalScene.sceneObjects.forEach((object: ICommonGeometricObject) => {
      const object3D: THREE.Object3D | undefined = originalSceneThreeJs.children.find(
        (element: THREE.Mesh) => element.type === CheatModeService.MESH_TYPE &&
        element.userData.id === object.id &&
        modifiedScene.deletedObjects.includes(object.id),
      );
      if (object3D instanceof THREE.Mesh) {
        object3D.material = this.generateNewMaterial(CheatModeService.WHITE - object.color);
      }
    });
  }

  private changeAddedObjectsColor(modifiedScene: ICommonGeometricModifications, modifiedSceneThreeJs: THREE.Scene): void {
    modifiedScene.addedObjects.forEach((object: ICommonGeometricObject) => {
      const object3D: THREE.Object3D | undefined = modifiedSceneThreeJs.children.find(
        (element: THREE.Mesh) => element.type === CheatModeService.MESH_TYPE && element.userData.id === object.id);
      if (object3D instanceof THREE.Mesh) {
        object3D.material = this.generateNewMaterial(CheatModeService.WHITE - object.color);
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
          (element: Pair<string, number>) => this.comparePair(pair, element),
        )) {
          const modifiedObject: THREE.Mesh = (modifiedSceneThreeJs.children.find(
            (element: THREE.Mesh) => element.userData.id === child.userData.id,
          ) as THREE.Mesh);
          child.material = this.generateNewMaterial(pair.value);
          const newMaterial: THREE.Material = this.generateNewMaterial(
            CheatModeService.WHITE - (modifiedObject.material as THREE.MeshPhongMaterial).color.getHex(),
          );
          modifiedObject.material = newMaterial;
        }
      }
    });
  }
  private renderScene(sceneLoader: SceneLoaderService, scene: THREE.Scene): void {
    sceneLoader.scene = scene;
  }

  public async saveOriginalMaterial(scene: ICommonScene): Promise<void> {
    const scene3D: THREE.Scene = await new SceneParserService().parseScene(scene);
    scene3D.children.forEach((child: THREE.Mesh) => {
      if (child.type === CheatModeService.MESH_TYPE) {
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

  public async saveModifiedMaterial(scene: ICommonScene, modifiedScene: ICommonSceneModifications): Promise<void> {
    const scene3D: THREE.Scene = await new ModifiedSceneParserService().parseModifiedScene(scene, modifiedScene);
    scene3D.children.forEach((child: THREE.Mesh) => {
      if (child.type === CheatModeService.MESH_TYPE) {
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

  private async restoreOriginalMaterial(): Promise<void> {
    const scene3D: THREE.Scene = this.originalSceneLoaderService.scene;
    scene3D.children.forEach((child: THREE.Mesh) => {
      if (child.type === CheatModeService.MESH_TYPE) {
        if (child.material instanceof THREE.Material) {
          child.material = (this.originalSceneMaterials.find(
            (material: THREE.Material) => material.userData.id === child.userData.id) as THREE.Material);
        } else {
          child.material.forEach((material: THREE.Material) => {
            material = (this.originalSceneMaterials.find(
              (originalMaterial: THREE.Material) => originalMaterial.userData.id === material.userData.id) as THREE.Material);
          });
        }
      }
    });
    this.renderScene(this.originalSceneLoaderService, scene3D);
  }

  private async restoreModifiedMaterial(): Promise<void> {
    const scene3D: THREE.Scene = this.modifiedSceneLoaderService.scene;
    scene3D.children.forEach((child: THREE.Mesh) => {
      if (child.type === CheatModeService.MESH_TYPE) {
        if (child.material instanceof THREE.Material) {
          child.material = (this.modifiedSceneMaterials.find(
            (material: THREE.Material) => material.userData.id === child.userData.id) as THREE.Material);
        } else {
          child.material.forEach((material: THREE.Material) => {
            material = (this.originalSceneMaterials.find(
              (originalMaterial: THREE.Material) => originalMaterial.userData.id === material.userData.id) as THREE.Material);
          });
        }
      }
    });
    this.renderScene(this.modifiedSceneLoaderService, scene3D);
  }
}
