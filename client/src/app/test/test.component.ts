import { Component, OnInit } from "@angular/core";
import * as THREE from "three";
import { ICommonScene, ObjectType } from "../../../../common/model/scene/scene";
import { SceneParserService } from "../services/scene/sceneParser/scene-parser.service";
import { CameraGenerator } from "../services/scene/sceneRenderer/cameraGenerator";
import { SceneService } from "../services/scene/scene.service";

@Component({
    selector: "app-test",
    templateUrl: "./test.component.html",
    styleUrls: ["./test.component.css"],
})
export class TestComponent implements OnInit {
    private div: HTMLElement | null;

    public constructor(private sceneService: SceneService, private sceneParser: SceneParserService) {

    }

    public ngOnInit(): void {
        this.div = document.getElementById("3jstest");
        this.sceneService.createScene(ObjectType.Geometric, 100).subscribe((scene: ICommonScene) => {
            if (this.div !== null) {
                const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
                renderer.setSize(640, 480);
                this.div.appendChild(renderer.domElement);
                renderer.render(this.sceneParser.parseScene(scene, 640, 480), CameraGenerator.createCamera(640, 480));
            }
        });
    }
}
