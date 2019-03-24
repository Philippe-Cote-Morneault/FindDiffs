import { ElementRef, Injectable } from "@angular/core";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { DifferenceType, ICommonReveal3D } from "../../../../../common/model/reveal";
import { SceneLoaderService } from "../scene/sceneLoader/sceneLoader.service";
import { SocketHandlerService } from "../socket/socketHandler.service";
import { IThreeObject, IThreeScene } from "./GeometricObjects/IThreeObject";

@Injectable({
  providedIn: "root",
})
export class ObjectRestorationService {
  public originalScene: ElementRef<HTMLElement>;
  public modifiedScene: ElementRef<HTMLElement>;

  private differenceFound: string[];

  public constructor(private socketService: SocketHandlerService,
                     private detectedObjects: IThreeObject,
                     private originalSceneLoader: SceneLoaderService,
                     private modifiedSceneLoader: SceneLoaderService ) {
    this.differenceFound = [];
    this.subscribeToSocket();
  }

  public setContainers(originalScene: ElementRef<HTMLElement>, modifiedScene: ElementRef<HTMLElement>): void {
    this.originalScene = originalScene;
    this.modifiedScene = modifiedScene;
  }

  private subscribeToSocket(): void {
      this.socketService.subscribe(Event.DifferenceFound, this);
  }

  public async notify(event: Event, message: ICommonSocketMessage): Promise<void> {
      if (event === Event.DifferenceFound) {
          const response: ICommonReveal3D = message.data as ICommonReveal3D;
          await this.restoreObject(response);
      }
  }

  public async restoreObject(response: ICommonReveal3D): Promise<void> {
    const scenes: IThreeScene = { original: this.originalSceneLoader.scene, modified: this.modifiedSceneLoader.scene };
    switch (response.differenceType) {
        case DifferenceType.removedObject:
            await this.addObject(this.detectedObjects.original, scenes, false);
            // await this.addDifference(this.detectedObjects.original.userData.id);
            break;
        case DifferenceType.colorChanged:
            await this.changeColorObject(this.detectedObjects.original, this.detectedObjects.modified);
            // await this.addDifference(this.detectedObjects.original.userData.id);
            break;
        case DifferenceType.textureObjectChanged:
            // tslint:disable-next-line: max-line-length
            await this.changeTextureObject(this.detectedObjects.original,
                                           this.detectedObjects.modified, scenes);
            // await this.addDifference(this.detectedObjects.original.userData.id);
            break;
        case DifferenceType.addedObject:
            await this.removeObject(this.detectedObjects.modified, scenes);
            // await this.addDifference(this.detectedObjects.modified.userData.id);
            break;
        default:
            break;
      }
  }

  // Verify without promises !

  public async addObject(objectOriginal: THREE.Object3D, scene: IThreeScene, isTexture: boolean): Promise<void> {
        if (this.isANewDifference(objectOriginal.userData.id) || isTexture) {
            scene.original.children.forEach((element) => {
                if (element.userData.id === objectOriginal.userData.id) {
                    scene.modified.add(element.clone());
                }
            });
            await this.addDifference(objectOriginal.userData.id);
        }
    }

  public async removeObject(objectModified: THREE.Object3D, scene: IThreeScene): Promise<void> {
        if (this.isANewDifference(objectModified.userData.id)) {
            scene.modified.children.forEach((element) => {
                if (element.userData.id === objectModified.userData.id) {
                    scene.modified.remove(element);
                }
            });
            await this.addDifference(objectModified.userData.id);
        }
    }

  public async changeColorObject(objectOriginal: THREE.Object3D, objectModified: THREE.Object3D): Promise<void> {
        if (this.isANewDifference(objectModified.userData.id)) {
            // tslint:disable-next-line:no-any
            (objectModified as any).material.color.setHex((objectOriginal as any).material.color.getHex());
            await this.addDifference(objectOriginal.userData.id);

        }
    }

  public async changeTextureObject(objectOriginal: THREE.Object3D, objectModified: THREE.Object3D, scene: IThreeScene): Promise<void> {
        if (this.isANewDifference(objectModified.userData.id)) {
            if (objectModified.userData.isTextured) {
                await this.removeObject(objectModified, scene);
                await this.addObject(objectOriginal, scene, true);
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
}
