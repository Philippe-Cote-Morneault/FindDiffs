import { ElementRef, Injectable } from "@angular/core";
import * as THREE from "three";
import { Event, ICommonSocketMessage } from "../../../../../common/communication/webSocket/socketMessage";
import { ICommon3DObject } from "../../../../../common/model/positions";
import { ObjectType } from "../../../../../common/model/scene/scene";
import { IdentificationError } from "../IdentificationError/identificationError.service";
import { GameService } from "../game/game.service";
import { SceneLoaderService } from "../scene/sceneLoader/sceneLoader.service";
import { SocketHandlerService } from "../socket/socketHandler.service";
import { IThreeObject } from "./GeometricObjects/IThreeObject";
import { GeometricObjectsService } from "./GeometricObjects/geometric-objects.service";
import { MousePositionService } from "./mousePosition.service";
import { ObjectDetectionService } from "./object-detection.service";
import { ObjectRestorationService } from "./object-restoration.service";

@Injectable({
    providedIn: "root",
})
export class ObjectHandler {

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
                       public geometricObjectService: GeometricObjectsService,
                       public socket: SocketHandlerService,
                       private identificationError: IdentificationError,
                       private game: GameService,
                       public objectRestorationService: ObjectRestorationService) {
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

        this.objectRestorationService = new ObjectRestorationService(this.socket,
                                                                     this.detectedObjects,
                                                                     this.originalSceneLoader,
                                                                     this.modifiedSceneLoader);

        this.emitDifference(event, this.scenePairId, this.detectedObjects.original.userData.id,
                            this.detectedObjects.modified.userData.id, this.gameType);
    }

    private emitDifference(event: MouseEvent,
                           scenePairId: string, originalObjectId: string,
                           modifiedObjectId: string, gameType: ObjectType): void {
        // const scenes: IThreeScene = { original: this.originalSceneLoader.scene, modified: this.modifiedSceneLoader.scene };
        if (this.clickAreAllowed()) {
            this.identificationError.moveClickError(event.pageX, event.pageY);

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
    }

    private clickAreAllowed(): boolean {
        return !this.identificationError.getTimeout() && this.game.getGameStarted();
    }
}
