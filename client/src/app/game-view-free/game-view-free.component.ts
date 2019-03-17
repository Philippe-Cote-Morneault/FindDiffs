import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import * as THREE from "three";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import { ICommonScene } from "../../../../common/model/scene/scene";
// import { GeometricObjectService } from "../services/3DObjects/GeometricObjects/geometricObject.service";
import { GamesCardService } from "../services/gameCard/games-card.service";
import { SceneService } from "../services/scene/scene.service";
import { SceneLoaderService } from "../services/scene/sceneLoader/sceneLoader.service";
import { TimerService } from "../services/timer/timer.service";
// import { SocketService } from "../services/socket/socket.service";

@Component({
    selector: "app-game-view-free",
    templateUrl: "./game-view-free.component.html",
    styleUrls: ["./game-view-free.component.css"],
})
export class GameViewFreeComponent implements OnInit {
    @ViewChild("originalScene") private originalScene: ElementRef<HTMLElement>;
    @ViewChild("modifiedScene") private modifiedScene: ElementRef<HTMLElement>;
    @ViewChild("chronometer") private chronometer: ElementRef;
    @ViewChild("gameTitle") private gameTitle: ElementRef;

    private scenePairId: string;
    private gameCardID: string;
    private originalSceneLoader: SceneLoaderService;
    private modifiedSceneLoader: SceneLoaderService;
    private differenceFound: string[];

    public playerTime: string;
    public differenceCounterUser: number;
    public isGameOver: boolean;

    private meshesOriginal: THREE.Object3D[] = [];
    private meshesModified: THREE.Object3D[] = [];

