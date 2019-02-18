import { Component, OnInit } from "@angular/core";
import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
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
            console.log(scene);
            if (this.div !== null) {
                const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
                renderer.setSize(640, 480);
                this.div.appendChild(renderer.domElement);
                const camera: THREE.PerspectiveCamera = CameraGenerator.createCamera(640, 480);
                const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);
                const parsedScene: THREE.Scene = this.sceneParser.parseScene(scene, 640, 480);
                //controls.update();

                let animate = () =>  {
                    requestAnimationFrame( animate );
        
                    renderer.render( parsedScene, camera );

                    controls.update();
                };
                animate();
            }
        });
    }
}
