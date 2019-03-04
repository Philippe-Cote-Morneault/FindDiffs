import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import { ICommonScene } from "../../../../common/model/scene/scene";
import { CheatModeService } from "../services/cheatMode/cheat-mode.service";
import { SceneService } from "../services/scene/scene.service";
import { SceneLoaderService } from "../services/scene/sceneLoader/sceneLoader.service";
import { TimerService } from "../services/timer/timer.service";

@Component({
    selector: "app-game-view-free",
    templateUrl: "./game-view-free.component.html",
    styleUrls: ["./game-view-free.component.css"],
})

export class GameViewFreeComponent implements OnInit {
    private static tKeyCode: number = 84;

    @ViewChild("originalScene") private originalScene: ElementRef;
    @ViewChild("modifiedScene") private modifiedScene: ElementRef;
    @ViewChild("chronometer") private chronometer: ElementRef;

    private scenePairID: string;
    private originalSceneLoader: SceneLoaderService;
    private modifiedSceneLoader: SceneLoaderService;

    public constructor(
        private route: ActivatedRoute,
        private spinnerService: Ng4LoadingSpinnerService,
        public sceneService: SceneService,
        public timerService: TimerService,
        public cheatModeService: CheatModeService) {
            this.originalSceneLoader = new SceneLoaderService();
            this.modifiedSceneLoader = new SceneLoaderService();
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.scenePairID = params["id"];
        });
        this.spinnerService.show();
        this.getOriginalSceneById();
    }

    @HostListener("document:keydown", ["$event"])
    public toggleCheatMode(event: KeyboardEvent): void {
        if (event.keyCode === GameViewFreeComponent.tKeyCode) {
            this.cheatModeService.toggleCheatMode(event);
        }
    }

    private getOriginalSceneById(): void {
        this.sceneService.getSceneById(this.scenePairID).subscribe((response: ICommonScene) => {
            this.originalSceneLoader.loadOriginalScene(this.originalScene.nativeElement, response, true);
            this.getModifiedSceneById(response);
        });
    }

    private getModifiedSceneById(response: ICommonScene): void {
        this.sceneService.getModifiedSceneById(this.scenePairID).subscribe((responseModified: ICommonSceneModifications) => {
            this.modifiedSceneLoader.loadModifiedScene(this.modifiedScene.nativeElement, response, responseModified);
            this.spinnerService.hide();
            this.timerService.startTimer(this.chronometer.nativeElement);
        });
    }
}
