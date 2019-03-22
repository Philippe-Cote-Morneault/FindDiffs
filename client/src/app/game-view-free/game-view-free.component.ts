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
import { GeometricObjectsService } from "../services/3DObjects/GeometricObjects/geometric-objects.service";
import { MousePositionService } from "../services/3DObjects/mousePosition.service";
import { IdentificationError } from "../services/IdentificationError/identificationError.service";
import { CheatModeService } from "../services/cheatMode/cheatMode.service";
import { CheatModeTimeoutService } from "../services/cheatMode/cheatModeTimeout.service";
import { GamesCardService } from "../services/gameCard/gamesCard.service";
import { SceneService } from "../services/scene/scene.service";
import { SceneLoaderService } from "../services/scene/sceneLoader/sceneLoader.service";
import { ThematicObjectParser } from "../services/scene/sceneParser/objectParser/thematicObjectParser";
import { SceneSyncerService } from "../services/scene/sceneSyncer/sceneSyncer.service";
import { TimerService } from "../services/timer/timer.service";
// import { ICommonThematicObject } from "../../../../common/model/scene/objects/thematicObjects/thematicObject";
// import { SocketService } from "../services/socket/socket.service";

@Component({
    selector: "app-game-view-free",
    templateUrl: "./game-view-free.component.html",
    styleUrls: ["./game-view-free.component.css"],
    providers: [SceneSyncerService],
})

export class GameViewFreeComponent implements OnInit {
    private static readonly T_STRING: string = "t";

    @ViewChild("originalScene") private originalScene: ElementRef;
    @ViewChild("modifiedScene") private modifiedScene: ElementRef;
    @ViewChild("chronometer") private chronometer: ElementRef;
    @ViewChild("gameTitle") private gameTitle: ElementRef;
    @ViewChild("errorMessage") private errorMessage: ElementRef;

    private readonly MAX_DIFFERENCES: number;

    private scenePairId: string;
    private currentOriginalScene: ICommonScene;
    private currentModifiedScene: ICommonSceneModifications;
    private gameCardId: string;
    private originalSceneLoader: SceneLoaderService;
    private modifiedSceneLoader: SceneLoaderService;
    private thematicObjectParser: ThematicObjectParser;
    private differenceFound: string[];
    private cheatActivated: boolean;

    public playerTime: string;
    public differenceCounterUser: number;
    public isGameOver: boolean;

    private meshesOriginal: THREE.Object3D[] = [];
    private meshesModified: THREE.Object3D[] = [];
    private intersectsOriginal: THREE.Intersection[];
    private intersectsModified: THREE.Intersection[];

    private gameType: ObjectType;

    public constructor(
        private route: ActivatedRoute,
        private spinnerService: Ng4LoadingSpinnerService,
        // private socketService: SocketService,
        public sceneService: SceneService,
        public timerService: TimerService,
        public gamesCardService: GamesCardService,
        public geometricObjectService: GeometricObjectsService,
        private sceneSyncer: SceneSyncerService,
        public cheatModeService: CheatModeService,
        private cheatModeTimeoutService: CheatModeTimeoutService,
        public identificationError: IdentificationError,
        public mousePositionService: MousePositionService) {
        this.originalSceneLoader = new SceneLoaderService();
        this.modifiedSceneLoader = new SceneLoaderService();
        this.thematicObjectParser = new ThematicObjectParser();

        this.differenceCounterUser = 0;
        this.isGameOver = false;
        this.differenceFound = [];
        this.cheatActivated = false;

        // tslint:disable-next-line: no-magic-numbers
        this.MAX_DIFFERENCES = 7;
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
        const raycaster: THREE.Raycaster = new THREE.Raycaster();
        const raycaster2: THREE.Raycaster = new THREE.Raycaster();

        const mouse: THREE.Vector2 = new THREE.Vector2();

        isOriginalScene ?
            this.mousePositionService.setMousePosition(event, mouse, this.originalScene) :
            this.mousePositionService.setMousePosition(event, mouse, this.modifiedScene);

        raycaster.setFromCamera(mouse, this.originalSceneLoader.camera);
        raycaster2.setFromCamera(mouse, this.modifiedSceneLoader.camera);

        this.intersectsOriginal = raycaster.intersectObjects(this.meshesOriginal, true);
        this.intersectsModified = raycaster2.intersectObjects(this.meshesModified, true);

        const originalObject: THREE.Object3D = this.intersectsOriginal[0] ?
                this.getParent(this.intersectsOriginal[0].object, this.originalSceneLoader.scene) : new THREE.Object3D;
        const modifiedObject: THREE.Object3D = this.intersectsModified[0] ? 
                this.getParent(this.intersectsModified[0].object, this.modifiedSceneLoader.scene) : new THREE.Object3D;

        this.postDifference(event, originalObject.userData.id, modifiedObject.userData.id);
    }

