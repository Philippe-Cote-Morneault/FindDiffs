import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import * as THREE from "three";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import { ICommonScene } from "../../../../common/model/scene/scene";
import { GamesCardService } from "../services/gameCard/games-card.service";
import { SceneService } from "../services/scene/scene.service";
import { SceneLoaderService } from "../services/scene/sceneLoader/sceneLoader.service";
import { TimerService } from "../services/timer/timer.service";
// import { ICommonGeometricModifications } from "../../../../common/model/scene/modifications/geometricModifications";
// import { Pair } from "../../../../common/model/pair";
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
    private originalSceneObj: ICommonScene;
    private modifiedsSceneObj: ICommonSceneModifications;

    public constructor(
        private route: ActivatedRoute,
        private spinnerService: Ng4LoadingSpinnerService,
        // private socketService: SocketService,
        public sceneService: SceneService,
        public timerService: TimerService,
        public gamesCardService: GamesCardService) {
        this.originalSceneLoader = new SceneLoaderService();
        this.modifiedSceneLoader = new SceneLoaderService();
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
            this.originalSceneObj = response;
            this.getModifiedSceneById(response);
        });
    }

    public clickOnScene(event: MouseEvent, isOriginalScene: boolean): void {
        const obj: {sceneLoader: SceneLoaderService, HTMLElement: ElementRef<HTMLElement>} = this.isOriginalSceneClick(isOriginalScene);
        const raycaster: THREE.Raycaster = new THREE.Raycaster();
        const mouse: THREE.Vector2 = new THREE.Vector2();
        let intersects: THREE.Intersection[];
        const meshes: THREE.Object3D[] = [];

        this.fillMeshes(meshes, obj.sceneLoader);
        this.setUUID(meshes, isOriginalScene);
        this.setMousePosition(event, mouse, obj.HTMLElement);

        raycaster.setFromCamera(mouse, this.originalSceneLoader.camera );
        intersects = raycaster.intersectObjects( meshes );
        if (intersects.length > 0) {
            console.log(intersects[0]); // call the service instead of console.log
        }
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

    private fillMeshes(meshes: THREE.Object3D[], sceneLoader: SceneLoaderService): void {
        sceneLoader.scene.children.forEach((element) => {
            if (element.type === "Mesh") {
                meshes.push(element);
            }
        });
    }

    private setUUID(meshes: THREE.Object3D[], isOriginalScene: boolean): void {
        if (isOriginalScene) {
            meshes.forEach((element, index) => {
                element.uuid = this.originalSceneObj.sceneObjects[index].id;
            });
        } else {
        //     meshes.forEach((element, index) => {
        //         element.uuid = this.originalSceneObj.sceneObjects[index].id;

        //         if (this.modifiedsSceneObj.deletedObjects.includes(element.id.toString())) {
                    // tslint:disable
        //             if ((this.modifiedsSceneObj as ICommonGeometricModifications).colorChangedObjects.some((object: Pair<string, number>) => 
        //                 element.id.toString() === object.key)) {  
        //             }
        //         }
        //     });
        }
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
            this.modifiedsSceneObj = responseModified;
        });
    }
}
