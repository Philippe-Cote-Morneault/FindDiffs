import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import * as THREE from "three";
import { Event } from "../../../../common/communication/webSocket/socketMessage";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import { ICommonThematicModifications } from "../../../../common/model/scene/modifications/thematicModifications";
import { ICommonScene, ObjectType } from "../../../../common/model/scene/scene";
import { GeometricObjectsService } from "../services/3DObjects/GeometricObjects/geometric-objects.service";
import { MousePositionService } from "../services/3DObjects/mousePosition.service";
import { ObjectDetectionService } from "../services/3DObjects/object-detection.service";
import { ObjectHandler} from "../services/3DObjects/objectsHandler.service";
import { IdentificationError } from "../services/IdentificationError/identificationError.service";
import { CheatModeService } from "../services/cheatMode/cheatMode.service";
import { CheatModeTimeoutService } from "../services/cheatMode/cheatModeTimeout.service";
import { GameService } from "../services/game/game.service";
import { GamesCardService } from "../services/gameCard/gamesCard.service";
import { SceneService } from "../services/scene/scene.service";
import { SceneLoaderService } from "../services/scene/sceneLoader/sceneLoader.service";
import { SceneSyncerService } from "../services/scene/sceneSyncer/sceneSyncer.service";
import { Chat } from "../services/socket/chat";
import { SocketHandlerService } from "../services/socket/socketHandler.service";
import { ObjectRestorationService } from "../services/3DObjects/object-restoration.service";

@Component({
    selector: "app-game-view-free",
    templateUrl: "./game-view-free.component.html",
    styleUrls: ["./game-view-free.component.css"],
    providers: [SceneSyncerService],
})

export class GameViewFreeComponent implements OnInit {
    private static readonly T_STRING: string = "t";
    private static readonly DIFFERENCE_SOUND_SRC: string = "../../assets/mario.mp3";

    @ViewChild("originalScene") private originalScene: ElementRef;
    @ViewChild("modifiedScene") private modifiedScene: ElementRef;
    @ViewChild("chronometer") private chronometer: ElementRef;
    @ViewChild("errorMessage") private errorMessage: ElementRef;
    @ViewChild("gameTitle") private gameTitle: ElementRef;
    @ViewChild("message") private message: ElementRef;
    @ViewChild("message_container") private messageContainer: ElementRef;
    @ViewChild("userDifferenceFound") private userDifferenceFound: ElementRef;

    private differenceSound: HTMLAudioElement;
    private scenePairId: string;
    private currentOriginalScene: ICommonScene;
    private currentModifiedScene: ICommonSceneModifications;
    private gameCardId: string;
    private originalSceneLoader: SceneLoaderService;
    private modifiedSceneLoader: SceneLoaderService;
    private cheatActivated: boolean;
    private meshesOriginal: THREE.Object3D[] = [];
    private meshesModified: THREE.Object3D[] = [];
    public playerTime: string;
    public differenceCounterUser: number;
    public isGameOver: boolean;

