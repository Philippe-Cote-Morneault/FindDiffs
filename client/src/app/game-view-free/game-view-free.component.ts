import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import * as THREE from "three";
import { v4 as uuid } from "uuid";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { DifferenceType, ICommonReveal3D } from "../../../../common/model/reveal";
import { ICommonGeometricModifications } from "../../../../common/model/scene/modifications/geometricModifications";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import { ICommonScene } from "../../../../common/model/scene/scene";
import { GeometricObjectsService } from "../services/3DObjects/GeometricObjects/geometric-objects.service";
import { ObjectRestoration } from "../services/3DObjects/GeometricObjects/object-restoration";
import { CheatModeTimeoutService } from "../services/cheatMode/cheat-mode-timeout.service";
import { CheatModeService } from "../services/cheatMode/cheat-mode.service";
import { GamesCardService } from "../services/gameCard/games-card.service";
import { SceneService } from "../services/scene/scene.service";
import { SceneLoaderService } from "../services/scene/sceneLoader/sceneLoader.service";
import { SceneSyncerService } from "../services/scene/sceneSyncer/scene-syncer.service";
import { TimerService } from "../services/timer/timer.service";
// import { SocketService } from "../services/socket/socket.service";

@Component({
    selector: "app-game-view-free",
    templateUrl: "./game-view-free.component.html",
    styleUrls: ["./game-view-free.component.css"],
    providers: [SceneSyncerService],
})

export class GameViewFreeComponent implements OnInit {
    private static T_KEYCODE: number = 84;

    @ViewChild("originalScene") private originalScene: ElementRef;
    @ViewChild("modifiedScene") private modifiedScene: ElementRef;
    @ViewChild("chronometer") private chronometer: ElementRef;
    @ViewChild("gameTitle") private gameTitle: ElementRef;

    private scenePairId: string;
    private currentOriginalScene: ICommonScene;
    private currentModifiedScene: ICommonSceneModifications;
    private gameCardId: string;
    private originalSceneLoader: SceneLoaderService;
    private modifiedSceneLoader: SceneLoaderService;
    private differenceFound: string[];
    private cheatActivated: boolean;

    public playerTime: string;
    public differenceCounterUser: number;
    public isGameOver: boolean;

    private meshesOriginal: THREE.Object3D[] = [];
    private meshesModified: THREE.Object3D[] = [];
    private intersectsOriginal: THREE.Intersection[];
    private intersectsModified: THREE.Intersection[];