    public constructor(
        private route: ActivatedRoute,
        private spinnerService: Ng4LoadingSpinnerService,
        // private socketService: SocketService,
        public sceneService: SceneService,
        public timerService: TimerService,
        public gamesCardService: GamesCardService,
        // public geometricObjectService: GeometricObjectService
        ) {
        this.originalSceneLoader = new SceneLoaderService();
        this.modifiedSceneLoader = new SceneLoaderService();
        this.differenceCounterUser = 0;
        this.isGameOver = false;
        this.differenceFound = [];
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.gameCardID = params["id"];
        });
        this.spinnerService.show();
        this.getGameCardById();
    }

    private getGameCardById(): void {
        this.gamesCardService.getGameById(this.gameCardID).subscribe((gameCard: ICommonGameCard) => {
            this.scenePairId = gameCard.resource_id;
            this.gameTitle.nativeElement.innerText = gameCard.title;
            this.getOriginalSceneById();
        });
    }

    private getOriginalSceneById(): void {
        this.sceneService.getSceneById(this.scenePairId).subscribe((response: ICommonScene) => {
            this.originalSceneLoader.loadOriginalScene(this.originalScene.nativeElement, response, true);
            this.getModifiedSceneById(response);
        });
    }

    // tslint:disable
    public clickOnScene(event: MouseEvent, isOriginalScene: boolean): void {
        const obj: {sceneLoader: SceneLoaderService, HTMLElement: ElementRef<HTMLElement>} = this.isOriginalSceneClick(isOriginalScene);
        const raycaster: THREE.Raycaster = new THREE.Raycaster();
        const mouse: THREE.Vector2 = new THREE.Vector2();
        let intersectsOriginal: THREE.Intersection[];
        let intersectsModified: THREE.Intersection[];

        this.setMousePosition(event, mouse, obj.HTMLElement);

        raycaster.setFromCamera(mouse, this.originalSceneLoader.camera );

        intersectsOriginal = raycaster.intersectObjects( this.meshesOriginal );
        intersectsModified = raycaster.intersectObjects( this.meshesModified );

        console.log(intersectsOriginal[0]); // call the service instead of console.log
        console.log(intersectsModified[0]);

        if (intersectsOriginal.length > 0) {
            console.log(intersectsOriginal[0].object.position);
        }

        if (intersectsModified.length > 0) {
            console.log(intersectsModified[0].object.position);
        }

        if (intersectsOriginal.length > 0 && intersectsModified.length > 0) {
            if (intersectsOriginal[0].object.position.x === intersectsModified[0].object.position.x && 
                intersectsOriginal[0].object.position.y === intersectsModified[0].object.position.y && 
                intersectsOriginal[0].object.position.z === intersectsModified[0].object.position.z) {
                // deux objets couleur differente
                let intersectedModified: any;
                let intersectedOriginal: any;

                intersectedOriginal = intersectsOriginal[0].object;
                intersectedModified = intersectsModified[0].object;

                if (intersectedModified.material.color.getHex() !== intersectedOriginal.material.color.getHex()) {
                    console.log(this.isANewDifference(intersectsModified[0].object.uuid));
                    if (this.isANewDifference(intersectsModified[0].object.uuid)) {
                        intersectedModified.material.color.setHex(intersectedOriginal.material.color.getHex());
                        this.differenceFound[this.differenceCounterUser] = intersectsModified[0].object.uuid;
                        this.differenceCounterUser++;
                        console.log("Changed modified obj!!!!!");
                    }
                } else {
                    console.log("YOU ARE DUMB!");
                }
            } else if (intersectsOriginal[0].distance > intersectsModified[0].distance) {
                // enlever objet modife
                if (this.isANewDifference(intersectsModified[0].object.uuid)) {
                    this.modifiedSceneLoader.scene.remove(intersectsModified[0].object);
                    this.differenceFound[this.differenceCounterUser] = intersectsModified[0].object.uuid;
                    this.differenceCounterUser++;
                }
            } else if (intersectsOriginal[0].distance < intersectsModified[0].distance) {
                // add objet modifie
                if (this.isANewDifference(intersectsOriginal[0].object.uuid)) {
                    this.modifiedSceneLoader.scene.add(intersectsOriginal[0].object.clone());
                    this.differenceFound[this.differenceCounterUser] = intersectsOriginal[0].object.uuid;
                    this.differenceCounterUser++;
                }
            }
        } else if (intersectsOriginal.length > 0 && intersectsModified.length === 0) {
            // add objet modifie
            if (this.isANewDifference(intersectsOriginal[0].object.uuid)) {
                this.modifiedSceneLoader.scene.add(intersectsOriginal[0].object.clone());
                this.differenceFound[this.differenceCounterUser] = intersectsOriginal[0].object.uuid;
                this.differenceCounterUser++;
            }
        } else if (intersectsOriginal.length === 0 && intersectsModified.length > 0) {
            // enlever objet modifie
            if (this.isANewDifference(intersectsModified[0].object.uuid)) {
                this.modifiedSceneLoader.scene.remove(intersectsModified[0].object);
                this.differenceFound[this.differenceCounterUser] = intersectsModified[0].object.uuid;
                this.differenceCounterUser++;
            }
        } else {
            // afficher ERREUR
            console.log("YOU ARE DUMB!");
        }

        if (this.differenceCounterUser === 7) {
            this.gameOver();
        }
        // this.originalSceneLoader.scene.remove(intersectsOriginal[0].object);
        // console.log("========================");
        // let test: any = intersectsOriginal[0].object;
        // this.modifiedSceneLoader.scene.add(test);

        // geometricObjectService.
    }

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
        this.sceneService.getModifiedSceneById(this.scenePairId).subscribe((responseModified: ICommonSceneModifications) => {
            this.modifiedSceneLoader.loadModifiedScene(this.modifiedScene.nativeElement, response, responseModified);
            SceneLoaderService.syncScenes(this.originalSceneLoader.camera, this.originalSceneLoader.controls,
                                          this.modifiedSceneLoader.camera, this.modifiedSceneLoader.controls);
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
        console.log("===================");
        console.log(differenceId);
        console.log("===================");
        console.log(this.differenceFound);
        return !this.differenceFound.includes(differenceId);
    }

    private gameOver(): void {
        this.timerService.stopTimer();
        this.playerTime = ((this.chronometer.nativeElement) as HTMLElement).innerText;
        this.isGameOver = true;
    }
}
