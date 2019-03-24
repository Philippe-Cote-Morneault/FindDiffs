import { ElementRef, Injectable } from "@angular/core";
import * as THREE from "three";
import { DifferenceType, ICommonReveal3D } from "../../../../../common/model/reveal";
import { ObjectType } from "../../../../../common/model/scene/scene";
import { SceneLoaderService } from "../scene/sceneLoader/sceneLoader.service";
import { ThematicObjectParser } from "../scene/sceneParser/objectParser/thematicObjectParser";
import { IThreeObject, IThreeScene } from "./GeometricObjects/IThreeObject";
import { GeometricObjectsService } from "./GeometricObjects/geometric-objects.service";
import { MousePositionService } from "./mousePosition.service";
import { ObjectDetectionService } from "./object-detection.service";

@Injectable({
  providedIn: "root",
})
export class RestoreObjectsService {

  private differenceFound: string[];
  private meshesOriginal: THREE.Object3D[];
  private meshesModified: THREE.Object3D[];
  private thematicObjectParser: ThematicObjectParser;

  private detectedObjects: IThreeObject;

  public constructor( public mousePositionService: MousePositionService,
                      public objectDetectionService: ObjectDetectionService,
                      public originalSceneLoader: SceneLoaderService,
                      public modifiedSceneLoader: SceneLoaderService,
                      public restoreObjectsService: RestoreObjectsService,
                      public geometricObjectService: GeometricObjectsService ) {
    this.differenceFound = [];
    this.meshesOriginal = [];
    this.meshesModified = [];
    this.thematicObjectParser = new ThematicObjectParser();
  }

  public clickOnScene(event: MouseEvent, scenePairId: string, isOriginalScene: boolean,
                      originalGame: ElementRef<HTMLElement>, modifiedGame: ElementRef<HTMLElement>,
                      originalSceneLoader: SceneLoaderService, modifiedSceneLoader: SceneLoaderService): void {
    this.originalSceneLoader = originalSceneLoader;
    this.modifiedSceneLoader = modifiedSceneLoader;

    this.fillMeshes(this.meshesOriginal, this.originalSceneLoader);
    this.fillMeshes(this.meshesModified, this.modifiedSceneLoader);

    const mouse: THREE.Vector2 = new THREE.Vector2();
    isOriginalScene ?
        this.mousePositionService.setMousePosition(event, mouse, originalGame) :
        this.mousePositionService.setMousePosition(event, mouse, modifiedGame);

    this.detectedObjects = this.objectDetectionService.rayCasting(mouse,
                                                                  this.originalSceneLoader.camera, modifiedSceneLoader.camera,
                                                                  this.originalSceneLoader.scene, modifiedSceneLoader.scene,
                                                                  this.meshesOriginal, this.meshesModified);

    this.postDifference(scenePairId, this.detectedObjects.original.userData.id, this.detectedObjects.modified.userData.id);
}

  private postDifference(scenePairId: string, originalObjectId: string, modifiedObjectId: string): void {
    const scenes: IThreeScene = { original: this.originalSceneLoader.scene, modified: this.modifiedSceneLoader.scene };
    this.geometricObjectService.post3DObject(scenePairId, modifiedObjectId, originalObjectId, ObjectType.Geometric)
        .subscribe(async (response: ICommonReveal3D) => {
            switch (response.differenceType) {
                case DifferenceType.removedObject:
                    this.restoreObjectsService.addObject(this.detectedObjects.original, scenes);
                    // await this.addDifference(this.detectedObjects.original.userData.id);
                    break;
                case DifferenceType.colorChanged:
                    this.restoreObjectsService.changeColorObject(this.detectedObjects.original, this.detectedObjects.modified);
                    // await this.addDifference(this.detectedObjects.original.userData.id);
                    break;
                case DifferenceType.textureObjectChanged:
                    // tslint:disable-next-line: max-line-length
                    await this.restoreObjectsService.changeTextureObject(this.detectedObjects.original, this.detectedObjects.modified, this.thematicObjectParser);
                    // await this.addDifference(this.detectedObjects.original.userData.id);
                    break;
                case DifferenceType.addedObject:
                    this.restoreObjectsService.removeObject(this.detectedObjects.modified, scenes);
                    // await this.addDifference(this.detectedObjects.modified.userData.id);
                    break;
                default:
                    break;
            }
        });
}

  public addObject(objectOriginal: THREE.Object3D, scene: IThreeScene): void {
      if (this.isANewDifference(objectOriginal.userData.id)) {
          scene.original.children.forEach((element) => {
              if (element.userData.id === objectOriginal.userData.id) {
                  scene.modified.add(element.clone());
              }
          });
          this.addDifference(objectOriginal.userData.id);
      }
  }

  public removeObject(objectModified: THREE.Object3D, scene: IThreeScene): void {
      if (this.isANewDifference(objectModified.userData.id)) {
        scene.modified.children.forEach((element) => {
              if (element.userData.id === objectModified.userData.id) {
                  scene.modified.remove(element);
              }
          });
        this.addDifference(objectModified.userData.id);
      }
  }

  public changeColorObject(objectOriginal: THREE.Object3D, objectModified: THREE.Object3D): void {
      if (this.isANewDifference(objectModified.userData.id)) {
          // tslint:disable-next-line:no-any
          console.log(objectModified);
          (objectModified as any).material.color.setHex((objectOriginal as any).material.color.getHex());
          this.addDifference(objectOriginal.userData.id);

      }
  }

  public async changeTextureObject(objectOriginal: THREE.Object3D, objectModified: THREE.Object3D,
                                   thematicObjectParser: ThematicObjectParser): Promise<void> {
      if (this.isANewDifference(objectModified.userData.id)) {
          if (objectModified.userData.isTextured) {
              if (objectModified.type === "Mesh") {
                  await thematicObjectParser.loadTexture(objectModified, objectModified.name, objectOriginal.userData.texture);
              } else {
                  objectModified.traverse(async (child: THREE.Mesh) => {
                      await thematicObjectParser.loadTexture(child, child.name, objectOriginal.userData.texture);
                  });
              }
          }
          await this.addDifference(objectOriginal.userData.id);
      }
  }

  public async addDifference(differenceId: string): Promise<void> {
    this.differenceFound[this.differenceFound.length++] = differenceId;
    // this.differenceCounterUser = this.differenceCounterUser + 1;
    // await this.differenceSound.play();
    // if (this.differenceCounterUser === GameViewFreeComponent.MAX_DIFFERENCES) {
    //     this.gameOver();
    // }
}

  private isANewDifference(differenceId: string): boolean {
    return !this.differenceFound.includes(differenceId);
  }

  private fillMeshes(meshes: THREE.Object3D[], sceneLoader: SceneLoaderService): void {
    sceneLoader.scene.children.forEach((element) => {
        if (element.type === "Mesh" || element.type === "Scene") {
            meshes.push(element);
        }
    });
  }
}