    public constructor(
        private route: ActivatedRoute,
        private spinnerService: Ng4LoadingSpinnerService,
        // private socketService: SocketService,
        public sceneService: SceneService,
        public timerService: TimerService,
        public gamesCardService: GamesCardService,
        public geometricObjectService: GeometricObjectsService,
        public objectRestoration: ObjectRestoration,
        private sceneSyncer: SceneSyncerService,
        public cheatModeService: CheatModeService,
        private cheatModeTimeoutService: CheatModeTimeoutService) {
            this.originalSceneLoader = new SceneLoaderService();
            this.modifiedSceneLoader = new SceneLoaderService();
            this.differenceCounterUser = 0;
            this.isGameOver = false;
            this.differenceFound = [];
            this.cheatActivated = false;
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.gameCardId = params["id"];
        });
        this.spinnerService.show();
        this.getOriginalSceneById();
        this.getGameCardById();
        this.cheatModeTimeoutService.ngOnInit();
    }

    @HostListener("document:keydown", ["$event"])
    public async toggleCheatMode(event: KeyboardEvent): Promise<void> {
        if (event.keyCode === GameViewFreeComponent.T_KEYCODE) {
            this.cheatActivated = !this.cheatActivated;
            if (this.cheatActivated) {
                this.cheatModeService.originalSceneLoaderService = this.originalSceneLoader;
                this.cheatModeService.modifiedSceneLoaderService = this.modifiedSceneLoader;
                await this.cheatModeTimeoutService.startCheatMode(
                    this.cheatModeService,
                    this.currentOriginalScene,
                    this.currentModifiedScene,
                );
            } else {
                this.cheatModeTimeoutService.stopCheatMode();
                if (this.cheatModeService.cheatActivated) {
                    await this.cheatModeService.toggleCheatMode(
                        this.currentOriginalScene,
                        (this.currentModifiedScene as ICommonGeometricModifications),
                    );
                }
            }
        }
    }

    private getGameCardById(): void {
        this.gamesCardService.getGameById(this.gameCardId).subscribe((gameCard: ICommonGameCard) => {
            this.scenePairId = gameCard.resource_id;
            this.gameTitle.nativeElement.innerText = gameCard.title;
            this.getOriginalSceneById();
        });
    }

    private getOriginalSceneById(): void {
        this.sceneService.getSceneById(this.scenePairId).subscribe(async (response: ICommonScene) => {
            this.currentOriginalScene = response;
            await this.originalSceneLoader.loadOriginalScene(this.originalScene.nativeElement, this.currentOriginalScene, true);
            await this.cheatModeService.saveOriginalMaterial(this.currentOriginalScene);
            this.getModifiedSceneById(this.currentOriginalScene);
        });
    }

    public clickOnScene(event: MouseEvent, isOriginalScene: boolean): void {
        const obj: {sceneLoader: SceneLoaderService, HTMLElement: ElementRef<HTMLElement>} = this.isOriginalSceneClick(isOriginalScene);
        const raycaster: THREE.Raycaster = new THREE.Raycaster();
        const mouse: THREE.Vector2 = new THREE.Vector2();
        this.setMousePosition(event, mouse, obj.HTMLElement);
        raycaster.setFromCamera(mouse, this.originalSceneLoader.camera );
        this.intersectsOriginal = raycaster.intersectObjects( this.meshesOriginal );
        this.intersectsModified = raycaster.intersectObjects( this.meshesModified );
        const modifiedObjectId: string = this.intersectsModified[0] ? this.intersectsModified[0].object.uuid.toString() : uuid();
        const originalObjectId: string = this.intersectsOriginal[0] ? this.intersectsOriginal[0].object.uuid.toString() : uuid();
        this.originalSceneClickValidation();

        this.geometricObjectService.post3DObject(this.scenePairId, modifiedObjectId, originalObjectId)
            .subscribe(async (response: ICommonReveal3D) => {
                switch (response.differenceType) {
                    case DifferenceType.removedObject: {
                        this.addObject(this.intersectsOriginal[0].object);
                        break;
                    }
                    case DifferenceType.colorChanged: {
                        this.changeColorObject(this.intersectsOriginal[0].object, this.intersectsModified[0].object);
                        break;
                    }
                }
        
                if (this.differenceCounterUser === 7) {
                    this.gameOver();
                }
            });
    }

    private originalSceneClickValidation(): void {
        if (!this.intersectsOriginal[0]) {
            if (this.intersectsModified[0]) {
                this.removeObject(this.intersectsModified[0].object);

                return;
            }
        }
    }

    private addObject(objectOriginal: THREE.Object3D): void {
        if (this.isANewDifference(objectOriginal.uuid)) {
            this.modifiedSceneLoader.scene.add(objectOriginal.clone());
            this.differenceFound[this.differenceCounterUser] = objectOriginal.uuid;
            this.differenceCounterUser++;
        }
    }

    private removeObject(objectModified: THREE.Object3D): void {
        if (this.isANewDifference(objectModified.uuid)) {
            this.modifiedSceneLoader.scene.remove(objectModified);
            this.differenceFound[this.differenceCounterUser] = objectModified.uuid;
            this.differenceCounterUser++;
        }
    }

    private changeColorObject(objectOriginal: THREE.Object3D, objectModified: THREE.Object3D): void {
        let intersectedModified: any;
        let intersectedOriginal: any;
        intersectedOriginal = objectOriginal;
        intersectedModified = objectModified;

        if (this.isANewDifference(objectModified.uuid)) {
            intersectedModified.material.color.setHex(intersectedOriginal.material.color.getHex());
            this.differenceFound[this.differenceCounterUser] = objectModified.uuid;
            this.differenceCounterUser++;
        }
    }

    // private error () {

    // }

    private isOriginalSceneClick(isOriginalScene: boolean): { sceneLoader: SceneLoaderService, HTMLElement: ElementRef<HTMLElement> } {
        let sceneLoader: SceneLoaderService;
        // tslint:disable:variable-name
        let HTMLElement: ElementRef<HTMLElement>;
        if (isOriginalScene) {
            sceneLoader = this.originalSceneLoader;
            HTMLElement = this.originalScene;
        } else {
            sceneLoader = this.modifiedSceneLoader;
            HTMLElement = this.modifiedScene;
        }

        return {
            sceneLoader: sceneLoader,
            HTMLElement: HTMLElement,
        };
    }

    private setMousePosition(event: MouseEvent, mouse: THREE.Vector2, HTMLElement: ElementRef<HTMLElement>): void {
        const divBoxInformation: ClientRect | DOMRect = HTMLElement.nativeElement.getBoundingClientRect();
        const differenceX: number = event.clientX - divBoxInformation.left;
        const differenceY: number = event.clientY - divBoxInformation.top;
        // tslint:disable:no-magic-numbers
        mouse.x = (differenceX / HTMLElement.nativeElement.clientWidth) * 2 - 1;
        mouse.y = -(differenceY / HTMLElement.nativeElement.clientHeight) * 2 + 1;
    }

    private getModifiedSceneById(response: ICommonScene): void {
        this.sceneService.getModifiedSceneById(this.scenePairId).subscribe(async (responseModified: ICommonSceneModifications) => {
            this.currentModifiedScene = responseModified;
            await this.modifiedSceneLoader.loadModifiedScene(this.modifiedScene.nativeElement, response, this.currentModifiedScene);
            await this.cheatModeService.saveModifiedMaterial(this.currentOriginalScene, this.currentModifiedScene);
            this.sceneSyncer.syncScenesMovement(this.originalSceneLoader.camera, this.originalScene.nativeElement,
                                                this.modifiedSceneLoader.camera, this.modifiedScene.nativeElement);
            this.spinnerService.hide();
            this.timerService.startTimer(this.chronometer.nativeElement);

            this.fillMeshes(this.meshesOriginal, this.originalSceneLoader);
            this.fillMeshes(this.meshesModified, this.modifiedSceneLoader);
        });
    }

    private fillMeshes(meshes: THREE.Object3D[], sceneLoader: SceneLoaderService): void {
        sceneLoader.scene.children.forEach((element) => {
            if (element.type === "Mesh") {
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
}
