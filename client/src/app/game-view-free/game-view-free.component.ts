import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import { ICommonScene } from "../../../../common/model/scene/scene";
import { SceneService } from "../services/scene/scene.service";

@Component({
    selector: "app-game-view-free",
    templateUrl: "./game-view-free.component.html",
    styleUrls: ["./game-view-free.component.css"],
})
export class GameViewFreeComponent implements OnInit {
    @ViewChild("originalScene") private originalScene: ElementRef;
    @ViewChild("modifiedScene") private modifiedScene: ElementRef;
    private scenePairID: string;
    // tslint:disable-next-line:no-any

    public constructor(
        private route: ActivatedRoute,
        public sceneService: SceneService) {
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.scenePairID = params["id"];
        });

        this.getScenePairById();
    }

    private getScenePairById(): void {
        this.sceneService.getSceneById(this.scenePairID).subscribe((response: ICommonScene) => {
            this.loadScene(this.originalScene.nativeElement, response.id);
        });
        this.sceneService.getModifiedSceneById(this.scenePairID).subscribe((response: ICommonSceneModifications) => {
            this.loadScene(this.modifiedScene.nativeElement, response.id);
        });
    }

    // tslint:disable:no-any
    public loadScene(scene: any, sceneSrc: string): void {
        // tslint:disable-next-line:no-suspicious-comment
        // TODO: copy pasta Phil's code
    }
}
