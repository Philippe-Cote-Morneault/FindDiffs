import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import * as THREE from "three";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { DifferenceType, ICommonReveal3D } from "../../../../common/model/reveal";
import { ICommonGeometricModifications } from "../../../../common/model/scene/modifications/geometricModifications";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import { ICommonThematicModifications } from "../../../../common/model/scene/modifications/thematicModifications";
import { ICommonScene, ObjectType } from "../../../../common/model/scene/scene";
import { IThreeObject, IThreeScene } from "../services/3DObjects/GeometricObjects/IThreeObject";
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
import { ThematicObjectParser } from "../services/scene/sceneParser/objectParser/thematicObjectParser";
import { SceneSyncerService } from "../services/scene/sceneSyncer/sceneSyncer.service";
import { TimerService } from "../services/timer/timer.service";
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
    private static readonly MAX_DIFFERENCES: number = 7;

    @ViewChild("originalScene") private originalScene: ElementRef;
    @ViewChild("modifiedScene") private modifiedScene: ElementRef;
    // @ViewChild("chronometer") private chronometer: ElementRef;
    @ViewChild("gameTitle") private gameTitle: ElementRef;
    // @ViewChild("message") private message: ElementRef;
    // @ViewChild("message_container") private messageContainer: ElementRef;
    @ViewChild("errorMessage") private errorMessage: ElementRef;

    private differenceSound: HTMLAudioElement;
    private scenePairId: string;
    private currentOriginalScene: ICommonScene;
    private currentModifiedScene: ICommonSceneModifications;
    private gameCardId: string;
    private originalSceneLoader: SceneLoaderService;
    private modifiedSceneLoader: SceneLoaderService;
    private thematicObjectParser: ThematicObjectParser;
    private differenceFound: string[];
    private cheatActivated: boolean;
    private meshesOriginal: THREE.Object3D[] = [];
    private meshesModified: THREE.Object3D[] = [];
    private gameType: ObjectType;
    public playerTime: string;
    public differenceCounterUser: number;
    public isGameOver: boolean;
    private detectedObjects: IThreeObject;

    public constructor(
        private route: ActivatedRoute,
        private spinnerService: Ng4LoadingSpinnerService,
        public sceneService: SceneService,
        public timerService: TimerService,
        public gamesCardService: GamesCardService,
        public geometricObjectService: GeometricObjectsService,
        private sceneSyncer: SceneSyncerService,
        public cheatModeService: CheatModeService,
        private cheatModeTimeoutService: CheatModeTimeoutService,
        public identificationError: IdentificationError,
        public mousePositionService: MousePositionService,
        public objectDetectionService: ObjectDetectionService,
        public restoreObjectsService: RestoreObjectsService) {
            this.differenceCounterUser = 0;
            this.differenceSound = new Audio;
            this.differenceSound.src = GameViewFreeComponent.DIFFERENCE_SOUND_SRC;
            this.differenceSound.load();
            this.isGameOver = false;
            this.differenceFound = [];
            this.cheatActivated = false;
            this.originalSceneLoader = new SceneLoaderService();
            this.modifiedSceneLoader = new SceneLoaderService();
            this.thematicObjectParser = new ThematicObjectParser();
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

    private loadScene(): void {
        this.sceneService.getSceneById(this.scenePairId).subscribe(async (sceneResponse: ICommonScene) => {
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

                this.timerService.startTimer(this.chronometer.nativeElement);
                this.gameType = this.isGameThematic() ? ObjectType.Thematic : ObjectType.Geometric;
            });
        });
    }

    public clickOnScene(event: MouseEvent, isOriginalScene: boolean): void {
        const mouse: THREE.Vector2 = new THREE.Vector2();

        isOriginalScene ?
            this.mousePositionService.setMousePosition(event, mouse, this.originalScene) :
            this.mousePositionService.setMousePosition(event, mouse, this.modifiedScene);

        this.detectedObjects = this.objectDetectionService.rayCasting(mouse,
                                                                      this.originalSceneLoader.camera, this.modifiedSceneLoader.camera,
                                                                      this.originalSceneLoader.scene, this.modifiedSceneLoader.scene,
                                                                      this.meshesOriginal, this.meshesModified);

        this.postDifference(event, this.detectedObjects.original.userData.id, this.detectedObjects.modified.userData.id);
    }

    private postDifference(event: MouseEvent, originalObjectId: string, modifiedObjectId: string): void {
        const scenes: IThreeScene = { original: this.originalSceneLoader.scene, modified: this.modifiedSceneLoader.scene };
        this.geometricObjectService.post3DObject(this.scenePairId, modifiedObjectId, originalObjectId, this.gameType)
            .subscribe(async (response: ICommonReveal3D) => {
                switch (response.differenceType) {
                    case DifferenceType.removedObject:
                        this.restoreObjectsService.addObject(this.detectedObjects.original, scenes);
                        await this.addDifference(this.detectedObjects.original.userData.id);
                        break;
                    case DifferenceType.colorChanged:
                        this.restoreObjectsService.changeColorObject(this.detectedObjects.original, this.detectedObjects.modified);
                        await this.addDifference(this.detectedObjects.original.userData.id);
                        break;
                    case DifferenceType.textureObjectChanged:
                        // tslint:disable-next-line: max-line-length
                        await this.restoreObjectsService.changeTextureObject(this.detectedObjects.original, this.detectedObjects.modified, this.thematicObjectParser);
                        await this.addDifference(this.detectedObjects.original.userData.id)
                        break;
                    case DifferenceType.addedObject:
                        this.restoreObjectsService.removeObject(this.detectedObjects.modified, scenes);
                        await this.addDifference(this.detectedObjects.modified.userData.id);
                        break;
                    default:
                        await this.identificationError.showErrorMessage(event.pageX, event.pageY, this.errorMessage.nativeElement,
                                                                        this.originalScene.nativeElement, this.modifiedScene.nativeElement);
                        break;
                }
            });
    }

    private fillMeshes(meshes: THREE.Object3D[], sceneLoader: SceneLoaderService): void {
        sceneLoader.scene.children.forEach((element) => {
            if (element.type === "Mesh" || element.type === "Scene") {
                meshes.push(element);
            }
        });
    }

    public isANewDifference(differenceId: string): boolean {
        return !this.differenceFound.includes(differenceId);
    }

    public async addDifference(differenceId: string): Promise<void> {
        this.differenceFound[this.differenceFound.length++] = differenceId;
        this.differenceCounterUser = this.differenceCounterUser + 1;
        await this.differenceSound.play();
        if (this.differenceCounterUser === GameViewFreeComponent.MAX_DIFFERENCES) {
            this.gameOver();
        }
    }

    private gameOver(): void {
        this.timerService.stopTimer();
        this.playerTime = ((this.chronometer.nativeElement) as HTMLElement).innerText;
        this.isGameOver = true;
    }

    private isGameThematic(): boolean {
        return this.currentModifiedScene.type === ObjectType.Thematic;
    }
}
