import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import { ICommonScene } from "../../../../common/model/scene/scene";
import { GamesCardService } from "../services/gameCard/games-card.service";
import { SceneService } from "../services/scene/scene.service";
import { SceneLoaderService } from "../services/scene/sceneLoader/sceneLoader.service";
import { SocketHandlerService } from "../services/socket/socketHandler.service";
import { TimerService } from "../services/timer/timer.service";

@Component({
    selector: "app-game-view-free",
    templateUrl: "./game-view-free.component.html",
    styleUrls: ["./game-view-free.component.css"],
})
export class GameViewFreeComponent implements OnInit {
    @ViewChild("originalScene") private originalScene: ElementRef;
    @ViewChild("modifiedScene") private modifiedScene: ElementRef;
    @ViewChild("chronometer") private chronometer: ElementRef;
    @ViewChild("gameTitle") private gameTitle: ElementRef;
    @ViewChild("message") private message: ElementRef;
    @ViewChild("message_container") private messageContainer: ElementRef;

    private scenePairId: string;
    private gameCardID: string;
    private originalSceneLoader: SceneLoaderService;
    private modifiedSceneLoader: SceneLoaderService;

    public constructor(
        private route: ActivatedRoute,
        private spinnerService: Ng4LoadingSpinnerService,
        private socketHandlerService: SocketHandlerService,
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
        this.socketConnection();
    }

    private socketConnection(): void {
        this.socketHandlerService.newUserConnected(this.message.nativeElement, this.messageContainer.nativeElement);
        this.socketHandlerService.userDisconnected(this.message.nativeElement, this.messageContainer.nativeElement);
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

    private getModifiedSceneById(response: ICommonScene): void {
        this.sceneService.getModifiedSceneById(this.scenePairId).subscribe((responseModified: ICommonSceneModifications) => {
            this.modifiedSceneLoader.loadModifiedScene(this.modifiedScene.nativeElement, response, responseModified);
            SceneLoaderService.syncScenes(this.originalSceneLoader.camera, this.originalSceneLoader.controls,
                                          this.modifiedSceneLoader.camera, this.modifiedSceneLoader.controls);
            this.spinnerService.hide();
            this.timerService.startTimer(this.chronometer.nativeElement);
        });
    }
}
