import { ElementRef, Injectable } from "@angular/core";
import { Event, ICommonSocketMessage } from "../../../../../../common/communication/webSocket/socketMessage";
import { DifferenceType, ICommonReveal3D } from "../../../../../../common/model/reveal";
// import { ICommonReveal3D } from "../../../../../../common/model/reveal";
// import { DifferenceType, ICommonReveal3D } from "../../../../../../common/model/reveal";
import { SceneLoaderService } from "../../scene/sceneLoader/sceneLoader.service";
import { SocketHandlerService } from "../../socket/socketHandler.service";
import { SocketSubscriber } from "../../socket/socketSubscriber";
import { IThreeObject, IThreeScene } from "./IThreeObject";

@Injectable({
  providedIn: "root",
})
export class ObjectRestorationService implements SocketSubscriber {
  public originalScene: ElementRef<HTMLElement>;
  public modifiedScene: ElementRef<HTMLElement>;
  public detectedObjects: IThreeObject;

  public differenceFound: string[];

  public constructor( public socketService: SocketHandlerService,
                      public originalSceneLoader: SceneLoaderService,
                      public modifiedSceneLoader: SceneLoaderService) {
    this.differenceFound = [];
    this.subscribeToSocket();
  }

  public setContainers(originalScene: ElementRef<HTMLElement>, modifiedScene: ElementRef<HTMLElement>): void {
    this.originalScene = originalScene;
    this.modifiedScene = modifiedScene;
  }

  public set(originalSceneLoader: SceneLoaderService, modifiedSceneLoader: SceneLoaderService, detectedObjects: IThreeObject): void {
    this.originalSceneLoader = originalSceneLoader;
    this.modifiedSceneLoader = modifiedSceneLoader;
    this.detectedObjects = detectedObjects;
  }

  private subscribeToSocket(): void {
    this.socketService.subscribe(Event.DifferenceFound, this);
  }

  public notify(event: Event, message: ICommonSocketMessage): void {
    if (event === Event.DifferenceFound) {
        const response: ICommonReveal3D = message.data as ICommonReveal3D;
        this.restoreObject(response);
    }
  }

  public restoreObject(response: ICommonReveal3D ): void {
    const scenes: IThreeScene = { original: this.originalSceneLoader.scene, modified: this.modifiedSceneLoader.scene };
    switch (response.differenceType) {
        case DifferenceType.removedObject:
            this.addObject(this.detectedObjects.original, scenes, false);
            // await this.addDifference(this.detectedObjects.original.userData.id);
            break;
        case DifferenceType.colorChanged:
            this.changeColorObject(this.detectedObjects.original, this.detectedObjects.modified);
            // await this.addDifference(this.detectedObjects.original.userData.id);
            break;
        case DifferenceType.textureObjectChanged:
            // tslint:disable-next-line: max-line-length
            this.changeTextureObject(this.detectedObjects.original,
                                     this.detectedObjects.modified, scenes);
            // await this.addDifference(this.detectedObjects.original.userData.id);
            break;
        case DifferenceType.addedObject:
            this.removeObject(this.detectedObjects.modified, scenes);
            // await this.addDifference(this.detectedObjects.modified.userData.id);
            break;
        default:
            break;
      }
  }

  // Verify without promises !

  public addObject(objectOriginal: THREE.Object3D, scene: IThreeScene, isTexture: boolean): void {
        if (this.isANewDifference(objectOriginal.userData.id) || isTexture) {
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
            (objectModified as any).material.color.setHex((objectOriginal as any).material.color.getHex());
            this.addDifference(objectOriginal.userData.id);

        }
    }

  public changeTextureObject(objectOriginal: THREE.Object3D, objectModified: THREE.Object3D, scene: IThreeScene): void {
        if (this.isANewDifference(objectModified.userData.id)) {
            if (objectModified.userData.isTextured) {
                this.removeObject(objectModified, scene);
                this.addObject(objectOriginal, scene, true);
            }
            this.addDifference(objectOriginal.userData.id);
        }
    }

  public addDifference(differenceId: string): void {
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
}