    private getParent(obj: THREE.Object3D, scene: THREE.Scene): THREE.Object3D {
        if (obj.parent !== scene as THREE.Object3D) {
            obj = obj.parent as THREE.Object3D;
            obj = this.getParent(obj, scene);
        }

        return obj;
    }

    private postDifference(event: MouseEvent, originalObjectId: string, modifiedObjectId: string): void {
        this.geometricObjectService.post3DObject(this.scenePairId, modifiedObjectId, originalObjectId, this.gameType)
            .subscribe(async (response: ICommonReveal3D) => {
                switch (response.differenceType) {
                    case DifferenceType.removedObject:
                        this.addObject(this.intersectsOriginal[0].object);
                        break;
                    case DifferenceType.colorChanged:
                        this.changeColorObject(this.intersectsOriginal[0].object, this.intersectsModified[0].object);
                        break;
                    case DifferenceType.textureObjectChanged:
                        await this.changeTextureObject(this.intersectsOriginal[0].object, this.intersectsModified[0].object);
                        break;
                    case DifferenceType.addedObject:
                        this.removeObject(this.intersectsModified[0].object);
                        break;
                    default:
                        await this.identificationError.showErrorMessage(event.pageX, event.pageY, this.errorMessage.nativeElement,
                                                                        this.originalScene.nativeElement, this.modifiedScene.nativeElement);
                        break;
                }

                if (this.differenceCounterUser === this.MAX_DIFFERENCES) {
                    this.gameOver();
                }
            });
    }

    private addObject(objectOriginal: THREE.Object3D): void {
        if (this.isANewDifference(objectOriginal.userData.id)) {

            this.originalSceneLoader.scene.children.forEach((element) => {
                if (element.userData.id === objectOriginal.userData.id) {
                    this.modifiedSceneLoader.scene.add(element.clone());
                }
            });
            this.differenceFound[this.differenceCounterUser] = objectOriginal.userData.id;
            this.differenceCounterUser++;
        }
    }

    private removeObject(objectModified: THREE.Object3D): void {
        if (this.isANewDifference(objectModified.userData.id)) {
            this.modifiedSceneLoader.scene.children.forEach((element) => {
                if (element.userData.id === objectModified.userData.id) {
                    this.modifiedSceneLoader.scene.remove(element);
                }
            });
            this.differenceFound[this.differenceCounterUser] = objectModified.userData.id;
            this.differenceCounterUser++;
        }
    }

    private changeColorObject(objectOriginal: THREE.Object3D, objectModified: THREE.Object3D): void {
        let intersectedModified: any;
        let intersectedOriginal: any;
        intersectedOriginal = objectOriginal;
        intersectedModified = objectModified;

        if (this.isANewDifference(objectModified.userData.id)) {
            intersectedModified.material.color.setHex(intersectedOriginal.material.color.getHex());
            this.differenceFound[this.differenceCounterUser] = objectModified.userData.id;
            this.differenceCounterUser++;
        }
    }

    private async changeTextureObject(objectOriginal: THREE.Object3D, objectModified: THREE.Object3D): Promise<void> {
        if (this.isANewDifference(objectModified.userData.id)) {
            if (objectModified.userData.isTextured) {
                await this.thematicObjectParser.loadTexture(objectModified, objectOriginal.name, objectOriginal.userData.texture);
            }
            // else {
            //     // Peut-etre inutile
            //     this.thematicObjectParser.loadColor(objectModified, objectOriginal.name, objectOriginal.userData.color);
            // }
            this.differenceFound[this.differenceCounterUser] = objectModified.userData.id;
            this.differenceCounterUser++;
        }

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

    private gameOver(): void {
        this.timerService.stopTimer();
        this.playerTime = ((this.chronometer.nativeElement) as HTMLElement).innerText;
        this.isGameOver = true;
    }

    private isGameThematic(): boolean {
        return this.currentModifiedScene.type === ObjectType.Thematic;
    }
}
