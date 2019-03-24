import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import * as THREE from "three";
import { ICommonGameCard } from "../../../../common/model/gameCard";
// import { DifferenceType, ICommonReveal3D } from "../../../../common/model/reveal";
import { ICommonGeometricModifications } from "../../../../common/model/scene/modifications/geometricModifications";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import { ICommonThematicModifications } from "../../../../common/model/scene/modifications/thematicModifications";
import { ICommonScene, ObjectType } from "../../../../common/model/scene/scene";
import { IThreeObject/*, IThreeScene */} from "../services/3DObjects/GeometricObjects/IThreeObject";
import { GeometricObjectsService } from "../services/3DObjects/GeometricObjects/geometric-objects.service";
import { MousePositionService } from "../services/3DObjects/mousePosition.service";
import { ObjectDetectionService } from "../services/3DObjects/object-detection.service";
import { RestoreObjectsService} from "../services/3DObjects/restore-objects.service";
import { IdentificationError } from "../services/IdentificationError/identificationError.service";
import { CheatModeService } from "../services/cheatMode/cheatMode.service";
import { CheatModeTimeoutService } from "../services/cheatMode/cheatModeTimeout.service";
import { GamesCardService } from "../services/gameCard/gamesCard.service";
import { SceneService } from "../services/scene/scene.service";
import { SceneLoaderService } from "../services/scene/sceneLoader/sceneLoader.service";
import { SceneSyncerService } from "../services/scene/sceneSyncer/sceneSyncer.service";
import { SocketHandlerService } from "../services/socket/socketHandler.service";
// import { TimerService } from "../services/timer/timer.service";
// import { Chat } from "../services/socket/chat";
// import { ChatFormaterService } from "../services/socket/chatFormater.service";
// import { TimerService } from "../services/timer/timer.service";

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
    // @ViewChild("chronometer") private chronometer: ElementRef;
    @ViewChild("gameTitle") private gameTitle: ElementRef;
    // @ViewChild("message") private message: ElementRef;
    // @ViewChild("message_container") private messageContainer: ElementRef;
    // @ViewChild("errorMessage") private errorMessage: ElementRef;

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
    // private gameType: ObjectType;
    public playerTime: string;
    public differenceCounterUser: number;
    public isGameOver: boolean;

    public constructor(
        private route: ActivatedRoute,
        private spinnerService: Ng4LoadingSpinnerService,
        public sceneService: SceneService,
        // public timerService: TimerService,
        public gamesCardService: GamesCardService,
        public geometricObjectService: GeometricObjectsService,
        private sceneSyncer: SceneSyncerService,
        public cheatModeService: CheatModeService,
        private cheatModeTimeoutService: CheatModeTimeoutService,
        public identificationError: IdentificationError,
        public mousePositionService: MousePositionService,
        public objectDetectionService: ObjectDetectionService,
        public restoreObjectsService: RestoreObjectsService,
        public socket: SocketHandlerService) {
            this.differenceCounterUser = 0;
            this.differenceSound = new Audio;
            this.differenceSound.src = GameViewFreeComponent.DIFFERENCE_SOUND_SRC;
            this.differenceSound.load();
            this.isGameOver = false;
            this.cheatActivated = false;
            this.originalSceneLoader = new SceneLoaderService();
            this.modifiedSceneLoader = new SceneLoaderService();

            this.restoreObjectsService = new RestoreObjectsService(this.mousePositionService,
                                                                   this.objectDetectionService,
                                                                   this.originalSceneLoader,
                                                                   this.modifiedSceneLoader,
                                                                   this.restoreObjectsService,
                                                                   this.geometricObjectService);
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.gameCardId = params["id"];
        });
        this.spinnerService.show();
        this.getGameCardById();
        this.cheatModeTimeoutService.ngOnInit();
    }

    @HostListener("document:keydown", ["$event"])
    public async toggleCheatMode(event: KeyboardEvent): Promise<void> {
        if (event.key === GameViewFreeComponent.T_STRING) {
            this.cheatActivated = !this.cheatActivated;
            if (this.cheatActivated) {
                this.copySceneLoaders();
                this.cheatModeTimeoutService.startCheatMode(
                    this.cheatModeService,
                    this.currentOriginalScene,
                    this.currentModifiedScene,
                );
            } else {
                this.cheatModeTimeoutService.stopCheatMode();
                if (this.cheatModeService.cheatActivated) {
                    this.cheatModeService.toggleCheatMode(
                        (this.currentModifiedScene as ICommonGeometricModifications & ICommonThematicModifications),
                    );
                }
            }
        }
    }

    private copySceneLoaders(): void {
        this.cheatModeService.originalLoaderService = this.originalSceneLoader;
        this.cheatModeService.modifiedLoaderService = this.modifiedSceneLoader;

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
                this.socket.emitReadyToPlay();
            });
        });
    }

    private setRestoreObjectService(): void {
        this.restoreObjectsService.meshesOriginal = this.meshesOriginal;
        this.restoreObjectsService.meshesModified = this.meshesModified;
        this.restoreObjectsService.scenePairId = this.scenePairId;
        this.restoreObjectsService.originalGame = this.originalScene;
        this.restoreObjectsService.modifiedGame = this.modifiedScene;
        this.restoreObjectsService.gameType = this.isGameThematic() ? ObjectType.Thematic : ObjectType.Geometric;
        this.restoreObjectsService.originalSceneLoader = this.originalSceneLoader;
        this.restoreObjectsService.modifiedSceneLoader = this.modifiedSceneLoader;
    }

    private clickEvent(): void {
        this.originalScene.nativeElement.addEventListener("click", (event: MouseEvent) =>
                    this.restoreObjectsService.clickOnScene(event, true));
        this.modifiedScene.nativeElement.addEventListener("click", (event: MouseEvent) =>
                    this.restoreObjectsService.clickOnScene(event, false));
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
