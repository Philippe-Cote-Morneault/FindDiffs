import { ElementRef, Injectable } from "@angular/core";
import * as THREE from "three";
import { DifferenceType, ICommonReveal3D } from "../../../../../common/model/reveal";
import { ObjectType } from "../../../../../common/model/scene/scene";
import { SceneLoaderService } from "../scene/sceneLoader/sceneLoader.service";
import { IThreeObject, IThreeScene } from "./GeometricObjects/IThreeObject";
import { GeometricObjectsService } from "./GeometricObjects/geometric-objects.service";
import { MousePositionService } from "./mousePosition.service";
import { ObjectDetectionService } from "./object-detection.service";

@Injectable({
    providedIn: "root",
})
export class RestoreObjectsService {

    private differenceFound: string[];
    private detectedObjects: IThreeObject;
    public meshesOriginal: THREE.Object3D[];
    public meshesModified: THREE.Object3D[];
    public gameType: ObjectType;
    public scenePairId: string;
    public originalGame: ElementRef<HTMLElement>;
    public modifiedGame: ElementRef<HTMLElement>;

    public constructor(public mousePositionService: MousePositionService,
                       public objectDetectionService: ObjectDetectionService,
                       public originalSceneLoader: SceneLoaderService,
                       public modifiedSceneLoader: SceneLoaderService,
                       public restoreObjectsService: RestoreObjectsService,
                       public geometricObjectService: GeometricObjectsService) {
        this.differenceFound = [];
        this.meshesOriginal = [];
        this.meshesModified = [];
    }

    public clickOnScene(event: MouseEvent, isOriginalScene: boolean): void {

        const mouse: THREE.Vector2 = new THREE.Vector2();
        isOriginalScene ?
            this.mousePositionService.setMousePosition(event, mouse, this.originalGame) :
            this.mousePositionService.setMousePosition(event, mouse, this.modifiedGame);

        this.detectedObjects = this.objectDetectionService.rayCasting(mouse,
                                                                      this.originalSceneLoader.camera, this.modifiedSceneLoader.camera,
                                                                      this.originalSceneLoader.scene, this.modifiedSceneLoader.scene,
                                                                      this.meshesOriginal, this.meshesModified);

        this.postDifference(this.scenePairId, this.detectedObjects.original.userData.id,
                            this.detectedObjects.modified.userData.id, this.gameType);
    }

    private postDifference(scenePairId: string, originalObjectId: string, modifiedObjectId: string, gameType: ObjectType): void {
        const scenes: IThreeScene = { original: this.originalSceneLoader.scene, modified: this.modifiedSceneLoader.scene };
        this.geometricObjectService.post3DObject(scenePairId, modifiedObjectId, originalObjectId, gameType)
            .subscribe(async (response: ICommonReveal3D) => {
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
                        await this.changeTextureObject(this.detectedObjects.original,
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
            });
    }

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