    public constructor(
        private route: ActivatedRoute,
        private spinnerService: Ng4LoadingSpinnerService,
        public sceneService: SceneService,
        public gamesCardService: GamesCardService,
        public geometricObjectService: GeometricObjectsService,
        private sceneSyncer: SceneSyncerService,
        public cheatModeService: CheatModeService,
        private cheatModeTimeoutService: CheatModeTimeoutService,
        public identificationError: IdentificationError,
        public mousePositionService: MousePositionService,
        public objectDetectionService: ObjectDetectionService,
        public objectHandler: ObjectHandler,
        public socket: SocketHandlerService,
        private game: GameService,
        public chat: Chat,
        public objectRestoration: ObjectRestorationService) {
            this.differenceCounterUser = 0;
            this.differenceSound = new Audio;
            this.differenceSound.src = GameViewFreeComponent.DIFFERENCE_SOUND_SRC;
            this.differenceSound.load();
            this.isGameOver = false;
            this.cheatActivated = false;
            this.originalSceneLoader = new SceneLoaderService();
            this.modifiedSceneLoader = new SceneLoaderService();

            this.objectHandler = new ObjectHandler(this.mousePositionService,
                                                   this.objectDetectionService,
                                                   this.originalSceneLoader,
                                                   this.modifiedSceneLoader,
                                                   this.geometricObjectService,
                                                   this.socket,
                                                   this.identificationError,
                                                   this.game,
                                                   this.objectRestoration);
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.gameCardId = params["id"];
        });
        this.spinnerService.show();
        this.getGameCardById();
        this.setServicesContainers();
        this.cheatModeTimeoutService.ngOnInit();
    }

    private setServicesContainers(): void {
        this.game.setContainers(this.chronometer.nativeElement, this.userDifferenceFound.nativeElement);
        this.chat.setContainers(this.message.nativeElement, this.messageContainer.nativeElement);
        this.identificationError.setContainers(this.errorMessage.nativeElement,
                                               this.originalScene.nativeElement,
                                               this.modifiedScene.nativeElement);

        this.objectRestoration.setContainers(this.originalScene.nativeElement, this.modifiedScene.nativeElement);
    }

    @HostListener("document:keydown", ["$event"])
    public async toggleCheatMode(event: KeyboardEvent): Promise<void> {
        this.cheatModeHandlerService.keyPressed(event, this.originalSceneLoader, this.modifiedSceneLoader);
    }

    private getGameCardById(): void {
        this.gamesCardService.getGameById(this.gameCardId).subscribe((gameCard: ICommonGameCard) => {
            this.scenePairId = gameCard.resource_id;
            this.gameTitle.nativeElement.innerText = gameCard.title;
            this.loadScene();
        });
    }

    // tslint:disable-next-line:max-func-body-length
    private loadScene(): void {
        // tslint:disable-next-line:max-func-body-length
        this.sceneService.getSceneById(this.scenePairId).subscribe(async (sceneResponse: ICommonScene) => {
            // tslint:disable-next-line:max-func-body-length
            this.sceneService.getModifiedSceneById(this.scenePairId).subscribe(async (sceneModified: ICommonSceneModifications) => {
                this.currentOriginalScene = sceneResponse;
                this.currentModifiedScene = sceneModified;
                this.cheatModeHandlerService.currentOriginalScene = this.currentOriginalScene;
                this.cheatModeHandlerService.currentModifiedScene = this.currentModifiedScene;

                await this.originalSceneLoader.loadOriginalScene(
                    this.originalScene.nativeElement,
                    this.currentOriginalScene,
                );
                await this.modifiedSceneLoader.loadModifiedScene(
                    this.modifiedScene.nativeElement,
                    this.originalSceneLoader.scene,
                    this.currentModifiedScene,
                );

                this.sceneSyncer.syncScenesMovement(
                    this.originalSceneLoader.camera, this.originalScene.nativeElement,
                    this.modifiedSceneLoader.camera, this.modifiedScene.nativeElement);
                this.spinnerService.hide();
                this.fillMeshes(this.meshesOriginal, this.originalSceneLoader);
                this.fillMeshes(this.meshesModified, this.modifiedSceneLoader);

                this.setRestoreObjectService();
                this.clickEvent();
                this.socket.emitMessage(Event.ReadyToPlay, null);
            });
        });
    }

    private setRestoreObjectService(): void {
        this.objectHandler.meshesOriginal = this.meshesOriginal;
        this.objectHandler.meshesModified = this.meshesModified;
        this.objectHandler.scenePairId = this.scenePairId;
        this.objectHandler.originalGame = this.originalScene;
        this.objectHandler.modifiedGame = this.modifiedScene;
        this.objectHandler.gameType = this.isGameThematic() ? ObjectType.Thematic : ObjectType.Geometric;
        this.objectHandler.originalSceneLoader = this.originalSceneLoader;
        this.objectHandler.modifiedSceneLoader = this.modifiedSceneLoader;
    }

    private clickEvent(): void {
        this.originalScene.nativeElement.addEventListener("click", (event: MouseEvent) =>
                    this.objectHandler.clickOnScene(event, true));
        this.modifiedScene.nativeElement.addEventListener("click", (event: MouseEvent) =>
                    this.objectHandler.clickOnScene(event, false));
    }

    private isGameThematic(): boolean {
        return this.currentModifiedScene.type === ObjectType.Thematic;
    }

    private fillMeshes(meshes: THREE.Object3D[], sceneLoader: SceneLoaderService): void {
        sceneLoader.scene.traverse((element) => {
            if (element.type === "Mesh" || element.type === "Scene") {
                meshes.push(element);
            }
        });
    }
}
