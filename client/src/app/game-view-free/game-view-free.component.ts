import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import { ICommonScene } from "../../../../common/model/scene/scene";
import { SceneService } from "../services/scene/scene.service";
import { SceneLoaderService } from "../services/scene/sceneLoader/sceneLoader.service";

@Component({
    selector: "app-game-view-free",
    templateUrl: "./game-view-free.component.html",
    styleUrls: ["./game-view-free.component.css"],
})
export class GameViewFreeComponent implements OnInit {
    @ViewChild("originalScene") private originalScene: ElementRef;
    @ViewChild("modifiedScene") private modifiedScene: ElementRef;
    private scenePairID: string;

    public constructor(
        private route: ActivatedRoute,
        public sceneService: SceneService,
        public sceneLoaderService: SceneLoaderService) {
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.scenePairID = params["id"];
        });

        this.getOriginalSceneById();
    }

    private getOriginalSceneById(): void {
        this.sceneService.getSceneById(this.scenePairID).subscribe((response: ICommonScene) => {
            this.sceneLoaderService.loadOriginalScene(this.originalScene.nativeElement, response);
            this.getModifiedSceneById(response);
        });
    }

    private getModifiedSceneById(response: ICommonScene): void {
        this.sceneService.getModifiedSceneById(this.scenePairID).subscribe((responseModified: ICommonSceneModifications) => {
            this.sceneLoaderService.loadModifiedScene(this.modifiedScene.nativeElement, response, responseModified);
        });
    }
}
