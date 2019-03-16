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
    public differenceCounterUser: number;

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

        // this.originalSceneLoader.scene.remove(intersectsOriginal[0].object);
        console.log("========================");
        let test: any = intersectsModified[0].object;
        this.originalSceneLoader.scene.add(test);

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
}
