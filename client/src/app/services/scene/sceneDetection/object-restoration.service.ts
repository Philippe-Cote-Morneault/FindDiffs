import { ElementRef, Injectable, OnDestroy } from "@angular/core";
import * as THREE from "three";
import { ICommonDifferenceFound } from "../../../../../../common/communication/webSocket/differenceFound";
import { Event, ICommonSocketMessage } from "../../../../../../common/communication/webSocket/socketMessage";
import { DifferenceType, ICommonReveal3D } from "../../../../../../common/model/reveal";
import { SceneLoaderService } from "../../scene/sceneLoader/sceneLoader.service";
import { SocketHandlerService } from "../../socket/socketHandler.service";
import { SocketSubscriber } from "../../socket/socketSubscriber";
import { IThreeObject, IThreeScene } from "./IThreeObject";

@Injectable({
    providedIn: "root",
})
export class ObjectRestorationService implements SocketSubscriber, OnDestroy {
    public originalScene: ElementRef<HTMLElement>;
    public modifiedScene: ElementRef<HTMLElement>;
    public detectedObjects: IThreeObject;

    public differenceFound: string[];

    public constructor(private socketService: SocketHandlerService,
                       private originalSceneLoader: SceneLoaderService,
                       private modifiedSceneLoader: SceneLoaderService,
                       private socket: SocketHandlerService) {
        this.differenceFound = [];
        this.subscribeToSocket();
    }

    public setContainers(originalScene: ElementRef<HTMLElement>, modifiedScene: ElementRef<HTMLElement>): void {
        this.originalScene = originalScene;
        this.modifiedScene = modifiedScene;
    }

    public set(originalSceneLoader: SceneLoaderService, modifiedSceneLoader: SceneLoaderService): void {
        this.originalSceneLoader = originalSceneLoader;
        this.modifiedSceneLoader = modifiedSceneLoader;
    }

    public ngOnDestroy(): void {
        this.socketService.unsubscribe(Event.DifferenceFound, this);
    }

    private subscribeToSocket(): void {
        this.socketService.subscribe(Event.DifferenceFound, this);
    }

    public async notify(event: Event, message: ICommonSocketMessage): Promise<void> {
        const response: ICommonReveal3D = (message.data as ICommonDifferenceFound).reveal as ICommonReveal3D;
        await this.restoreObject(response);
    }

    public async restoreObject(response: ICommonReveal3D): Promise<void> {
        const scenes: IThreeScene = { original: this.originalSceneLoader.scene, modified: this.modifiedSceneLoader.scene };
        switch (response.differenceType) {
            case DifferenceType.removedObject:
                this.addObject(response.difference_id, scenes, false);
                break;
            case DifferenceType.colorChanged:
                this.changeColorObject(response.difference_id, scenes);
                break;
            case DifferenceType.textureObjectChanged:
                await this.changeTextureObject(response.difference_id, scenes);
                break;
            case DifferenceType.addedObject:
                this.removeObject(response.difference_id, scenes);
                break;
            default:
                break;
        }
    }

    public addObject(objectOriginal: string, scene: IThreeScene, isTexture: boolean): void {
        if (this.isANewDifference(objectOriginal) || isTexture) {
            if (scene.original) {
                scene.original.children.forEach((element) => {
                    if (element.userData.id === objectOriginal) {
                        if (scene.modified) {
                            scene.modified.add(element.clone());
                        }
                    }
                });
                this.addDifference(objectOriginal);
            }
        }
    }

    public removeObject(objectModified: string, scene: IThreeScene): void {
        if (this.isANewDifference(objectModified)) {
            if (scene.modified) {
                scene.modified.children.forEach((element) => {
                    if (element.userData.id === objectModified) {
                        if (scene.modified) {
                            scene.modified.remove(element);
                        }
                    }
                });
            }
            this.addDifference(objectModified);
        }
    }

    public changeColorObject(object: string, scenes: IThreeScene): void {
        if (this.isANewDifference(object)) {
            const originalSceneObject: THREE.Object3D | undefined = this.getOriginalSceneObject(object, scenes);
            if (scenes.modified) {
                scenes.modified.children.forEach((sceneObject) => {
                    if (sceneObject.userData.id === object) {
                        // tslint:disable-next-line:no-any
                        (sceneObject as any).material.color.setHex((originalSceneObject as any).material.color.getHex());
                    }
                });
                this.addDifference(object);
            }

        }
    }

    private getOriginalSceneObject(object: string, scene:  IThreeScene): THREE.Object3D | undefined {
        let originalSceneObject: THREE.Object3D = new THREE.Object3D;
        if (scene.original) {
            scene.original.children.forEach((sceneObject) => {
                if (sceneObject.userData.id === object) {
                    originalSceneObject = sceneObject;
                }
            });

            return originalSceneObject;
        }

        return undefined;
    }

    public async changeTextureObject(object: string, scene: IThreeScene): Promise<void> {
        if (this.isANewDifference(object)) {
            this.removeObject(object, scene);
            this.addObject(object, scene, true);
            this.addDifference(object);
        } else {
            this.socket.emitMessage(Event.InvalidClick, null);
        }
    }

    public addDifference(differenceId: string): void {
        this.differenceFound[this.differenceFound.length++] = differenceId;
    }

    private isANewDifference(differenceId: string): boolean {
        return !this.differenceFound.includes(differenceId);
    }
}
