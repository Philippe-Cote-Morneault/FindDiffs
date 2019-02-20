import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import "node_modules/three/examples/js/controls/OrbitControls";
import "src/js/test";
import * as THREE from "three";
import { ICommonSceneModifications } from "../../../../common/model/scene/modifications/sceneModifications";
import { ICommonScene, ObjectType } from "../../../../common/model/scene/scene";
import { SceneService } from "../services/scene/scene.service";
import { ModifiedSceneParserService } from "../services/scene/sceneParser/modified-scene-parser.service";
import { CameraGenerator } from "../services/scene/sceneRenderer/cameraGenerator";
import { SceneRendererService } from "../services/scene/sceneRenderer/scene-renderer.service";
// import { SceneParserService } from "../services/scene/sceneParser/scene-parser.service";

@Component({
    selector: "app-game-view-free",
    templateUrl: "./game-view-free.component.html",
    styleUrls: ["./game-view-free.component.css"],
})
export class GameViewFreeComponent implements OnInit {
    @ViewChild("originalScene") private originalScene: ElementRef;
    @ViewChild("modifiedScene") private modifiedScene: ElementRef;
    private scenePairID: string;
    private div: HTMLElement | null;

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
            this.loadScene(this.originalScene.nativeElement, response);
        });
        this.sceneService.getModifiedSceneById(this.scenePairID).subscribe((response: ICommonSceneModifications) => {
            this.loadScene(this.modifiedScene.nativeElement, response);
        });
    }

    // tslint:disable:no-any
    public loadScene(div: any, scene: ICommonScene | ICommonSceneModifications): void {
        // tslint:disable-next-line:no-suspicious-comment
        // TODO: copy pasta Phil's code
    }
}
