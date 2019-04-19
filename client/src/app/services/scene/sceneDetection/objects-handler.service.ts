import { ElementRef, Injectable } from "@angular/core";
import * as THREE from "three";
import { Event, ICommonSocketMessage } from "../../../../../../common/communication/webSocket/socketMessage";
import { ICommon3DObject } from "../../../../../../common/model/positions";
import { ObjectType } from "../../../../../../common/model/scene/scene";
import { IdentificationError } from "../../IdentificationError/identificationError.service";
import { GameService } from "../../game/game.service";
import { SceneLoaderService } from "../../scene/sceneLoader/sceneLoader.service";
import { SocketHandlerService } from "../../socket/socketHandler.service";
import { MousePositionService } from "../sceneDetection/mouse-position.service";
import { IThreeObject } from "./IThreeObject";
import { ObjectDetectionService } from "./object-detection.service";

@Injectable({
    providedIn: "root",
})
export class ObjectHandler {

    public detectedObjects: IThreeObject;
    public meshesOriginal: THREE.Object3D[];
    public meshesModified: THREE.Object3D[];
    public originalGame: ElementRef<HTMLElement>;
    public modifiedGame: ElementRef<HTMLElement>;
    public scenePairId: string;
    public gameType: ObjectType;

    public constructor( private mousePositionService: MousePositionService,
                        private objectDetectionService: ObjectDetectionService,
                        public originalSceneLoader: SceneLoaderService,
                        public modifiedSceneLoader: SceneLoaderService,
                        private socket: SocketHandlerService,
                        private identificationError: IdentificationError,
                        private game: GameService) {
        this.meshesOriginal = [];
        this.meshesModified = [];
    }

    public async clickOnScene(event: MouseEvent, isOriginalScene: boolean): Promise<void> {
        if (this.clickAreAllowed()) {
            this.identificationError.moveClickError(event.pageX, event.pageY);
            const mouse: THREE.Vector2 = new THREE.Vector2();
            this.adjustMouse(isOriginalScene, event, mouse);

            this.detectedObjects = this.objectDetectionService.rayCasting(mouse,
                                                                          this.originalSceneLoader.camera, this.modifiedSceneLoader.camera,
                                                                          this.originalSceneLoader.scene, this.modifiedSceneLoader.scene,
                                                                          this.meshesOriginal, this.meshesModified);
            this.emitEvent(this.detectedObjects.modified);
        }
    }

    private adjustMouse(isOriginalScene: boolean, event: MouseEvent, mouse: THREE.Vector2): void {
        isOriginalScene ?
        this.mousePositionService.setMousePosition(event, mouse,
                                                   this.originalGame.nativeElement.getBoundingClientRect(),
                                                   this.originalGame.nativeElement.clientWidth,
                                                   this.originalGame.nativeElement.clientHeight) :
        this.mousePositionService.setMousePosition(event, mouse,
                                                   this.modifiedGame.nativeElement.getBoundingClientRect(),
                                                   this.modifiedGame.nativeElement.clientWidth,
                                                   this.modifiedGame.nativeElement.clientHeight);

    } 

    private emitEvent(modifiedObject: THREE.Object3D | undefined): void {
        if (modifiedObject) {
            this.emitDifference(this.scenePairId, this.detectedObjects.original.userData.id,
                                modifiedObject.userData.id, this.gameType);
        } else {
            this.socket.emitMessage(Event.InvalidClick, null);
        }
    }

    private emitDifference(scenePairId: string, originalObjectId: string,
                           modifiedObjectId: string, gameType: ObjectType): void {
        const clickInfo: ICommon3DObject = {
            scenePairId: scenePairId,
            originalObjectId: originalObjectId,
            modifiedObjectId: modifiedObjectId,
            gameType: gameType,
        };
        const message: ICommonSocketMessage = {
            data: clickInfo,
            timestamp: new Date(),
        };
        this.socket.emitMessage(Event.GameClick, message);
    }

    private clickAreAllowed(): boolean {
        return !this.identificationError.getTimeout() && this.game.getGameStarted();
    }
}
