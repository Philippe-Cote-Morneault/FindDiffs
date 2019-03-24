import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import { ICommonScene } from "../../../../common/model/scene/scene";
import { CheatModeHandlerService } from "../services/cheatMode/cheatModeHandler.service";
import { GamesCardService } from "../services/gameCard/gamesCard.service";
import { SceneService } from "../services/scene/scene.service";
import { SceneLoaderService } from "../services/scene/sceneLoader/sceneLoader.service";
import { SceneSyncerService } from "../services/scene/sceneSyncer/scene-syncer.service";
import { TimerService } from "../services/timer/timer.service";

@Component({
    selector: "app-game-view-free",
    templateUrl: "./game-view-free.component.html",
    styleUrls: ["./game-view-free.component.css"],
    providers: [SceneSyncerService],
})

export class GameViewFreeComponent implements OnInit {

    @ViewChild("originalScene") private originalScene: ElementRef;
    @ViewChild("modifiedScene") private modifiedScene: ElementRef;
    // @ViewChild("chronometer") private chronometer: ElementRef;
    @ViewChild("gameTitle") private gameTitle: ElementRef;
    // @ViewChild("message") private message: ElementRef;
    // @ViewChild("message_container") private messageContainer: ElementRef;

    private scenePairID: string;
    private currentOriginalScene: ICommonScene;
    private currentModifiedScene: ICommonSceneModifications;
    private gameCardId: string;
    private originalSceneLoader: SceneLoaderService;
    private modifiedSceneLoader: SceneLoaderService;
    private cheatActivated: boolean;

    public constructor( private route: ActivatedRoute,
                        private spinnerService: Ng4LoadingSpinnerService,
                        public sceneService: SceneService,
                        public gamesCardService: GamesCardService,
                        private sceneSyncer: SceneSyncerService,
                        public cheatModeHandlerService: CheatModeHandlerService) {
        this.originalSceneLoader = new SceneLoaderService();
        this.modifiedSceneLoader = new SceneLoaderService();

    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.gameCardId = params["id"];
        });
        this.spinnerService.show();
        this.getGameCardById();
    }

    @HostListener("document:keydown", ["$event"])
    public async toggleCheatMode(event: KeyboardEvent): Promise<void> {
        this.cheatModeHandlerService.keyPressed(event, this.originalSceneLoader, this.modifiedSceneLoader);
    }

    private getGameCardById(): void {
        this.gamesCardService.getGameById(this.gameCardId).subscribe((gameCard: ICommonGameCard) => {
            this.scenePairID = gameCard.resource_id;
            this.gameTitle.nativeElement.innerText = gameCard.title;
            this.loadScene();
        });
    }

    private loadScene(): void {
        this.sceneService.getSceneById(this.scenePairID).subscribe(async (sceneResponse: ICommonScene) => {
            this.sceneService.getModifiedSceneById(this.scenePairID).subscribe(async (sceneModified: ICommonSceneModifications) => {
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
                // this.timerService.startTimer(this.chronometer.nativeElement);

            });
        });
    }
}
